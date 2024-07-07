'use client';

import React, { useState } from 'react'
import { EllipsisVertical, HardDriveDownload, Loader, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { Content } from '@/app/dashboard/modals'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteContent } from '@/lib/github/content';

function InterCardOptions({ content }: { content: Content }) {

    const params = useParams<{ name: string }>()
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const remove = async () => {
        if(!confirm("Are you sure ?")) {
            return;
        }
        setLoading(true)

        let [owner, repo] = decodeURIComponent(params.name).split('/')

        try { 
            await deleteContent(owner, "Deleted", repo, content.path, content.sha)
        } catch {
            toast(`Failed to delete ${content.name}`)
        }

        setLoading(false)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="ghost">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    content.type === "file" && (
                        <>
                            <DropdownMenuItem>
                                <a href={`${content.download_url}`} download={true} target='_blank' className='flex flex-row'>
                                    <HardDriveDownload className="mr-2 h-4 w-4" />
                                    <span>Download</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                        </>
                    )
                }
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
        </DropdownMenu>)
}

export default InterCardOptions;
