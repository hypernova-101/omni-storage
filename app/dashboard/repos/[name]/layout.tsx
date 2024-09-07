import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import RepoOptions from '../repo-options'

function RepoNameLayout({ 
    params, children 
}: {    
    params: { name: string },
    children: React.ReactNode
}) {
    
    let name = decodeURIComponent(params.name).split('/')[1]

  return (
    <div className='flex flex-col gap-10 flex-1'>
            <div className='flex flex-row w-full items-center justify-evenly'>
                <Button size="icon" variant="ghost" className='z-50 shadow-md'>
                    <Link href={'/dashboard'}>
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className='flex-grow text-center text-xl lg:text-2xl font-bold'>{name.split('-')[0]}</h1>
                <RepoOptions/>
            </div>

            {children}        
        </div>
  )
}

export default RepoNameLayout
