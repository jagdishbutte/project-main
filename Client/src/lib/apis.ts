import { apiConnector } from "./apiConnector";
import { AxiosResponse } from "axios";
import { VITE_API_BASE_URL } from "./apiConnections";

// Common Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  mobile: string;
  location: string;
  age: string;
  nationality: string;
  occupation: string;
  passportNumber: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  message: string;
}

// User Preferences Types
export interface UserPreferences {
  travelStyle: string[];
  destinations: string[];
  accommodation: string[];
  transportation: string[];
  activities: string[];
  budget: string[];
  tripLength: string[];
}

export interface PreferencesRequest extends UserPreferences {
  userId: string;
}

// Trip Types
export interface TripRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: {
    amount: number;
    type: "per_person" | "total";
  };
  travelers: number;
  transportationType: string;
}

export interface Trip extends TripRequest {
  id?: string;
  _id?: string;
  title: string;
  status: "planned" | "ongoing" | "completed";
  itinerary: any[];
  weather: any[];
  accommodation: any[];
  image: string;
}

// API Endpoints Configuration
export const auth = {
  LOGIN: `${VITE_API_BASE_URL}/users/userLogin`,
  REGISTER: `${VITE_API_BASE_URL}/users/userRegister`,
};

export const preferences = {
  SAVE: `${VITE_API_BASE_URL}/preferences/save`,
  GET: `${VITE_API_BASE_URL}/preferences/get`,
};

export const trips = {
  CREATE: `${VITE_API_BASE_URL}/api/trips/create`,
  GET_ALL: `${VITE_API_BASE_URL}/api/trips/all`,
  GET_ONE: (id: string) => `${VITE_API_BASE_URL}/trips/${id}`,
  UPDATE: (id: string) => `${VITE_API_BASE_URL}/trips/${id}`,
  DELETE: (id: string) => `${VITE_API_BASE_URL}/trips/${id}`,
};

// API Services
export const authAPI = {
  login: async (
    data: LoginRequest
  ): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiConnector("POST", auth.LOGIN, data, null, null, null);
  },

  register: async (
    data: RegisterRequest
  ): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiConnector("POST", auth.REGISTER, data, null, null, null);
  },
};

export const preferencesAPI = {
  savePreferences: async (
    data: PreferencesRequest
  ): Promise<AxiosResponse<ApiResponse<UserPreferences>>> => {
    return apiConnector("POST", preferences.SAVE, data, null, null, null);
  },

  getPreferences: async (
    userId: string
  ): Promise<AxiosResponse<ApiResponse<UserPreferences>>> => {
    return apiConnector("GET", preferences.GET, null, null, { userId }, null);
  },
};

export const tripsAPI = {
  createTrip: async (
    data: TripRequest
  ): Promise<AxiosResponse<ApiResponse<Trip>>> => {
    return apiConnector("POST", trips.CREATE, data, null, null, null);
  },

  getAllTrips: async (
    userId: string
  ): Promise<AxiosResponse<ApiResponse<Trip[]>>> => {
    return apiConnector("GET", trips.GET_ALL, null, null, { userId }, null);
  },

  getTrip: async (id: string): Promise<AxiosResponse<ApiResponse<Trip>>> => {
    return apiConnector("GET", trips.GET_ONE(id), null, null, null, null);
  },

  updateTrip: async (
    id: string,
    data: Partial<Trip>
  ): Promise<AxiosResponse<ApiResponse<Trip>>> => {
    return apiConnector("PUT", trips.UPDATE(id), data, null, null, null);
  },

  deleteTrip: async (id: string): Promise<AxiosResponse<ApiResponse<void>>> => {
    return apiConnector("DELETE", trips.DELETE(id), null, null, null, null);
  },
};
