'use client';

import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    <div>
        <h2>Error: {error.name}</h2>
        <h2>Message: {error.message}</h2>

        <Button onClick={reset}>
            Try Again
        </Button>
    </div>
  }
