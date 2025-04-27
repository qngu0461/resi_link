"use client";

import { useEffect, useState } from "react";

type BuildingInfo = {
  address: string;
  description: string;
  amenities: string;
  committee_details: string;
  last_updated: string;
};

export default function BuildingInfoPage() {
  const [buildings, setBuildings] = useState<BuildingInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBuildingInfo = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API_URL}/building-info`;
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

        setBuildings(json);
        setError(null);
      } catch (err) {
        console.error("Error fetching building info:", err);
        setError("Failed to load building information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingInfo();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">🏢</span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Building Information Details
        </h1>
      </div>
      <p className="text-lg text-gray-600">
        General information about the strata buildings.
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
          <span className="text-gray-600">Loading building information...</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {buildings.map((building, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {building.address}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Description:</span>{" "}
                {building.description}
              </p>
              <p>
                <span className="font-medium">Amenities:</span>{" "}
                {building.amenities}
              </p>
              <p>
                <span className="font-medium">Committee:</span>{" "}
                {building.committee_details}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(building.last_updated).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}