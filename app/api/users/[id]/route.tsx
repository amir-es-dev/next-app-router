import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json(user);
  // if (params.id > 10)
  //   return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  // return NextResponse.json({ id: 1, name: "Mosh" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) {
    return NextResponse.json({ error: "User not found!" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser);

  // if (params.id > 10) {
  //   return NextResponse.json({ error: "User not found!" }, { status: 404 });
  // }

  // return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found!" }, { status: 404 });
  }

  await prisma.user.delete({ where: { id: user.id } });
  return NextResponse.json({});

  // if (params.id > 10) {
  //   return NextResponse.json({ error: "User not found!" }, { status: 404 });
  // }

  // return NextResponse.json({});
}
