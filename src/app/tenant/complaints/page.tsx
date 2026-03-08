"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { Plus, CheckCircle2, Clock, AlertCircle, Wrench, MapPin, Flag, Calendar, Image, X, ArrowRight, MessageSquare, Layers, Zap, Wind, Box, Building2 } from "lucide-react";

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
        return <div className="p-2 bg-[#E8F5EE] rounded-xl text-[#1B5E45]"><CheckCircle2 className="w-5 h-5" /></div>;
      case "in-progress":
        return <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Clock className="w-5 h-5" /></div>;
      default:
        return <div className="p-2 bg-red-50 rounded-xl text-red-600"><AlertCircle className="w-5 h-5" /></div>;
    }
  };

  return (
    <TenantLayout>
      <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8 lg:space-y-10 min-h-screen bg-gray-50 font-sans" suppressHydrationWarning>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-[#1B5E45] to-[#246B4F] flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Wrench className="w-5 h-5 md:w-8 md:h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Maintenance Requests</h2>
              <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5 md:mt-1">Report and track maintenance intervention protocols</p>
            </div>
          </div>
          <Button onClick={() => setShowNewComplaint(true)} className="h-10 md:h-12 lg:h-14 px-4 md:px-6 lg:px-8 rounded-full shadow-xl bg-[#1B5E45] hover:bg-[#154a36] text-white font-bold text-xs md:text-sm border-none whitespace-nowrap">
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            New Request
          </Button>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tenantComplaints.map((complaint) => {
            const categoryColors: any = {
              "Plumbing": { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
              "Electrical": { bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-600", gradient: "from-yellow-500 to-yellow-600" },
              "HVAC": { bg: "bg-cyan-50", border: "border-cyan-200", icon: "text-cyan-600", gradient: "from-cyan-500 to-cyan-600" },
              "Maintenance": { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600" },
              "Appliances": { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
              "Infrastructure": { bg: "bg-gray-100", border: "border-gray-300", icon: "text-gray-600", gradient: "from-gray-600 to-gray-700" },
            };
            const colors = categoryColors[complaint.category] || categoryColors["Maintenance"];

            return (
              <div
                key={complaint.id}
                className={`bg-white rounded-lg md:rounded-2xl border-2 shadow-md md:shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden h-full flex flex-col ${colors.border}`}
                onClick={() => {
                  setSelectedComplaint(complaint);
                  setShowDetails(true);
                }}
              >
                {/* Header with gradient background */}
                <div className={`${colors.bg} px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 border-b-2 ${colors.border}`}>
                  <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${colors.gradient} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                      {complaint.category === "Plumbing" && <Wrench className="w-5 h-5 md:w-6 md:h-6" />}
                      {complaint.category === "Electrical" && <Zap className="w-5 h-5 md:w-6 md:h-6" />}
                      {complaint.category === "HVAC" && <Wind className="w-5 h-5 md:w-6 md:h-6" />}
                      {complaint.category === "Maintenance" && <Wrench className="w-5 h-5 md:w-6 md:h-6" />}
                      {complaint.category === "Appliances" && <Box className="w-5 h-5 md:w-6 md:h-6" />}
                      {complaint.category === "Infrastructure" && <Building2 className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    {getStatusIcon(complaint.status)}
                  </div>
                  <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${colors.icon} mb-1 md:mb-2`}>{complaint.category}</p>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                    {complaint.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-600 font-medium mb-4 md:mb-6 line-clamp-3 leading-relaxed flex-1">
                    {complaint.description}
                  </p>

                  {/* Footer */}
                  <div className="pt-3 md:pt-4 border-t border-gray-200 space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase">{complaint.createdDate}</span>
                      </div>
                      <Badge
                        text={
                          complaint.status === "resolved" ? "Resolved" :
                          complaint.status === "in-progress" ? "In Progress" : "Open"
                        }
                        type={
                          complaint.status === "resolved" ? "success" :
                          complaint.status === "in-progress" ? "warning" : "error"
                        }
                      />
                    </div>
                    <button className="w-full py-2 px-3 rounded-lg text-[10px] md:text-xs font-bold text-gray-700 transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {tenantComplaints.length === 0 && (
            <div className="col-span-full text-center py-16 md:py-20 lg:py-24 bg-white rounded-lg md:rounded-3xl border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#3DBE7A]" />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2">No maintenance requests</p>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-md mx-auto">You're all set! No maintenance issues reported at this time.</p>
              <Button onClick={() => setShowNewComplaint(true)} className="bg-[#1B5E45] hover:bg-[#154a36] text-white h-10 md:h-12 px-6 md:px-8 rounded-full font-bold text-sm md:text-base border-none shadow-lg">
                <Plus className="w-4 h-4 md:w-4 md:h-4 mr-2" />
                Submit a Request
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
        size="4xl"
      >
        <div className="p-4 md:p-6 lg:p-8 font-sans">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-lg md:rounded-2xl bg-gradient-to-br from-[#1B5E45] to-[#246B4F] text-white">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0">
              <Wrench className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold">Report an Issue</h4>
              <p className="text-xs md:text-sm text-white/70 font-medium">Describe the maintenance problem you're experiencing</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Issue Title</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E45] transition-colors pointer-events-none">
                    <Flag className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Leaky faucet"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Category</label>
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E45] transition-colors pointer-events-none">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] focus:bg-white transition-all appearance-none cursor-pointer font-semibold"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Maintenance</option>
                    <option>Appliances</option>
                    <option>Infrastructure</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Priority Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['low', 'medium', 'high', 'emergency'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({...formData, priority: p})}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg border-2 transition-all ${
                      formData.priority === p 
                      ? (p === 'emergency' ? 'bg-red-600 border-red-700 text-white shadow-lg' : 'bg-[#1B5E45] border-[#1B5E45] text-white shadow-lg')
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Location in Unit</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Kitchen, Bathroom"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

               <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Preferred Time</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="preferredTime"
                    placeholder="e.g., Weekdays 9AM-5PM"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Description</label>
              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:border-[#1B5E45] focus:bg-white transition-all resize-none font-medium"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <Button
                variant="secondary"
                className="flex-1 h-10 md:h-12 rounded-lg font-bold text-gray-700 border-2 border-gray-200 hover:bg-gray-50 text-sm md:text-base"
                onClick={() => setShowNewComplaint(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 md:h-12 rounded-lg font-bold bg-[#1B5E45] hover:bg-[#154a36] text-white border-none shadow-lg text-sm md:text-base"
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
                <Plus className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetails && !!selectedComplaint}
        onClose={() => setShowDetails(false)}
        title={selectedComplaint?.title}
        size="4xl"
      >
        <div className="space-y-6 md:space-y-8 font-sans">
          {/* Header with category color */}
          <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-lg md:rounded-2xl bg-blue-50 border-2 border-blue-200">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-blue-700 uppercase tracking-wider">Category</p>
              <p className="text-base md:text-lg font-bold text-gray-900">{selectedComplaint?.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 md:mb-2">Priority</p>
              <Badge
                text={
                  selectedComplaint?.priority.charAt(0).toUpperCase() +
                  selectedComplaint?.priority.slice(1)
                }
                type={
                  selectedComplaint?.priority === "emergency"
                    ? "error"
                    : selectedComplaint?.priority === "high"
                    ? "error"
                    : selectedComplaint?.priority === "medium"
                      ? "warning"
                      : "info"
                }
              />
            </div>
            <div className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 md:mb-2">Status</p>
              <Badge
                text={
                  selectedComplaint?.status === "resolved" ? "Resolved" :
                  selectedComplaint?.status === "in-progress" ? "In Progress" : "Open"
                }
                type={
                  selectedComplaint?.status === "resolved" ? "success" :
                  selectedComplaint?.status === "in-progress" ? "warning" : "error"
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">Description</p>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 font-medium text-gray-900 leading-relaxed text-sm md:text-base">
              {selectedComplaint?.description}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-2">
            <div className="space-y-2">
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider">Reported Date</p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                <p className="text-xs md:text-sm font-bold text-gray-900">{selectedComplaint?.createdDate}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider">Request ID</p>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs md:text-sm font-bold text-gray-900 font-mono">REQ-{selectedComplaint?.id}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full h-10 md:h-12 rounded-lg bg-[#1B5E45] hover:bg-[#154a36] text-white font-bold shadow-lg border-none flex items-center justify-center gap-2 text-sm md:text-base">
              <MessageSquare className="w-4 h-4" />
              Add Comment
            </Button>
          </div>
        </div>
      </Modal>
    </TenantLayout>
  );
}
