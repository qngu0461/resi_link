'use client'

import  { useEffect, useState } from 'react';

export default function PhpTestPage() {
    const [phpData, setPhpData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost/resi_link/api/index.php')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.text();
        })
        .then(data => setPhpData(data))
        .catch(err => setError(err.message));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>PHP API Test Page</h1>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : phpData ? (
                <div dangerouslySetInnerHTML={{ __html: phpData}} />
            ) : (
                <p>Loading PHP data...</p>
            )}
        </div>
    );
}