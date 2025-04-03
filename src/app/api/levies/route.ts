import { NextRequest, NextResponse } from "next/server";

const leviesData = [
    { quarter: "Q1", admin: 12000, capital: 8000 },
    { quarter: "Q2", admin: 19000, capital: 9000 },
    { quarter: "Q3", admin: 14000, capital: 10000},
    { quarter: "Q4", admin: 16000, capital: 11000},
];

export async function GET(req: NextRequest) {
    return NextResponse.json(leviesData);
}
