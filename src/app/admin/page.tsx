'use client';

import { useEffect, useState } from 'react';

interface FeedbackItem {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export default function AdminFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => setFeedbackList(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📥 Resident Feedback</h1>
      {feedbackList.length === 0 && <p>No feedback received yet.</p>}
      <ul className="space-y-4">
        {feedbackList.map((fb, index) => (
          <li key={index} className="border p-4 rounded bg-white shadow">
            <p><strong>Name:</strong> {fb.name}</p>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p className="text-xs text-gray-500">Submitted at: {new Date(fb.submittedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}