'use client';

import { Button } from "@/components/ui/button";

function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    console.log(error);
    
    return (
        <div className="flex items-center flex-col justify-center p-4 border rounded-xl gap-4">
            <h1 className="text-red-500 text-2xl font-extrabold">
                Error Occurred
            </h1>
            <div className="pt-14 px-8 w-full flex flex-row justify-between items-center">
                <Button variant="outline">
                    Report
                </Button>
                <Button onClick={reset}>
                    Retry
                </Button>
            </div>
        </div>
    )
}

export default ErrorPage
