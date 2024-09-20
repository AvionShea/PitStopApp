import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  vehicle_image_url: string;
  company_vehicle_id: number;
  company_license_plate: string;
  location: string;
  latitude: number;
  longitude: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  location: string;
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  time?: number;
  surcharge_price?: string;
  vehicle_image_url: string;
  profile_image_url: string;
  company_license_plate: string;
  company_vehicle_id: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onEmployeeTimesCalculated?: (employeesWithTimes: MarkerData[]) => void;
  selectedEmployee?: number | null;
  onMapReady?: () => void;
}

declare interface Delivery {
  order_id: number;
  fuel_grade: string;
  fuel_price: number;
  gallons_pumped: number;
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  estimated_arrival_time: number;
  delivery_price: number;
  estimated_order_delivery_time: number;
  actual_order_delivery_time: number;
  created_at: string;
  payment_status: string;
  action_status: string;
  user_email: string;
  user_id: number;
  customer_license_plate: string;
  customer_car_make: string;
  customer_car_model: string;
  customer_car_color: string;
  customer_card_used: string;
  employee_id: number;
  employee: {
    first_name: string;
    last_name: string;
    company_vehicle_id: number;
    company_license_plate: string;
    location: string;
    latitude: number;
    longitude: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  firstName: string;
  lastName: string;
  email: string;
  gallonsPumped?: number;
  total?: number;
  employeeId?: number;
  arrivalTime?: number;
  cardNumber?: string;
  fuelGrade?: string;
  fuelPrice?: string;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  employeeLocation: string | null;
  employeeLatitude: number | null;
  employeeLongitude: number | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setEmployeeLocation: ({
    latitude,
    longitude,
    location,
  }: {
    latitude: number;
    longitude: number;
    location: string;
  }) => void;
}

declare interface DeliveryStore {
  fuel_grade: string | null;
  fuel_price: string | null;
  gallons_pumped: number | null;
  customer_license_plate: string | null;
  customer_car_make: string | null;
  customer_car_model: string | null;
  customer_car_color: string | null;
  customer_card_used: string | null;
  setFuelInfo: (info: {
    grade: string;
    price: string;
    gallons: number;
    licensePlate: string;
    carMake: string;
    carModel: string;
    carColor: string;
    cardUsed: string;
  }) => void;
}

declare interface EmployeeStore {
  employees: MarkerData[];
  selectedEmployee: number | null;
  setSelectedEmployee: (employeeId: number) => void;
  setEmployees: (employees: MarkerData[]) => void;
  clearSelectedEmployee: () => void;
}

declare interface EmployeeCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}
