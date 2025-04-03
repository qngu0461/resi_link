// File: src/app/committee/layout.tsx
import { TopNav } from "@/components/nav";

export default function CommitteeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   return (
    <>
        <TopNav title="Committee" />
        <main>{children}</main>
    </>
   );
}