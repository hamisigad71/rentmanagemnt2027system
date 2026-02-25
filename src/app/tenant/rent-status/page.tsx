"use client";

import React from "react";
import TenantLayout from "@/components/TenantLayout";
import { mockTenants } from "@/data/mockData";

export default function RentStatusPage() {
  const currentTenant = mockTenants[0];

  return (
    <TenantLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-2xl">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Rent Status</h2>
            <p className="text-gray-600 mt-1">
              Detailed breakdown of your rental account
            </p>
          </div>

          {/* Rent Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mt-8 space-y-6">
            {/* Unit Information */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Unit Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Unit Number</p>
                  <p className="text-gray-900 font-medium">
                    {currentTenant.unitId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Move-in Date</p>
                  <p className="text-gray-900 font-medium">
                    {currentTenant.moveInDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Rent Amount Breakdown */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Rent Amount Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Monthly Rent</span>
                  <span className="text-xl font-bold text-gray-900">
                    KSh {currentTenant.rent.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Utilities (estimated)</span>
                  <span className="text-xl font-bold text-gray-900">
                    Included
                  </span>
                </div>
              </div>
            </div>

            {/* Payment History Summary */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Amount Due</span>
                  <span className="font-bold text-gray-900">
                    KSh {currentTenant.rent.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Amount Paid</span>
                  <span className="font-bold text-green-600">
                    KSh {currentTenant.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">
                    Balance Due
                  </span>
                  <span
                    className={`font-bold text-lg ${
                      currentTenant.arrears > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    KSh {currentTenant.arrears.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  {currentTenant.arrears === 0
                    ? "✓ Your account is up to date. Thank you for paying on time!"
                    : `⚠️ Outstanding balance of KSh ${currentTenant.arrears.toLocaleString()}. Please settle at your earliest convenience.`}
                </p>
              </div>
            </div>

            {/* Lease Terms & Payment Action */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg border border-blue-100 shadow-sm shrink-0 flex items-center gap-2">
                  <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-6 object-contain" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-6 object-contain rounded-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Rent is due on the 1st of each month. Late fees apply after 5 days.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You can now settle your balance quickly and securely via M-Pesa.
                  </p>
                </div>
              </div>
              <a href="/tenant/payments" className="block">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-4 brightness-0 invert" />
                  Pay Now with M-Pesa
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
