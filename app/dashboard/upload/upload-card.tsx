'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { Repo } from '../modals';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Activity, Loader, Lock, LockOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FileItem from './file-item';
import { getRepos } from '@/lib/github/repos';

function UploadCard() {

    const [repos, setRepos] = useState<Repo[]>([])
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
    const [files, setFiles] = useState<FileList | null>(null)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const init = async () => {
            setLoading(true)
            const res = await getRepos()

            setRepos(res)
            
            setLoading(false)
        }
        init()
    }, [])

    return (
        <>
            <div className='flex flex-row w-full pt-5 items-center justify-between'>
                <Button>
                    <label htmlFor="file-upload">
                        {files ? (
                            <span>{files.length} Files Selected</span>
                        ) : (
                            <span>Choose your files</span>
                        )
                        }
                    </label>
                    <input
                        id='file-upload'
                        type="file"
                        className='mx-auto w-full hidden'
                        onChange={(e) => setFiles(e.target.files)}
                        multiple
                    />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline">
                            {loading ? (
                                <Loader className='animate-spin' />
                            ) : (
                                selectedRepo ? selectedRepo.name.split('-')[0] : <Activity />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <ScrollArea className='h-56'>
                            {repos.map((repo) => (
                                <>
                                    <DropdownMenuItem onClick={() => setSelectedRepo(repo)}>
                                        {repo.private ? (
                                            <Lock className="mr-2 h-4 w-4" />
                                        ) : (
                                            <LockOpen className="mr-2 h-4 w-4" />
                                        )}
                                        {repo.name.split('-')[0]}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='w-full flex flex-col gap-4 pt-6'>
                {
                    files && (
                        Array.from(files).map((file) => <FileItem file={file} repo={selectedRepo} />)
                    )
                }
            </div>
        </>
    )
}

export default UploadCard
