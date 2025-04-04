
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Required for Vercel cron job to work

export async function GET() {
  const now = new Date();
  const timestamp = now.toISOString();

  // Simulated weekly data
  const report = {
    generatedAt: timestamp,
    summary: {
      totalFeedbacks: Math.floor(Math.random() * 50),
      unresolvedRequests: Math.floor(Math.random() * 20),
      newMaintenanceTickets: Math.floor(Math.random() * 10),
    },
    notes: "This is an auto-generated weekly summary for the management committee. Please review on the admin dashboard.",
  };

  console.log("📊 Weekly report generated:", report);

  return NextResponse.json(report);
}