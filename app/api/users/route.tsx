import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exist" }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      updatedAt: new Date(),
      id: crypto.randomUUID(),
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
