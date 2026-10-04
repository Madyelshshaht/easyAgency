"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Locale } from "@/config/locales";
import { countries } from "@/config/countries";

export function CountrySwitcher({ locale }: { locale: Locale }) {
  const t = useTranslations("Navigation");
  const router = useRouter();

  async function selectCountry(country: string) {
    const response = await fetch("/api/preferences/country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });
    if (response.ok) router.push(`/${locale}/${country}`);
  }

  return (
    <label className="country-control">
      <span className="visually-hidden">{t("country")}</span>
      <select
        aria-label={t("country")}
        defaultValue=""
        onChange={(event) => void selectCountry(event.target.value)}
      >
        <option value="">{t("country")}</option>
        {countries.map((country) => (
          <option key={country.code} value={country.slug}>
            {country.name[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
