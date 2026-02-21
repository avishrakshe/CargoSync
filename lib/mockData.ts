export type TripStatus = "On Trip" | "Ready" | "Busy" | "Maintenance";
export type VehicleType = "Truck" | "Van" | "Bus" | "Cargo";

export interface FleetTrip {
  id: string;
  tripId: string;
  vehicle: string;
  vehicleType: VehicleType;
  driver: string;
  status: TripStatus;
  origin?: string;
  destination?: string;
}

export interface KPIStats {
  activeFleet: number;
  maintenanceAlerts: number;
  pendingCargo: number;
  utilizationRate: number;
}

export const MOCK_TRIPS: FleetTrip[] = [
  { id: "1", tripId: "TRP-001", vehicle: "VH-4521", vehicleType: "Truck", driver: "John Doe", status: "On Trip" },
  { id: "2", tripId: "TRP-002", vehicle: "VH-8923", vehicleType: "Van", driver: "Jane Smith", status: "Ready" },
  { id: "3", tripId: "TRP-003", vehicle: "VH-1204", vehicleType: "Truck", driver: "Mike Johnson", status: "Busy" },
  { id: "4", tripId: "TRP-004", vehicle: "VH-5567", vehicleType: "Bus", driver: "Sarah Williams", status: "Maintenance" },
  { id: "5", tripId: "TRP-005", vehicle: "VH-3342", vehicleType: "Cargo", driver: "David Brown", status: "On Trip" },
  { id: "6", tripId: "TRP-006", vehicle: "VH-7789", vehicleType: "Van", driver: "Emily Davis", status: "Ready" },
  { id: "7", tripId: "TRP-007", vehicle: "VH-9012", vehicleType: "Truck", driver: "Chris Wilson", status: "On Trip" },
  { id: "8", tripId: "TRP-008", vehicle: "VH-4455", vehicleType: "Van", driver: "Lisa Anderson", status: "Busy" },
  { id: "9", tripId: "TRP-009", vehicle: "VH-6678", vehicleType: "Cargo", driver: "James Taylor", status: "Ready" },
  { id: "10", tripId: "TRP-010", vehicle: "VH-2233", vehicleType: "Truck", driver: "Amanda Martinez", status: "Maintenance" },
];

export const MOCK_KPI: KPIStats = {
  activeFleet: 220,
  maintenanceAlerts: 18,
  pendingCargo: 20,
  utilizationRate: 87,
};

export const VEHICLE_TYPES: VehicleType[] = ["Truck", "Van", "Bus", "Cargo"];
export const STATUS_OPTIONS: TripStatus[] = ["On Trip", "Ready", "Busy", "Maintenance"];
export const SORT_OPTIONS = [
  { value: "tripId", label: "Trip ID" },
  { value: "vehicle", label: "Vehicle" },
  { value: "driver", label: "Driver" },
  { value: "status", label: "Status" },
];
export const GROUP_BY_OPTIONS = [
  { value: "status", label: "Status" },
  { value: "vehicleType", label: "Vehicle Type" },
  { value: "driver", label: "Driver" },
];
