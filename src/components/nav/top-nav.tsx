"use client";

import { useEffect, useState } from "react";
import Container from "../container";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav({ title }: { title: string }) {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("/api/hello");
        const text = await res.text();
        setLocation(text); 
      } catch (error) {
        setLocation("Hello from your place!");
      }
    };

    fetchLocation();
  }, []);

  return (
    <Container className="flex flex-col border-b border-border py-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>

          {location && (
            <p className="text-base font-medium text-muted-foreground mt-1">
              👋 {location}
            </p>
          )}
        </div>

        <h2 className="text-center text-lg text-muted-foreground font-semibold">
        {process.env.NEXT_PUBLIC_APP_NAME} -  {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        </h2>

        <ThemeToggle />
      </div>
    </Container>
  );
}