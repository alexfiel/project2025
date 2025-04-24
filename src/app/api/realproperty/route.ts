import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Use alias path if set in tsconfig.json


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { ownerName, lotNumber, area, marketValue, userId } = data;

    // Basic validation
    if (!ownerName || !lotNumber || isNaN(area) || isNaN(marketValue) || !userId) {
      return NextResponse.json(
     
        { error: "All fields are required." },
        { status: 400 }
      );
      console.log("Received data:", { ownerName, lotNumber, area, marketValue, userId });
    }

    const realProperty = await prisma.realProperty.create({
      data: {
        ownerName,
        lotNumber,
        area: Number(area),
        marketValue: Number(marketValue),
        userId,
      },
    });
    console.log("Received data:", { ownerName, lotNumber, area, marketValue, userId });

    return NextResponse.json(realProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating real property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const properties = await prisma.realProperty.findMany();
  return NextResponse.json(properties, { status: 200 });
}
/*
export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await prisma.realProperty.create({ data });
  return NextResponse.json(result, { status: 201 });
}
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { ownerName, lotNumber, area, marketValue, userId } = req.body;

    try {
      const updated = await prisma.realProperty.update({
        where: { id: id as string },
        data: {
          ownerName,
          lotNumber,
          area: Number(area),
          marketValue: Number(marketValue),
          userId,
        },
      });
      return res.status(200).json(updated);
    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({ error: 'Failed to update property' });
    }
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
