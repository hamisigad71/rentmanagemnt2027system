"use client";

import React, { useState, useEffect } from 'react';
import LandlordLayout from '@/components/LandlordLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { mockComplaints } from '@/data/mockData';
import { getAvatarUrl } from '@/utils/avatarUtils';
import { CheckCircle2, AlertCircle, Clock, Search, Filter, MessageSquare, Wrench, ShieldAlert, ArrowUpRight, MapPin, Calendar, MoreHorizontal, User } from 'lucide-react';

export default function ComplaintsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredComplaints =
    filterStatus === 'all' ? mockComplaints : mockComplaints.filter((c) => c.status === filterStatus);

  const getSeverityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red'; // Deep professional red
      case 'medium': return 'orange'; // Pro orange
      default: return 'blue';
    }
  };

  return (
    <LandlordLayout>
      <div className="p-6 md:p-10 space-y-10 ">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Wrench className="w-3 h-3" />
              Operations Maintenance Nexus
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Issue <span className="text-slate-400">Inventory</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1B5E45] transition-colors" />
              <input 
                type="text" 
                placeholder="Search report..." 
                className="pl-11 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl w-64 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#1B5E45]/10 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <Button variant="premium" className="h-12 rounded-xl">Manual Incident</Button>
          </div>
        </div>

        {/* Status Protocol Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
              {['all', 'pending', 'in-progress', 'resolved'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-3 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-medium uppercase tracking-wider transition-all ${filterStatus === status ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {status.replace('-', ' ')} {isMounted && `(${status === 'all' ? mockComplaints.length : mockComplaints.filter(c => c.status === status).length})`}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_12px_rgba(220,38,38,0.4)]" />
                 <span className="text-slate-900">High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]" />
                 <span className="text-slate-900">Operational</span>
              </div>
           </div>
        </div>

        {/* Complaints Feed - Premium architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredComplaints.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-slate-100 rounded-[2.5rem] py-20 flex flex-col items-center gap-4">
               <ShieldAlert className="w-12 h-12 text-slate-200" />
               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Zero Active Incidents</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => { setSelectedComplaint(complaint); setShowModal(true); }}
                className="group relative bg-white rounded-[2.5rem] border border-slate-200/60 p-4 md:p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Severity Indicator Line */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-${getSeverityColor(complaint.priority)}-500`} />
                
                <div className="flex flex-col gap-6">
                   <div className="flex items-start justify-between">
                      <div className="space-y-1">
                         <p className="text-[8px] font-medium text-slate-400 uppercase tracking-wide leading-none mb-1">Incident Report</p>
                         <h3 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight leading-tight group-hover:text-[#1B5E45] transition-colors">
                            {complaint.title}
                         </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-xl bg-${getSeverityColor(complaint.priority)}-50 flex items-center justify-center text-${getSeverityColor(complaint.priority)}-600 group-hover:scale-110 transition-transform`}>
                         <AlertCircle className="w-4 h-4" />
                      </div>
                   </div>

                   <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">
                      {complaint.description}
                   </p>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 sm:pb-6 border-b border-slate-50">
                      <div className="space-y-1">
                         <p className="text-[8px] font-medium text-slate-400 uppercase tracking-wide">Stakeholder</p>
                         <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-slate-100 overflow-hidden">
                               <img src={getAvatarUrl(complaint.tenantName)} alt={complaint.tenantName} />
                            </div>
                            <span className="text-[11px] font-medium text-slate-900">{complaint.tenantName}</span>
                         </div>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[8px] font-medium text-slate-400 uppercase tracking-wide">Assignment</p>
                         <p className="text-[11px] font-medium text-slate-900">Unit {complaint.unitId.split('-').pop()}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                         <div className={`px-3 py-1 rounded-full font-medium text-[9px] uppercase tracking-wider ${
                            complaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.15)]' : 
                            complaint.status === 'in-progress' ? 'bg-[#E8F5EE] text-[#1B5E45]' : 'bg-brand-red text-white'
                         }`}>
                            {complaint.status.replace('-', ' ')}
                         </div>
                         <div className="px-3 py-1 rounded-full font-medium text-[9px] uppercase tracking-wider bg-slate-900 text-white">
                            {complaint.priority}
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <Calendar className="w-3 h-3" />
                         {complaint.createdDate}
                      </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Incident Protocol Modal - Cinematic View */}
      <Modal
        isOpen={showModal && !!selectedComplaint}
        onClose={() => setShowModal(false)}
        title="Incident Protocol"
        size="6xl"
        className="rounded-[3rem] p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="relative h-48 bg-slate-900 overflow-hidden">
             <div className={`absolute inset-0 bg-${getSeverityColor(selectedComplaint?.priority)}-600/20 blur-[100px] animate-pulse`} />
             <div className="absolute inset-x-0 bottom-0 p-10 flex items-end justify-between z-10 bg-gradient-to-t from-slate-900 to-transparent">
                <div className="space-y-3">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/10`}>
                      Protocol Initiation: {selectedComplaint?.category}
                   </div>
                   <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{selectedComplaint?.title}</h3>
                </div>
                <div className={`w-20 h-20 rounded-[2.5rem] bg-${getSeverityColor(selectedComplaint?.priority)}-600 text-white flex items-center justify-center font-black text-2xl shadow-2xl shadow-${getSeverityColor(selectedComplaint?.priority)}-600/30 border-4 border-slate-900 group`}>
                   <ShieldAlert className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
             </div>
          </div>

          <div className="p-10 space-y-10">
             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident Context</h4>
                   <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                      <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                         "{selectedComplaint?.description}"
                      </p>
                      <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 overflow-hidden">
                             <img src={getAvatarUrl(selectedComplaint?.tenantName)} alt={selectedComplaint?.tenantName} />
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reported By</p>
                            <p className="text-sm font-black text-slate-900">{selectedComplaint?.tenantName} (Unit {selectedComplaint?.unitId.split('-').pop()})</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Protocol</h4>
                   <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/40 space-y-8">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-[#3DBE7A] uppercase tracking-widest">Resolution Cycle</p>
                         <p className="text-2xl font-black tracking-tighter">PHASE: {selectedComplaint?.status.toUpperCase()}</p>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Resolution Progress</span>
                            <span className="text-white">{selectedComplaint?.status === 'resolved' ? '100%' : selectedComplaint?.status === 'in-progress' ? '50%' : '10%'}</span>
                         </div>
                         <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-[#E8F5EE]0 transition-all duration-1000 ${selectedComplaint?.status === 'resolved' ? 'w-full' : selectedComplaint?.status === 'in-progress' ? 'w-1/2' : 'w-[10%]'}`} />
                         </div>
                      </div>

                      <div className="flex gap-4">
                         <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Reported</p>
                            <p className="text-[10px] font-black text-white">{selectedComplaint?.createdDate}</p>
                         </div>
                         <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">SLA Time</p>
                            <p className="text-[10px] font-black text-white">2.4 Hours</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex gap-4 pt-10">
                <Button variant="premium" className="flex-1 h-16 rounded-2xl text-[11px] uppercase tracking-widest">Commence Resolution</Button>
                <Button variant="outline" className="flex-1 h-16 rounded-2xl text-[11px] uppercase tracking-widest">Assign Contractor</Button>
             </div>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
