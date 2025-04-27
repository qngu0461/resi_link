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
        
    useEffect(() => {
        const fetchBuildingInfo = async () => {
            const res = await fetch("/api/building-info");
            const json = await res.json()
            setBuildings(json);
        };
        fetchBuildingInfo();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">🏢 Building Information</h1>
            <p className="text-muted-foreground">
                General information about the strata buildings.
            </p>
            {buildings.map((building, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">{building.address}</h2>
                    <p><strong>Description:</strong>{building.description}</p>
                    <p><strong>Amenities:</strong>{building.amenities}</p>
                    <p><strong>Committee</strong>{building.committee_details}</p>
                    <p><strong>Last Updated:</strong> {new Date(building.last_updated).toLocaleDateString()}</p>
            </div>
            ))}
        </div>
    );
}
