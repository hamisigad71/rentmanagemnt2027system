import { PrismaClient } from "@prisma/client";
import { mockBuildings, mockUnits, mockTenants, mockPayments, mockComplaints } from "../src/data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.complaint.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.building.deleteMany();

  console.log("Cleared existing data.");

  // Seed Buildings
  for (const b of mockBuildings) {
    await prisma.building.create({
      data: {
        id: b.id,
        name: b.name,
        address: b.address,
        units: b.units,
        occupiedUnits: b.occupiedUnits,
        yearBuilt: b.yearBuilt,
        image: b.image,
        description: b.description,
        amenities: b.amenities,
      },
    });
  }
  console.log("Seeded buildings.");

  // Seed Units
  for (const u of mockUnits) {
    await prisma.unit.create({
      data: {
        id: u.id,
        buildingId: u.buildingId,
        number: u.number,
        type: u.type,
        rent: u.rent,
        status: u.status,
        floor: u.floor,
      },
    });
  }
  console.log("Seeded units.");

  // Seed Tenants
  for (const t of mockTenants) {
    await prisma.tenant.create({
      data: {
        id: t.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        unitId: t.unitId,
        roomNumber: t.roomNumber,
        moveInDate: t.moveInDate,
        rent: t.rent,
        paidAmount: t.paidAmount,
        arrears: t.arrears,
        status: t.status,
      },
    });
  }
  console.log("Seeded tenants.");

  // Seed Payments
  for (const p of mockPayments) {
    await prisma.payment.create({
      data: {
        id: p.id,
        tenantId: p.tenantId,
        amount: p.amount,
        date: p.date,
        status: p.status,
        month: p.month,
      },
    });
  }
  console.log("Seeded payments.");

  // Seed Complaints
  for (const c of mockComplaints) {
    await prisma.complaint.create({
      data: {
        id: c.id,
        tenantId: c.tenantId,
        title: c.title,
        description: c.description,
        category: c.category,
        status: c.status,
        priority: c.priority,
        createdDate: c.createdDate,
      },
    });
  }
  console.log("Seeded complaints.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
