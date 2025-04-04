'use client';

import { useEffect, useState } from 'react';

interface WeeklyReport {
  generatedAt: string;
  summary: {
    totalFeedbacks: number;
    unresolvedRequests: number;
    newMaintenanceTickets: number;
  };
  notes: string;
}

export default function AdminReportsPage() {
  const [report, setReport] = useState<WeeklyReport | null>(null);

  useEffect(() => {
    fetch('/api/weekly-report')
      .then(res => res.json())
      .then(data => setReport(data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Weekly Report</h1>

      {!report ? (
        <p>Loading report...</p>
      ) : (
        <div className="bg-white shadow p-6 rounded">
          <p className="text-sm text-gray-500 mb-2">
            Generated at: {new Date(report.generatedAt).toLocaleString()}
          </p>

          <table className="w-full border text-left mt-2 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Metric</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Total Feedbacks</td>
                <td className="border p-2">{report.summary.totalFeedbacks}</td>
              </tr>
              <tr>
                <td className="border p-2">Unresolved Requests</td>
                <td className="border p-2">{report.summary.unresolvedRequests}</td>
              </tr>
              <tr>
                <td className="border p-2">New Maintenance Tickets</td>
                <td className="border p-2">{report.summary.newMaintenanceTickets}</td>
              </tr>
            </tbody>
          </table>

          <p className="italic text-gray-700">📝 {report.notes}</p>
        </div>
      )}
    </div>
  );
}