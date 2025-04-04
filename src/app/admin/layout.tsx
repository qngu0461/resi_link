import { TopNav } from "@/components/nav";

export default function CommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Feedbacks" />
      <main>{children}</main>
    </>
  );
}