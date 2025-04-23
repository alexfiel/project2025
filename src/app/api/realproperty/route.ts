import { NextRequest, NextResponse } from "next/server";
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
