"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import DashboardCard from "@/components/DashboardCard";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  Building2,
  Home,
  Users,
  DollarSign,
  AlertCircle,
  Plus,
} from "lucide-react";
import {
  getLandlordStats,
  mockPayments,
  mockComplaints,
} from "@/data/mockData";

export default function LandlordDashboard() {
  const stats = getLandlordStats();
  const [showAddBuilding, setShowAddBuilding] = useState(false);
  const recentPayments = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 3);

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-8">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl" style={{ color: "var(--color-text-primary)" }}>
              Dashboard
            </h1>
            <p className="mt-1 font-sans font-medium" style={{ color: "var(--color-text-muted)" }}>
              Welcome back! Here&apos;s an overview of your properties.
            </p>
          </div>
          <Button onClick={() => setShowAddBuilding(true)}>
            <Plus className="w-5 h-5" />
            Add Building
          </Button>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Buildings"  value={stats.totalBuildings}  icon={Building2}    color="blue"   trend={{ value: 0, direction: "up" }} />
          <DashboardCard title="Total Units"      value={stats.totalUnits}      icon={Home}         color="green"  trend={{ value: 4, direction: "up" }} />
          <DashboardCard title="Occupied Units"   value={stats.occupiedUnits}   icon={Users}        color="blue"   trend={{ value: 2, direction: "up" }} />
          <DashboardCard title="Monthly Income"   value={`KSh ${stats.monthlyIncome.toLocaleString()}`} icon={DollarSign} color="yellow" trend={{ value: 5, direction: "up" }} />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Vacant Units"       value={stats.vacantUnits}       icon={Home}        color="red" trend={{ value: 2, direction: "down" }} />
          <DashboardCard title="Tenants in Arrears" value={stats.tenantsInArrears}  icon={AlertCircle} color="red" trend={{ value: 1, direction: "down" }} />
          <DashboardCard title="Active Complaints"  value={stats.activeComplaints}  icon={AlertCircle} color="red" trend={{ value: 12, direction: "up" }} />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Payments */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2 className="text-xl mb-6 font-serif" style={{ color: "var(--color-text-primary)" }}>
              Recent Payments
            </h2>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "var(--color-background-alt)" }}
                >
                  <div>
                    <p className="font-normal" style={{ color: "var(--color-text-primary)" }}>
                      {payment.tenantName}
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {payment.month}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                      KSh {payment.amount.toLocaleString()}
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{
                        color:
                          payment.status === "completed"
                            ? "var(--color-green-deep)"
                            : "#FA0A12",
                      }}
                    >
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Complaints */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border-light)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2 className="text-xl mb-6 font-serif" style={{ color: "var(--color-text-primary)" }}>
              Recent Complaints
            </h2>
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-3 rounded-xl border-l-4"
                  style={{
                    background: "var(--color-background-alt)",
                    borderLeftColor: "#f59e0b",
                  }}
                >
                  <p className="font-normal" style={{ color: "var(--color-text-primary)" }}>
                    {complaint.title}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {complaint.tenantName}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      {complaint.category}
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        background:
                          complaint.status === "resolved"
                            ? "var(--color-surface-tint)"
                            : complaint.status === "in-progress"
                            ? "#fef3c7"
                            : "#fee2e2",
                        color:
                          complaint.status === "resolved"
                            ? "var(--color-green-deep)"
                            : complaint.status === "in-progress"
                            ? "#92400e"
                            : "#b91c1c",
                      }}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Building Modal */}
      <Modal
        isOpen={showAddBuilding}
        onClose={() => setShowAddBuilding(false)}
        title="Add New Building"
        size="5xl"
      >
        <form className="space-y-4">
          {[
            { label: "Building Name", type: "text",   placeholder: "e.g., Sunrise Apartments" },
            { label: "Address",       type: "text",   placeholder: "Street address" },
          ].map(({ label, type, placeholder }) => (
            <div key={label}>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 border rounded-full text-sm transition-all"
                style={{
                  background:   "var(--color-surface)",
                  borderColor:  "var(--color-border-light)",
                  color:        "var(--color-text-primary)",
                }}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Number of Units", placeholder: "24" },
              { label: "Year Built",      placeholder: "2020" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {label}
                </label>
                <input
                  type="number"
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 border rounded-full text-sm transition-all"
                  style={{
                    background:  "var(--color-surface)",
                    borderColor: "var(--color-border-light)",
                    color:       "var(--color-text-primary)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" onClick={() => setShowAddBuilding(false)}>
              Add Building
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowAddBuilding(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </LandlordLayout>
  );
}
