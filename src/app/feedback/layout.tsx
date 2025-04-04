import { TopNav } from "@/components/nav";

export default function FeedbackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <TopNav title="Feedback" />
        <main>{children}</main>
        </>
    );
}