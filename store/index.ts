import { EmployeeStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  employeeLatitude: null,
  employeeLongitude: null,
  employeeLocation: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },

  setEmployeeLocation: ({
    latitude,
    longitude,
    location,
  }: {
    latitude: number;
    longitude: number;
    location: string;
  }) => {
    set(() => ({
      employeeLatitude: latitude,
      employeeLongitude: longitude,
      employeeAddress: location,
    }));
  },
}));

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [] as MarkerData[],
  selectedEmployee: null,
  setSelectedEmployee: (employeeId: number) =>
    set(() => ({ selectedEmployee: employeeId })),
  setEmployees: (employees: MarkerData[]) => set(() => ({ employees })),
  clearSelectedEmployee: () => set(() => ({ selectedEmployee: null })),
}));
