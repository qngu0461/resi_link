import { TopNav } from "@/components/nav"

export default function DocumentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <TopNav title="Building Information" />
            <main>{children}</main>
        </>
    );
}