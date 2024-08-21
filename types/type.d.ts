import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  vehicle_image_url: string;
  company_vehicle_id: number;
  company_license_plate: string;
}

declare interface MarkerData {
  latitude?: number;
  longitude?: number;
  id: number;
  title: string;
  price: string;
  profile_image_url: string;
  car_image_url: string;
  first_name: string;
  last_name: string;
  travel_time?: number;
  company_license_plate: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onEmployeeTimesCalculated?: (EmployeesWithTimes: MarkerData[]) => void;
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
  fullName: string;
  email: string;
  gallons_pumped?: number;
  amount?: string;
  employeeId: number;
  arrivalTime?: number;
  cardNumber?: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
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
