// File: src/app/chat/layout.tsx

import { TopNav } from "@/components/nav";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <TopNav title="Resident Chat" />
        <main className="p-6">{children}</main>
        </>
    );
}