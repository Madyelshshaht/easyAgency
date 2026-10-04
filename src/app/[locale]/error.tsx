"use client";

import { Button, Container } from "@mui/material";

export default function ErrorPage({ reset, }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <main className="simple-page">
      <Container maxWidth="md">
        <h1>حدث خطأ / Something went wrong</h1>
        <p>
          تعذر تحميل الصفحة. حاول مرة أخرى. / The page could not be loaded. Please try
          again.
        </p>
        <Button variant="contained" onClick={reset}>
          إعادة المحاولة / Try again
        </Button>
      </Container>
    </main>
  );
}
