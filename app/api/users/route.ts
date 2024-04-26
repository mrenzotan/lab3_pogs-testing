import { NextRequest, NextResponse } from "next/server";
import { createUser, existingUser, readSpecificUser } from "@/lib/users";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userId, userName, userEmail } = await request.json();

    if (!userId || !userName || !userEmail) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (await existingUser(userId)) {
      return NextResponse.json({ message: "User already exists in the database" }, { status: 200 });
    }

    await createUser(userId, userName, userEmail);

    return NextResponse.json({ message: 'User successfully created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}