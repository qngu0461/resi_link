// File: src/app/chat/admin/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminChaPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const res = await fetch("/api/chat");
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Failed to load messages", err);
            }
        };
        loadMessages();
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMsg = { from: "admin", text: input};
        setMessages((prev) => [...prev, newMsg]);
        setInput("");

        try {
            await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newMsg),
            });
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">🧑‍💼 Admin Chat</h1>
            <p className="text-muted-foreground">
                View and respond to residents' messages below.
            </p>

            <div className="border rounded-lg bg-gray-50 dark:bg-gray-800 h-[400px] overflow-y-auto p-4 space-y-3 shadow">
                {messages.map((msg, i) => (
                    <div    
                        key={i}
                        className={`p-3 rounded-lg max-w-[75%] ${
                            msg.from === "resident"
                            ? "bg-blue-100 dark:bg-blue-900 text-left"
                            : "bg-green-100 dark:bg-green-900 text-right ml-auto"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
                </div>

                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your response..."
                    />
                    <Button onClick={handleSend}>Send</Button>

                </div>
            </div>
            );
        }