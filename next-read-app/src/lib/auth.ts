// app/api/login/route.ts

import { NextResponse } from "next/server";
import { createClient } from "contentful";
import bcrypt from "bcryptjs";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

export async function loginUser(request: Request) {
  try {
    const { email, password } = await request.json();

    const users = await client.getEntries({
      content_type: "user",
      "fields.email": email,
      limit: 1,
    });

    if (users.items.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const user = users.items[0];
    const storedHash = user.fields.password;

    // Provjera da password hash postoji i je tipa string
    if (typeof storedHash !== "string" || storedHash === null) {
      return NextResponse.json({ error: "Password not set for user" }, { status: 500 });
    }

    // Usporedi hashiranu lozinku
    const match = await bcrypt.compare(password, storedHash);

    if (match) {
      return NextResponse.json({
        user: {
          id: user.sys.id,
          email: user.fields.email,
          fullName: user.fields.fullName,
        },
      });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
