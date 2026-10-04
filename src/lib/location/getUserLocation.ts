import type { UserLocation } from "./types";
import { getCountryByCode } from "@/config/countries";

export type LocationHeaders = Pick<Headers, "get">;

export function getUserLocation(headers: LocationHeaders): UserLocation {
  const countryCode = headers.get("x-vercel-ip-country") ?? undefined;
  const city = headers.get("x-vercel-ip-city") ?? undefined;
  const region = headers.get("x-vercel-ip-country-region") ?? undefined;
  let decodedCity = city;
  try {
    decodedCity = city ? decodeURIComponent(city) : undefined;
  } catch {
    decodedCity = city;
  }

  return {
    countryCode,
    countryName: countryCode ? getCountryByCode(countryCode)?.name.en : undefined,
    city: decodedCity,
    region,
  };
}
