import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // Edge Function

const committee = [
  {
    name: "Alice Nguyen",
    role: "Chairperson",
    photo: "/alice.png",
  },
  {
    name: "Darren Watkins",
    role: "Secretary",
    photo: "/david.png",
  },
  {
    name: "Valentina Shevchenko",
    role: "Treasurer",
    photo: "/linda.png",
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(committee);
}