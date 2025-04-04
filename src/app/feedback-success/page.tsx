'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">🎉 Feedback submitted!</h1>
      <p className="mt-2">Thank you for your feedback. You’ll be redirected to the homepage shortly.</p>
    </div>
  );
}