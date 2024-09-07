import { Activity, Lock, LockOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Repo } from './modals'

function RepoCard({
    repo
}: {
    repo: Repo
}) {
    
    return (
        <Link
            href={`/dashboard/repos/${encodeURIComponent(repo.full_name)}`}
            className='shadow-md z-50 border rounded-xl p-4 h-36 flex flex-col hover:bg-primary-foreground'
        >
            <div className='w-full flex flex-row items-center justify-between gap-2'>
                <div className='flex flex-row items-center gap-4'>
                    <Activity />
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>{repo.name.split('-')[0]}</h1>
                        <span className='text-zinc-600 text-sm dark:text-zinc-300'>{repo.id}/{repo.name.split('-')[0]}</span>
                    </div>
                </div>
                {repo.private ? (
                    <Lock />
                ) : (
                    <LockOpen />
                )
                }
            </div>
            <div className='flex flex-row items-center justify-between pt-9'>
                <span className='text-sm'>{(repo.size/1024).toFixed(1)} MB</span>
                <span className='text-sm'>{repo.created_at}</span>
            </div>
        </Link>
    )
}

export default RepoCard
