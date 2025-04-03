"use client"

import { useEffect, useState } from "react";

type Levy = {
    quarter: string;
    admin: number;
    capital: number;
};

export default function LeviesPage() {
    const [data, setData] = useState<Levy[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/levies");
            const json = await res.json();
            setData(json);
        };
        fetchData();
    }, []);
    
    const max = Math.max(...data.map(d => Math.max(d.admin, d.capital)),1);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">💰 Levies Overview</h1>
            <p className="text-muted-foreground">
                Visual comparison between Admin and Capital funds collected quaterly.
            </p>

            <div className="flex justify-around items-end h-[260px] px-6 bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
                {data.map((item, idx) => {
                    const total = item.admin + item.capital;
                    const adminHeight = (item.admin / total) * 100;
                    const capitalHeight = (item.capital / total) * 100;
                return (
                    <div key={idx} className="flex flex-col items-center w-16">
                        <div className="relative w-6 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <div
                                className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                                style ={{ height: `${adminHeight}%`}}
                            />
                            <div
                                className="absolute bottom-0 w-full bg-green-500 transition-all duration-500"
                                style={{height: `${capitalHeight}%`}}
                            />
                        </div>
                        <span className="mt-2 font-medium">{item.quarter}</span>
                        </div>
                    );
                })}
                </div>

                <div className="flex justify-center gap-6 mt-4 text-sm text-muted foreground">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                        Admin Fund
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-sm" />
                        Capital Fund
                    </div>
                </div>
            </div>
    );
} 
