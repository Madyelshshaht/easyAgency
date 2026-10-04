import { Button, Container } from "@mui/material";
import LinkBehavior from "@/components/common/LinkBehavior";

export default function NotFound() {
  return (
    <main className="simple-page">
      <Container maxWidth="md">
        <span className="eyebrow">404</span>
        <h1>الصفحة غير موجودة / Page not found</h1>
        <Button component={LinkBehavior} href="/ar" variant="contained">
          الرئيسية / Home
        </Button>
      </Container>
    </main>
  );
}
