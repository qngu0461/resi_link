"use client";

import { useEffect, useState } from "react";

type Levy = {
  quarter: string;
  admin: number;
  capital: number;
};

export default function LeviesPage() {
  const [data, setData] = useState<Levy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API_URL}/levies`;
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
      } catch (err) {
        console.error("Error fetching levies data:", err);
        setError("Failed to load levies data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate the global maximum total for consistent bar scaling
  const maxTotal = Math.max(...data.map(d => d.admin + d.capital), 1);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">💰</span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Levies Overview 2025
        </h1>
      </div>
      <p className="text-lg text-gray-600">
        Visual comparison between Admin and Capital funds collected quarterly in 2025.
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
          <span className="text-gray-600">Loading levies data...</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm p-6">
            <div className="flex justify-around items-end h-[260px] px-6">
              {data.map((item, idx) => {
                const total = item.admin + item.capital;
                const adminHeight = (item.admin / maxTotal) * 100;
                const capitalHeight = (item.capital / maxTotal) * 100;

                return (
                  <div key={idx} className="flex flex-col items-center w-20 group">
                    <div className="relative w-8 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500 group-hover:opacity-80"
                        style={{ height: `${adminHeight}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.admin.toFixed(2)}
                        </div>
                      </div>
                      <div
                        className="absolute bottom-0 w-full bg-green-500 transition-all duration-500 group-hover:opacity-80"
                        style={{ height: `${capitalHeight}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.capital.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <span className="mt-3 font-medium text-gray-800">{item.quarter}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm" />
              Admin Fund
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm" />
              Capital Fund
            </div>
          </div>
        </>
      )}
    </div>
  );
}