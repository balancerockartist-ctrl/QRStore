import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, imageUrl, price, credit, tip } = body as {
    name: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    credit?: number;
    tip?: number;
  };

  if (!name || typeof name !== "string" || name.trim() === "") {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const item = await prisma.item.create({
    data: {
      name: name.trim(),
      description: description?.trim() ?? null,
      imageUrl: imageUrl?.trim() ?? null,
      price: typeof price === "number" ? price : 0,
      credit: typeof credit === "number" ? credit : 0,
      tip: typeof tip === "number" ? tip : 0,
    },
  });

  return Response.json(item, { status: 201 });
}
