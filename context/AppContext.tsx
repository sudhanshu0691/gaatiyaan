import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Screen, Van, Booking, User, Theme, Role, Job } from '../types';
import { generateVansData } from '../services/geminiService';

// --- MOCK DATA & USERS ---
const adminUser: User = { id: 'admin-001', name: 'Admin', phone: '0000000000', role: Role.ADMIN };
const mockProviderUser: User = { id: 'provider-1', name: 'Suresh Kumar', phone: '8765432109', role: Role.PROVIDER };
const mockCustomerUser: User = { id: 'user-1', name: 'Rohan Sharma', phone: '9876543210', role: Role.USER };
const MOCK_USERS: User[] = [adminUser, mockProviderUser, mockCustomerUser];


interface AppContextType {
  // Common State
  currentScreen: Screen;
  isAuthenticated: boolean;
  user: User | null;
  theme: Theme;
  
  // Navigation
  navigateTo: (screen: Screen) => void;
  navigateBack: () => void;
  canGoBack: boolean;

  // Customer State & Actions
  selectedVan: Van | null;
  activeBooking: Booking | null;
  bookingHistory: Booking[];
  allProviders: Van[];
  selectVan: (van: Van) => void;
  createBooking: (van: Van) => void;
  completeBooking: () => void;
  cancelBooking: () => void;
  rateBooking: (bookingId: string, rating: number) => void;

  // Provider State & Actions
  isAvailable: boolean;
  incomingJobs: Job[];
  activeJob: Job | null;
  toggleAvailability: () => void;
  acceptJob: (job: Job) => void;
  arriveAtJob: () => void;
  completeJobForProvider: () => void;

  // Admin State & Actions
  allUsers: User[];
  addProvider: (provider: Omit<Van, 'id' | 'lat' | 'lng' | 'rating'>) => void;
  updateProvider: (provider: Van) => void;

  // Auth
  login: (phone: string, role?: Role) => User | null;
  logout: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- STATE MANAGEMENT ---
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([Screen.Welcome]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  // Customer State
  const [selectedVan, setSelectedVan] = useState<Van | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  // Provider State
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [incomingJobs, setIncomingJobs] = useState<Job[]>([]);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  // Admin State
  const [allProviders, setAllProviders] = useState<Van[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);


  // --- INITIALIZATION ---
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') document.documentElement.classList.add('dark');

    // Fetch initial provider data
    generateVansData().then(data => setAllProviders(data));
  }, []);

  // --- DERIVED STATE ---
  const currentScreen = navigationHistory[navigationHistory.length - 1];
  const canGoBack = navigationHistory.length > 1;

  // --- THEME ---
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  // --- NAVIGATION ---
  const navigateTo = (screen: Screen) => setNavigationHistory(prev => [...prev, screen]);
  const navigateBack = () => {
    if (canGoBack) setNavigationHistory(prev => prev.slice(0, -1));
  };
  
  // --- AUTHENTICATION ---
  const login = (phone: string, role: Role = Role.USER): User | null => {
      let foundUser: User | undefined;
      
      // Special admin login
      if (phone === adminUser.phone) {
          foundUser = adminUser;
      } else {
          // Check existing mock users or create a new one
          foundUser = MOCK_USERS.find(u => u.phone === phone);
          if (!foundUser) {
            // In a real app, this would come from a database after signup
            foundUser = { id: `user-${Date.now()}`, name: 'New User', phone, role };
            setAllUsers(prev => [...prev, foundUser as User]);
          }
      }
      
      if(foundUser){
        setUser(foundUser);
        setIsAuthenticated(true);
        // Set initial screen based on role
        const initialScreen = foundUser.role === Role.ADMIN ? Screen.AdminDashboard 
                            : foundUser.role === Role.PROVIDER ? Screen.ProviderDashboard
                            : Screen.Home;
        setNavigationHistory([initialScreen]);
        return foundUser;
      }
      return null;
  };

  const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      setActiveBooking(null);
      setSelectedVan(null);
      setActiveJob(null);
      setNavigationHistory([Screen.Welcome]);
  };
  
  // --- CUSTOMER ACTIONS ---
  const selectVan = (van: Van) => {
    setSelectedVan(van);
    navigateTo(Screen.VanDetail);
  };

  const createBooking = (van: Van) => {
    if (!user) return;
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      van,
      bookingTime: new Date(),
      status: 'en-route',
      user: user,
    };
    setActiveBooking(newBooking);
    
    // Simulate job request for providers
    const newJob: Job = { booking: newBooking, status: 'pending' };
    setIncomingJobs(prev => [newJob, ...prev]);

    navigateTo(Screen.Booking);
  };
  
  const completeBooking = () => {
    if(activeBooking){
        const kWhCharged = Math.round((Math.random() * 10 + 5) * 100) / 100;
        const finalCost = kWhCharged * activeBooking.van.pricePerKWh;
        const completed: Booking = {...activeBooking, status: 'completed', kWhCharged, finalCost };
        setBookingHistory(prev => [completed, ...prev]);
    }
    setActiveBooking(null);
    navigateTo(Screen.Home);
  };

  const cancelBooking = () => {
    if(activeBooking){
        const cancelled: Booking = {...activeBooking, status: 'cancelled' };
        setBookingHistory(prev => [cancelled, ...prev]);
        // Also remove from provider's incoming jobs if it's there
        setIncomingJobs(prev => prev.filter(job => job.booking.id !== activeBooking.id));
    }
    setActiveBooking(null);
    navigateTo(Screen.Home);
  };

  const rateBooking = (bookingId: string, rating: number) => {
    setBookingHistory(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, userRating: rating } : b))
    );
  };

  // --- PROVIDER ACTIONS ---
  const toggleAvailability = () => setIsAvailable(prev => !prev);

  const acceptJob = (job: Job) => {
      setActiveJob({ ...job, status: 'accepted' });
      setIncomingJobs(prev => prev.filter(j => j.booking.id !== job.booking.id));
      // In a real app, you'd notify the user
  };
  
  const arriveAtJob = () => {
      if(activeJob) setActiveJob(prev => prev ? ({ ...prev, status: 'arrived' }) : null);
  };

  const completeJobForProvider = () => {
      if(activeJob) {
          // Find the original booking and update it to complete
          completeBooking();
          setActiveJob(null);
      }
  };

  // --- ADMIN ACTIONS ---
  const addProvider = (providerData: Omit<Van, 'id' | 'lat' | 'lng' | 'rating'>) => {
      const newProvider: Van = {
          ...providerData,
          id: `van-${Date.now()}`,
          lat: 12.9716 + (Math.random() - 0.5) * 0.1,
          lng: 77.5946 + (Math.random() - 0.5) * 0.1,
          rating: 5.0, // Start with a default rating
          status: 'approved'
      };
      setAllProviders(prev => [newProvider, ...prev]);
  };

  const updateProvider = (updatedProvider: Van) => {
      setAllProviders(prev => prev.map(p => p.id === updatedProvider.id ? updatedProvider : p));
  };


  return (
    <AppContext.Provider value={{ 
        currentScreen, isAuthenticated, user, theme, navigateTo, navigateBack, canGoBack,
        selectedVan, activeBooking, bookingHistory, allProviders, selectVan, createBooking, completeBooking, cancelBooking, rateBooking,
        isAvailable, incomingJobs, activeJob, toggleAvailability, acceptJob, arriveAtJob, completeJobForProvider,
        allUsers, addProvider, updateProvider,
        login, logout, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};