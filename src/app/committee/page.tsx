"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CommitteeMember {
    name: string;
    role: string;
    photo: string;
}

export default function CommitteePage() {
    const [members, setMembers] = useState<CommitteeMember[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch("/api/committee");
            const data = await res.json();
            setMembers(data);
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">🏢 Strata Committee</h1>
            <p className="text-muted-foreground">
                This committee is elected to represent all ownners in the building. Below are the current members as of April 2025.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, idx) => (
                <div
                    key={idx}
                    className="rounded-xl border bg-background p-4 shadow-sm text-center"
                >
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                        <Image
                            src={member.photo}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>                 
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
            ))}
            </div>
            </div>
        );
    }