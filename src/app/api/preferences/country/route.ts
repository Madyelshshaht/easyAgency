import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCountryBySlug } from "@/config/countries";

const countrySchema = z.object({ country: z.string().min(2).max(40) });

export async function POST(request: NextRequest) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = countrySchema.safeParse(payload);
  if (!parsed.success || !getCountryBySlug(parsed.data.country)) {
    return NextResponse.json({ error: "Unsupported country" }, { status: 400 });
  }

  const response = NextResponse.json({ country: parsed.data.country });
  response.cookies.set("country", parsed.data.country, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}
