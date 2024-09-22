// app/api/cities/route.ts

import { BASE_URL } from "@/lib/QueryFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const governorate_id = searchParams.get("governorate_id");

  try {
    const response = await fetch(`${BASE_URL}cities?governorate_id=${governorate_id}`);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch cities" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ status: 200, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
