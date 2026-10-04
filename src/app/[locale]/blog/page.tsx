import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/locales";

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main className="simple-page">
      <Container maxWidth="lg">
        <span className="eyebrow">Easy City</span>
        <h1>{locale === "ar" ? "المقالات والإرشادات" : "Insights and guides"}</h1>
        <p>
          {locale === "ar"
            ? "سيتم ربط المقالات والتصنيفات من ووردبريس بعد مراجعة أنواع المحتوى المتاحة."
            : "WordPress posts and categories will be connected after the available content types are verified."}
        </p>
      </Container>
    </main>
  );
}
