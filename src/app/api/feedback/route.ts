import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

const feedbackStore: {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();

  const feedback = {
    ...body,
    submittedAt: new Date().toISOString(),
  };

  feedbackStore.push(feedback); 
  console.log("📩 Feedback received:", feedback);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/feedback-success`, 302);
}

export async function GET() {
  return NextResponse.json([...feedbackStore].reverse());
}