export const countries = [
  { code: "EG", slug: "egypt", name: { ar: "مصر", en: "Egypt" } },
  { code: "SA", slug: "saudi-arabia", name: { ar: "السعودية", en: "Saudi Arabia" }, },
  { code: "OM", slug: "oman", name: { ar: "عُمان", en: "Oman" } },
  { code: "AE", slug: "uae", name: { ar: "الإمارات", en: "UAE" } },
] as const;

export type Country = (typeof countries)[number];

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getCountryByCode(code: string | undefined) {
  if (!code) return undefined;
  return countries.find((country) => country.code === code.toUpperCase());
}
