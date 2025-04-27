"use client";

import { useEffect, useState } from "react";

type Document = {
    id: number;
    name: string;
    file_path: string;
    upload_date: string;
    uploaded_by: string;
};

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch("/api/documents")
                if (!res.ok) throw new Error("Failed to fetch documents");
                const json = await res.json();
                setDocuments(json);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                    📂 Documents
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Access and download key strata plan documents, including financial reports and legal guidelines.
                </p>
            </div>

            {documents.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No documents available
                </p>
            ) : (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                        <li 
                            key={doc.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📄</span>
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                        {doc.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Uploaded by {doc.uploaded_by} on{" "}
                                        {new Date(doc.upload_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={doc.file_path}
                                download
                                className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm transition-colors"
                            >
                                ⬇️ Download Document
                            </a>
                        </li>
                    ))}
                </ul>
            )}    
        </div>
    );
}    