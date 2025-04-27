"use client";

import { useEffect, useState } from "react";

type Document = {
  id: number;
  name: string;
  file_path: string;
  upload_date: string;
  uploaded_by: string; // This will now be the owner_name after API update
};

type ApiResponse = {
  success: boolean;
  documents: Document[];
  error?: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API_URL}/documents`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json: ApiResponse = await res.json();
        if (!json.success) {
          throw new Error(json.error || "Failed to fetch documents");
        }

        setDocuments(json.documents);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching documents:", err.message);
        setError("Failed to load documents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">📂</span>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          Documents
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Access and download key strata plan documents, including financial reports and legal guidelines.
      </p>

      {error && (
        <div className="flex items-center bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {loading && !error && (
        <div className="flex justify-center items-center space-x-2">
          <svg
            className="w-6 h-6 animate-spin text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="text-gray-600">Loading documents...</span>
        </div>
      )}

      {!loading && !error && documents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No documents available.
        </p>
      )}

      {!loading && !error && documents.length > 0 && (
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