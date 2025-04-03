import { NextRequest, NextResponse } from "next/server";

let chatMessages = [
    {from: "resident", text: "Hi, I have a plumbing issue in unit B203."},
    {from: "admin", text: "Thanks for reporting! We'll arrange a plumber today."},
];

export async function GET() {
    return NextResponse.json(chatMessages);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body?.text || !body?.from) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400});
        }
        chatMessages.push({ from: body.from, text: body.text });
        return NextResponse.json({ scuccess: true});
    } catch (error) {
        return NextResponse.json({ error: "Invalid request"}, { status: 500});
    }
}