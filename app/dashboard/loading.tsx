import { Loader } from 'lucide-react'
import React from 'react'

function DashboardLoading() {
    return (
        <div className='flex h-96 lg:h-72 w-full shadow-md z-50 border rounded-xl items-center justify-center'>
            <Loader className='animate-spin' />
        </div>
    )
}

export default DashboardLoading