import { TopNav } from "@/components/nav";

export default function LeviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Strata Roll" />
      <main>{children}</main>
    </>
  );
}