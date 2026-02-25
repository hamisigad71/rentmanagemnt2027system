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
  TrendingUp,
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's an overview of your properties.
            </p>
          </div>
          <Button onClick={() => setShowAddBuilding(true)}>
            <Plus className="w-5 h-5" />
            Add Building
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Buildings"
            value={stats.totalBuildings}
            icon={Building2}
            color="blue"
            trend={{ value: 0, direction: "up" }}
          />
          <DashboardCard
            title="Total Units"
            value={stats.totalUnits}
            icon={Home}
            color="green"
            trend={{ value: 4, direction: "up" }}
          />
          <DashboardCard
            title="Occupied Units"
            value={stats.occupiedUnits}
            icon={Users}
            color="blue"
            trend={{ value: 2, direction: "up" }}
          />
          <DashboardCard
            title="Monthly Income"
            value={`KSh ${stats.monthlyIncome.toLocaleString()}`}
            icon={DollarSign}
            color="yellow"
            trend={{ value: 5, direction: "up" }}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Vacant Units"
            value={stats.vacantUnits}
            icon={Home}
            color="red"
            trend={{ value: 2, direction: "down" }}
          />
          <DashboardCard
            title="Tenants in Arrears"
            value={stats.tenantsInArrears}
            icon={AlertCircle}
            color="red"
            trend={{ value: 1, direction: "down" }}
          />
          <DashboardCard
            title="Active Complaints"
            value={stats.activeComplaints}
            icon={AlertCircle}
            color="red"
            trend={{ value: 12, direction: "up" }}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Payments
            </h3>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.tenantName}
                    </p>
                    <p className="text-sm text-gray-600">{payment.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">KSh {payment.amount.toLocaleString()}</p>
                    <p
                      className={`text-xs ${
                        payment.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Complaints
            </h3>
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400"
                >
                  <p className="font-medium text-gray-900">{complaint.title}</p>
                  <p className="text-sm text-gray-600">
                    {complaint.tenantName}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-gray-700">
                      {complaint.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        complaint.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : complaint.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building Name
            </label>
            <input
              type="text"
              placeholder="e.g., Sunrise Apartments"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Units
              </label>
              <input
                type="number"
                placeholder="24"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                placeholder="2020"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              onClick={() => setShowAddBuilding(false)}
            >
              Add Building
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowAddBuilding(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </LandlordLayout>
  );
}
