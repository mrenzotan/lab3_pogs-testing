import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { createUser, existingUser } from "@/lib/users";

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getSession(request, response)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userID = session.user.sub
  const userName = session.user.name
  const userEmail = session.user.email

  if (await existingUser(userID)) {
    return NextResponse.json({ message: "User already exists in the database" }, { status: 200 })
  }

  const user = await createUser(userID, userName, userEmail)

  console.log(`User created: `)
  console.log(`ID: ${user.id}`)
  console.log(`Name: ${user.name}`)
  console.log(`Email: ${user.email}`)
  console.log(`Is Admin: ${user.isAdmin}`)
  console.log(`Balance: ${user.balance}`)
  console.log(`Owned Pogs: ${user.ownedPogs}`)

  return NextResponse.json({ message: 'User successfully saved into the database' }, { status: 200 })
}