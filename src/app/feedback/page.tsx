"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!name.trim() || !message.trim()) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });
            setSent(true);
            setError("");
            setName("");
            setMessage("");
            } catch (err) {
                setError("Something went wrong. Please try again.")
            }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">📣 Send Us Your Feedback</h1>
            <p className="text-muted-foreground">
                We value your opinion! Help us improve building management.
            </p>
            
            {sent && (
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded text-sm">
                    ✅ Feedback sent! Thank you!
                </div>
            )}

            {error && (
                <div className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="Your Feedback"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSubmit}>Submit Feedback</Button>
            </div>
        </div>
    );
}