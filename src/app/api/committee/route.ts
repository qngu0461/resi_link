import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // Edge Function

const committee = [
  {
    name: "Alice Nguyen",
    role: "Chairperson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Tran",
    role: "Secretary",
    photo: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    name: "Linda Pham",
    role: "Treasurer",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(committee);
}