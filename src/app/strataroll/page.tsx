"use client";

import { useEffect, useState } from "react";

type Owner = {
  id: number;
  owner_name: string;
  email: string;
  unit_entitlements: number;
};

export default function StrataRollPage() {
  const [data, setData] = useState<Owner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API_URL}/strataroll`;
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        if (json.error) {
          throw new Error(json.error);
        }

        setData(json);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching strata roll data:", err.message);
        setError("Failed to load strata roll data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">📋</span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Strata Roll
        </h1>
      </div>
      <p className="text-lg text-gray-600">
        List of unit owners, their contact details, and unit entitlements.
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
          <span className="text-gray-600">Loading strata roll data...</span>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border-b border-gray-200 dark:border-gray-700 p-4 text-left text-gray-800 dark:text-gray-200 font-semibold">
                  Owner Name
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-4 text-left text-gray-800 dark:text-gray-200 font-semibold">
                  Email
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-4 text-left text-gray-800 dark:text-gray-200 font-semibold">
                  Unit Entitlements
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((owner) => (
                <tr
                  key={owner.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="border-b border-gray-200 dark:border-gray-700 p-4 text-gray-700 dark:text-gray-300">
                    {owner.owner_name}
                  </td>
                  
                  <td className="border-b border-gray-200 dark:border-gray-700 p-4 text-gray-700 dark:text-gray-300">
                    <a
                      href={`mailto:${owner.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {owner.email}
                    </a>
                  </td>
                  <td className="border-b border-gray-200 dark:border-gray-700 p-4 text-gray-700 dark:text-gray-300">
                    {owner.unit_entitlements}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}