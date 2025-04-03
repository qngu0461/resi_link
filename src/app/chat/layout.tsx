import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Chat" />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}