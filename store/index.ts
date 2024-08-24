import {
  EmployeeStore,
  LocationStore,
  MarkerData,
  DeliveryStore,
} from "@/types/type";
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
      employeeLocation: location,
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

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  fuel_grade: null,
  fuel_price: null,
  gallons_pumped: null,
  customer_license_plate: null,
  customer_car_make: null,
  customer_car_model: null,
  customer_car_color: null,
  customer_card_used: null,

  setFuelInfo: ({
    grade,
    price,
    gallons,
    licensePlate,
    carMake,
    carModel,
    carColor,
    cardUsed,
  }) => {
    set(() => ({
      fuel_grade: grade,
      fuel_price: price,
      gallons_pumped: gallons,
      customer_license_plate: licensePlate,
      customer_car_make: carMake,
      customer_car_model: carModel,
      customer_car_color: carColor,
      customer_card_used: cardUsed,
    }));
  },
}));
