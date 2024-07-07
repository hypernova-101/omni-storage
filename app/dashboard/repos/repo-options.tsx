'use client';

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { deleteRepo } from '@/lib/github/repos';
import { Loader, Settings, Trash2 } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function RepoOptions() {

    const [loading, setLoading] = useState(false)
    
    const params = useParams<{ name: string }>()
    const router = useRouter()

    const remove = async () => {
        setLoading(true)

        let [owner, repo] = decodeURIComponent(params.name).split('/')

        try {
            await deleteRepo(owner, repo)
            toast(`Sucessfully deleted ${repo}`)
        } catch {
            toast(`Failed to delete ${repo}`)
        }

        router.push('/dashboard')
        setLoading(false)

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="outline" className='z-50 shadow-md'>
                    <Settings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={remove} disabled={loading}>
                    {
                        loading ? (
                            <Loader className='animate-spin' />
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" color='red' />
                                <span className='text-red-400'>Delete</span>
                            </>
                        )
                    }
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default RepoOptions