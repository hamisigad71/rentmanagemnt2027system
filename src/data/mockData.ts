// Mock data for the Rental Management System

export interface Building {
  id: string;
  name: string;
  address: string;
  units: number;
  occupiedUnits: number;
  yearBuilt: number;
  image: string;
  description?: string;
  amenities?: string[];
}

export interface Unit {
  id: string;
  buildingId: string;
  number: string;
  type: string;
  rent: number;
  status: "vacant" | "occupied";
  tenantId?: string;
  floor: number;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  unitId: string;
  roomNumber?: string;
  moveInDate: string;
  rent: number;
  paidAmount: number;
  arrears: number;
  status: "active" | "inactive";
}

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  unitId: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "overdue";
  month: string;
}

export interface Complaint {
  id: string;
  tenantId: string;
  tenantName: string;
  unitId: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  createdDate: string;
  priority: "low" | "medium" | "high";
}

// Mock Buildings Data
export const mockBuildings: Building[] = [
  {
    id: "bld-001",
    name: "Sunrise Apartments",
    address: "123 Main Street, Downtown",
    units: 24,
    occupiedUnits: 20,
    yearBuilt: 2015,
    image:
      "https://www.themoonapartments.com/wp-content/uploads/2024/06/Furnished-Apartment-Building-The-Moon-Serenity-Furnished-Apartments-Lymack-Suites-Fourways-Junction-Estate-Northern-Bypass-Road.webp",
    description: "A premium residential complex featuring modern architecture and high-end finishes. Sunrise Apartments offers a sophisticated urban living experience with unparalleled city views and state-of-the-art facilities.",
    amenities: ["High Speed Fiber", "24/7 Security", "Gym & Pool", "CCTV Monitor"],
  },
  {
    id: "bld-002",
    name: "Green Gardens Complex",
    address: "456 Park Avenue, Midtown",
    units: 32,
    occupiedUnits: 28,
    yearBuilt: 2018,
    image:
      "https://q-xx.bstatic.com/xdata/images/hotel/1280x964/324133368.webp?k=e5255c83d7a3d78b1a1092361df6816cd702fab12ac75e62babfe92ff8708ddf&o=",
    description: "Nestled in the heart of Midtown, Green Gardens Complex blends natural aesthetics with contemporary design. This eco-friendly community provides a serene escape from the hustle and bustle of city life.",
    amenities: ["Backup Generator", "Solar Water", "24/7 Security", "Children's Play Area"],
  },
  {
    id: "bld-003",
    name: "Metropolitan Tower",
    address: "789 Business Blvd, Upper City",
    units: 48,
    occupiedUnits: 42,
    yearBuilt: 2020,
    image:
      "https://propscout.co.ke/storage/properties/files/flat-and-apartments/thumbnails/-1-bedroom-apartment-for-rent-in-donholm-phase-8-seike.jpg",
    description: "The pinnacle of urban luxury. Metropolitan Tower is a landmark skyscraper offering premium flexible units with intelligent automated management systems and world-class concierge services.",
    amenities: ["High Speed Fiber", "CCTV Monitor", "Backup Generator", "Business Center"],
  },
];

// Mock Units Data
export const mockUnits: Unit[] = [
  {
    id: "unit-001",
    buildingId: "bld-001",
    number: "101",
    type: "1 Bedroom",
    rent: 15000,
    status: "occupied",
    tenantId: "tenant-001",
    floor: 1,
  },
  {
    id: "unit-002",
    buildingId: "bld-001",
    number: "102",
    type: "1 Bedroom",
    rent: 15000,
    status: "vacant",
    floor: 1,
  },
  {
    id: "unit-003",
    buildingId: "bld-001",
    number: "201",
    type: "2 Bedroom",
    rent: 25000,
    status: "occupied",
    tenantId: "tenant-002",
    floor: 2,
  },
  {
    id: "unit-004",
    buildingId: "bld-001",
    number: "202",
    type: "2 Bedroom",
    rent: 25000,
    status: "occupied",
    tenantId: "tenant-003",
    floor: 2,
  },
  {
    id: "unit-005",
    buildingId: "bld-001",
    number: "301",
    type: "Bedsitter",
    rent: 8500,
    status: "vacant",
    floor: 3,
  },
  {
    id: "unit-006",
    buildingId: "bld-002",
    number: "101",
    type: "1 Bedroom",
    rent: 18000,
    status: "occupied",
    tenantId: "tenant-004",
    floor: 1,
  },
  {
    id: "unit-007",
    buildingId: "bld-002",
    number: "102",
    type: "1 Bedroom",
    rent: 18000,
    status: "occupied",
    tenantId: "tenant-005",
    floor: 1,
  },
  {
    id: "unit-008",
    buildingId: "bld-002",
    number: "201",
    type: "2 Bedroom",
    rent: 28000,
    status: "occupied",
    tenantId: "tenant-006",
    floor: 2,
  },
  {
    id: "unit-009",
    buildingId: "bld-003",
    number: "1001",
    type: "1 Bedroom",
    rent: 20000,
    status: "occupied",
    tenantId: "tenant-007",
    floor: 10,
  },
  {
    id: "unit-010",
    buildingId: "bld-003",
    number: "1002",
    type: "2 Bedroom",
    rent: 35000,
    status: "occupied",
    tenantId: "tenant-008",
    floor: 10,
  },
];

// Mock Tenants Data
export const mockTenants: Tenant[] = [
  {
    id: "tenant-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "555-0101",
    idNumber: "ID-12345678",
    unitId: "unit-001",
    roomNumber: "A1",
    moveInDate: "2023-01-15",
    rent: 15000,
    paidAmount: 15000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "555-0102",
    idNumber: "ID-87654321",
    unitId: "unit-003",
    roomNumber: "B2",
    moveInDate: "2022-06-20",
    rent: 25000,
    paidAmount: 25000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-003",
    name: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "555-0103",
    idNumber: "ID-11223344",
    unitId: "unit-004",
    roomNumber: "C1",
    moveInDate: "2023-03-10",
    rent: 25000,
    paidAmount: 15000,
    arrears: 10000,
    status: "active",
  },
  {
    id: "tenant-004",
    name: "Emily Brown",
    email: "emily.brown@email.com",
    phone: "555-0104",
    idNumber: "ID-44332211",
    unitId: "unit-006",
    roomNumber: "A2",
    moveInDate: "2023-05-05",
    rent: 18000,
    paidAmount: 18000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-005",
    name: "Michael Wilson",
    email: "michael.w@email.com",
    phone: "555-0105",
    idNumber: "ID-55667788",
    unitId: "unit-007",
    roomNumber: "B1",
    moveInDate: "2023-02-14",
    rent: 18000,
    paidAmount: 18000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-006",
    name: "Sarah Davis",
    email: "sarah.d@email.com",
    phone: "555-0106",
    idNumber: "ID-99887766",
    unitId: "unit-008",
    roomNumber: "C3",
    moveInDate: "2022-11-30",
    rent: 28000,
    paidAmount: 28000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-007",
    name: "David Martinez",
    email: "david.m@email.com",
    phone: "555-0107",
    idNumber: "ID-12123434",
    unitId: "unit-009",
    roomNumber: "10A",
    moveInDate: "2023-04-08",
    rent: 20000,
    paidAmount: 20000,
    arrears: 0,
    status: "active",
  },
  {
    id: "tenant-008",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "555-0108",
    idNumber: "ID-56567878",
    unitId: "unit-010",
    roomNumber: "10B",
    moveInDate: "2023-07-20",
    rent: 35000,
    paidAmount: 35000,
    arrears: 0,
    status: "active",
  },
];

// Mock Payments Data
export const mockPayments: Payment[] = [
  {
    id: "pay-001",
    tenantId: "tenant-001",
    tenantName: "John Doe",
    unitId: "unit-001",
    amount: 15000,
    date: "2024-02-01",
    status: "completed",
    month: "February 2024",
  },
  {
    id: "pay-002",
    tenantId: "tenant-001",
    tenantName: "John Doe",
    unitId: "unit-001",
    amount: 15000,
    date: "2024-01-05",
    status: "completed",
    month: "January 2024",
  },
  {
    id: "pay-003",
    tenantId: "tenant-002",
    tenantName: "Jane Smith",
    unitId: "unit-003",
    amount: 25000,
    date: "2024-02-03",
    status: "completed",
    month: "February 2024",
  },
  {
    id: "pay-004",
    tenantId: "tenant-003",
    tenantName: "Robert Johnson",
    unitId: "unit-004",
    amount: 25000,
    date: "2024-02-10",
    status: "overdue",
    month: "February 2024",
  },
  {
    id: "pay-005",
    tenantId: "tenant-004",
    tenantName: "Emily Brown",
    unitId: "unit-006",
    amount: 18000,
    date: "2024-02-02",
    status: "completed",
    month: "February 2024",
  },
  {
    id: "pay-006",
    tenantId: "tenant-005",
    tenantName: "Michael Wilson",
    unitId: "unit-007",
    amount: 18000,
    date: "2024-02-01",
    status: "completed",
    month: "February 2024",
  },
  {
    id: "pay-007",
    tenantId: "tenant-006",
    tenantName: "Sarah Davis",
    unitId: "unit-008",
    amount: 28000,
    date: "2024-02-04",
    status: "completed",
    month: "February 2024",
  },
  {
    id: "pay-008",
    tenantId: "tenant-007",
    tenantName: "David Martinez",
    unitId: "unit-009",
    amount: 20000,
    date: "2024-02-05",
    status: "completed",
    month: "February 2024",
  },
];

// Mock Complaints Data
export const mockComplaints: Complaint[] = [
  {
    id: "comp-001",
    tenantId: "tenant-001",
    tenantName: "John Doe",
    unitId: "unit-001",
    title: "Leaky Faucet",
    description: "The kitchen faucet is leaking and dripping constantly.",
    category: "Plumbing",
    status: "in-progress",
    createdDate: "2024-02-08",
    priority: "medium",
  },
  {
    id: "comp-002",
    tenantId: "tenant-002",
    tenantName: "Jane Smith",
    unitId: "unit-003",
    title: "Heating System Not Working",
    description: "The heating system in the unit is not functioning properly.",
    category: "HVAC",
    status: "pending",
    createdDate: "2024-02-10",
    priority: "high",
  },
  {
    id: "comp-003",
    tenantId: "tenant-003",
    tenantName: "Robert Johnson",
    unitId: "unit-004",
    title: "Paint Peeling Off Walls",
    description: "Paint is peeling off the bedroom walls.",
    category: "Maintenance",
    status: "resolved",
    createdDate: "2024-02-02",
    priority: "low",
  },
  {
    id: "comp-004",
    tenantId: "tenant-004",
    tenantName: "Emily Brown",
    unitId: "unit-006",
    title: "Broken Light Fixture",
    description: "The ceiling light in the living room is broken.",
    category: "Electrical",
    status: "pending",
    createdDate: "2024-02-09",
    priority: "low",
  },
  {
    id: "comp-005",
    tenantId: "tenant-006",
    tenantName: "Sarah Davis",
    unitId: "unit-008",
    title: "Noisy Neighbors",
    description: "Excessive noise from the unit above.",
    category: "Noise",
    status: "in-progress",
    createdDate: "2024-02-07",
    priority: "medium",
  },
];

// Summary statistics
export const getLandlordStats = () => {
  const buildings = mockBuildings;
  const units = mockUnits;
  const tenants = mockTenants;
  const payments = mockPayments;
  const complaints = mockComplaints;

  const occupiedUnits = units.filter((u) => u.status === "occupied").length;
  const vacantUnits = units.filter((u) => u.status === "vacant").length;
  const tenantsInArrears = tenants.filter((t) => t.arrears > 0).length;
  const monthlyIncome = units.reduce((sum, unit) => {
    if (unit.status === "occupied") {
      return sum + unit.rent;
    }
    return sum;
  }, 0);
  const totalArrears = tenants.reduce((sum, t) => sum + t.arrears, 0);
  const activeComplaints = complaints.filter(
    (c) => c.status !== "resolved",
  ).length;

  return {
    totalBuildings: buildings.length,
    totalUnits: units.length,
    occupiedUnits,
    vacantUnits,
    monthlyIncome,
    tenantsInArrears,
    totalArrears,
    activeComplaints,
  };
};

// Get tenant dashboard data
export const getTenantDashboard = (tenantId: string) => {
  const tenant = mockTenants.find((t) => t.id === tenantId);
  const payments = mockPayments.filter((p) => p.tenantId === tenantId);
  const complaints = mockComplaints.filter((c) => c.tenantId === tenantId);

  return {
    tenant,
    payments,
    complaints,
  };
};
