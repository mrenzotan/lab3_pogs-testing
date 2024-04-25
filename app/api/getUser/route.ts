import { NextRequest, NextResponse } from "next/server";
import { readSpecificUser } from "@/lib/users";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userID } = body;
  const pogs = await readSpecificUser(userID);
  return NextResponse.json(pogs);
}