'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { postRepo } from '@/lib/github/repos';

function CreateForm() {
    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [isPrivate, setPrivate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const create = async () => {
        setLoading(true)

        try {
            let res = await postRepo(isPrivate, name, desc)
            if(res === null) {
                toast("failed to create repository")
            } else {
                toast("created repository")
            }
            router.back()
        } catch {
            toast("failed to create repository")
        }

        setLoading(false)
    }

    return (
        <main className='flex flex-col pt-4 gap-4'>
            <input
                id='name'
                placeholder='Enter a name'
                className='py-2 px-4 rounded-xl border w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                id='description'
                placeholder='Enter a description'
                className='py-2 px-4 rounded-xl border w-full'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <div className='flex flex-row gap-2'>
                <Checkbox 
                    id='private'
                    checked={isPrivate}
                    onCheckedChange={(e) => setPrivate(!isPrivate)}
                />
                <label
                    htmlFor="private"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Private
                </label>
            </div>
            <Button onClick={create} disabled={loading}>
                { loading ? <Loader className='animate-spin'/> : <>Create</> }
            </Button>
            <Button variant="outline" disabled={loading}>
                <Link href="/dashboard">
                    Cancel
                </Link>
            </Button>
        </main>
    )
}

export default CreateForm

