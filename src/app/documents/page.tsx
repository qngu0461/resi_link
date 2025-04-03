"use client";

export default function DocumentsPage() {
    const docs = [
    {
        title: "📘 Strata Schemes Management Act (PDF)",
        desc: "Offical document under Section 16. Covers and responsibilities.",
        url: "/files/strata-act.pdf",
    },
    {
        title: "📄 Financial Report 2024 (PDF)",
        desc: "Annual summary of admin and capital fund usage.",
        url: "/files/financial-report-2024.pdf",
    },
    {
        title: "📋 Building Rules & Guidelines (PDF)",
        desc: "Rules on maintenance, noise, pets, and rennovations.",
        url: "/files/building-rules.pdf",
    },  
];

return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📁 Documents</h1>
        <p className="text-muted-foreground">
            Download key legal and management documents related to your strata plan.
        </p>

        <ul className="space-y-4">
            {docs.map((doc, idx) => (
                <li
                    key={idx}
                    className="bg-white dark:bg-gray-900 border rounded-lg p-4 shadow-sm hover:shadow transition-all"
                >
                    <div className="font-semibold text-lg">{doc.title}</div>
                    <p className="text-sm text-muted-foreground mb-2">{doc.desc}</p>
                    <a
                        href={doc.url}
                        download
                        className = "text-blue-600 hover:underline text-sm"
                    >
                        ⬇️ Download PDF
                    </a>
                </li>
                ))}
            </ul>
        </div>
        );
    }

           