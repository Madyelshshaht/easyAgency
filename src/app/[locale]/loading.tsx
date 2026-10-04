import { Container, Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="lg" className="simple-page">
      <Stack spacing={2}>
        <Skeleton variant="text" width="20%" height={36} />
        <Skeleton variant="text" width="60%" height={72} />
        <Skeleton variant="rounded" height={220} />
      </Stack>
    </Container>
  );
}
