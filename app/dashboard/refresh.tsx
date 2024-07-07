'use client';

import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

function Refresh() {
    const appRouter = useRouter()
    
    const refresh = () => {
        appRouter.refresh()
    }
    
    return (
        <Button
            variant="outline"
            className='z-50 shadow-md'
            type='submit'
            onClick={refresh}
        >
            <RefreshCcw size={18} />
        </Button>
    )
}

export default Refresh