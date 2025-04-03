import { AverageTicketsCreated } from "@/components/chart-blocks";
import Container from "@/components/container";

export default function RequestsPage() {
    return (
        <Container className="py-4">
            <AverageTicketsCreated />
        </Container>
    );
}