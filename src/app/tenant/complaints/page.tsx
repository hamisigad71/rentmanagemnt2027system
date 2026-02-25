"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { Plus, CheckCircle2, Clock, AlertCircle, Wrench, MapPin, Flag, Calendar, Image, X } from "lucide-react";

export default function TenantComplaintsPage() {
  const currentTenant = mockTenants[0];
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Maintenance",
    priority: "medium",
    location: "",
    preferredTime: "",
  });

  const tenantComplaints = mockComplaints.filter(
    (c) => c.tenantId === currentTenant.id,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-brand-red" />;
    }
  };

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Maintenance Requests
            </h2>
            <p className="text-gray-600 mt-1">
              Report and track maintenance issues
            </p>
          </div>
          <Button onClick={() => setShowNewComplaint(true)}>
            <Plus className="w-5 h-5" />
            New Request
          </Button>
        </div>

        {/* Complaints Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenantComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedComplaint(complaint);
                setShowDetails(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {complaint.title}
                  </h3>
                  <p className="text-sm text-gray-600">{complaint.category}</p>
                </div>
                {getStatusIcon(complaint.status)}
              </div>

              <p className="text-gray-700 text-sm mb-4">
                {complaint.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Reported: {complaint.createdDate}
                </span>
                <Badge
                  text={
                    complaint.status.charAt(0).toUpperCase() +
                    complaint.status.slice(1).replace("-", " ")
                  }
                  type={
                    complaint.status === "resolved"
                      ? "success"
                      : complaint.status === "in-progress"
                        ? "warning"
                        : "error"
                  }
                />
              </div>
            </div>
          ))}

          {tenantComplaints.length === 0 && (
            <div className="col-span-full text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No maintenance requests yet</p>
              <Button onClick={() => setShowNewComplaint(true)}>
                <Plus className="w-4 h-4" />
                Submit Your First Request
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* New Complaint Modal */}
      <Modal
        isOpen={showNewComplaint}
        onClose={() => {
          setShowNewComplaint(false);
          setFormData({ 
            title: "", 
            description: "", 
            category: "Maintenance",
            priority: "medium",
            location: "",
            preferredTime: "",
          });
        }}
        title="Submit Maintenance Request"
        size="5xl"
      >
        <div className="p-1">
          <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900">Maintenance Request</h4>
              <p className="text-xs text-blue-700">Please provide as much detail as possible to help us resolve the issue quickly.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Issue Title
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Leaky kitchen faucet"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Maintenance</option>
                    <option>Appliances</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Clock className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Priority level
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high', 'emergency'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({...formData, priority: p})}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        formData.priority === p 
                        ? (p === 'emergency' ? 'bg-brand-red border-red-600 text-white shadow-md shadow-red-200' : 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200')
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Location in unit
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Master Bedroom"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                Preferred Visit Window
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="preferredTime"
                  placeholder="e.g., Weekdays after 5 PM"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                Problem Description
              </label>
              <textarea
                name="description"
                placeholder="Please describe exactly what is happening..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                Attach Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 transition-colors hover:bg-gray-50 hover:border-blue-400 group cursor-pointer text-center">
                <Image className="w-8 h-8 text-gray-300 mx-auto mb-2 transition-colors group-hover:text-blue-400" />
                <p className="text-sm text-gray-500">
                  <span className="text-blue-600 font-bold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max. 5MB)</p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button
                variant="secondary"
                className="flex-1 py-3 h-auto"
                onClick={() => setShowNewComplaint(false)}
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="flex-[2] py-3 h-auto bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 text-white font-bold"
                onClick={() => {
                  setShowNewComplaint(false);
                  setFormData({
                    title: "",
                    description: "",
                    category: "Maintenance",
                    priority: "medium",
                    location: "",
                    preferredTime: "",
                  });
                }}
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={showDetails && !!selectedComplaint}
        onClose={() => setShowDetails(false)}
        title={selectedComplaint?.title}
        size="4xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium text-gray-900">
                {selectedComplaint?.category}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <Badge
                text={
                  selectedComplaint?.priority.charAt(0).toUpperCase() +
                  selectedComplaint?.priority.slice(1)
                }
                type={
                  selectedComplaint?.priority === "high"
                    ? "error"
                    : selectedComplaint?.priority === "medium"
                      ? "warning"
                      : "info"
                }
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Description</p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {selectedComplaint?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Reported</p>
              <p className="text-gray-900">{selectedComplaint?.createdDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge
                text={
                  selectedComplaint?.status.charAt(0).toUpperCase() +
                  selectedComplaint?.status.slice(1).replace("-", " ")
                }
                type={
                  selectedComplaint?.status === "resolved"
                    ? "success"
                    : selectedComplaint?.status === "in-progress"
                      ? "warning"
                      : "error"
                }
              />
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Add Comment
          </Button>
        </div>
      </Modal>
    </TenantLayout>
  );
}
