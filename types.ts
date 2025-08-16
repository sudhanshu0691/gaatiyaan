export enum Role {
    USER = 'USER',
    PROVIDER = 'PROVIDER',
    ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
}

export interface Van {
  id:string;
  partnerName: string;
  vanModel: string;
  rating: number;
  etaMinutes: number;
  pricePerKWh: number;
  capacityKWh: number;
  lat: number;
  lng: number;
  status?: 'approved' | 'pending';
}

export interface Booking {
  id: string; 
  van: Van;
  bookingTime: Date;
  status: 'en-route' | 'charging' | 'completed' | 'cancelled';
  kWhCharged?: number;
  finalCost?: number;
  userRating?: number; 
  user: User;
}

export interface Job {
    booking: Booking;
    status: 'pending' | 'accepted' | 'arrived' | 'completed';
}

export enum Screen {
  Welcome = 'WELCOME',
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
  Home = 'HOME',
  ProviderList = 'PROVIDER_LIST',
  VanDetail = 'VAN_DETAIL',
  Booking = 'BOOKING',
  History = 'HISTORY',
  Profile = 'PROFILE',
  AccountSettings = 'ACCOUNT_SETTINGS',
  
  ProviderDashboard = 'PROVIDER_DASHBOARD',
  ProviderProfile = 'PROVIDER_PROFILE',

  AdminDashboard = 'ADMIN_DASHBOARD',
  AdminProviders = 'ADMIN_PROVIDERS',
  AdminUsers = 'ADMIN_USERS',
  AdminProfile = 'ADMIN_PROFILE'
}

export enum ViewMode {
    Map = 'MAP',
    List = 'LIST'
}

export type Theme = 'light' | 'dark';