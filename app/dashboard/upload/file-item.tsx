'use client';

import React, { useState } from 'react'
import { Repo } from '../modals';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

function FileItem({ file, repo }: { file: File, repo: Repo | null }) {
        
    const [path, setPath] = useState<string>('/')
    const [progress, setProgress] = useState(0)
    const [loading, setloading] = useState(false)
    const [status, setStatus] = useState("")
    
    function getTokenFromCookieStore(): string | null {
        let cookies = document.cookie.split(';')
        for(let i = 0; i < cookies.length; i+=1) {
            const [name, value] = cookies[i].split('=')
            if(name==='token' && value !== undefined) {
                return value
            }
        }
        return null
    }

    const upload = async () => {    
        let token = getTokenFromCookieStore()

        if(!token) {
            toast('No token detected.')
            return
        }

        if (repo) {
            let uploadPath = path === "/" || "" ? file.name : `${path}/${file.name}`
            let name = repo.full_name.split('/')[0]

            try {
                const reader = new FileReader();
                reader.onload = async () => {
                    setloading(true);
                    setStatus('Uploading to our server...')
                    
                    const base64Content = reader?.result?.toString().split(',')[1];

                    const res = await axios.put(
                        `https://api.github.com/repos/${name}/${repo.name}/contents/${uploadPath}`,
                        {
                            'content': base64Content,
                            'message': `added ${file.name}`,
                        }, 
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            onUploadProgress({ loaded, total }) {
                                setProgress(Math.round((loaded * 100) / file.size))
                            }
                        }
                    )

                    if(res.status < 300) {
                        setStatus('Stored in dark web')
                        toast(`Upload Complete ${file.name}`)
                        setloading(false)
                        setProgress(0)                        
                    } else {
                        setStatus('Failed')
                        toast(`Upload Failed ${file.name}`)
                        setloading(false)
                        setProgress(0)
                    }
                }
                reader.readAsDataURL(file)
            } catch (e: any) {
                toast(e.message)
            } finally {
                setloading(false)
            }

        } else {
            toast('Select a repo')
        }
        setloading(false)
    }

    return (
        <div className='w-full flex flex-col p-2 border rounded-xl gap-6'>
            <div className='w-full flex flex-col gap-2'>
                <h1 className='text-center'>{file.name.slice(0, 15)}...</h1>
                <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className='border py-2 px-4 rounded-lg'
                    placeholder='Change path..'
                    disabled={loading}
                />
            </div>
            <div className='pt-6 flex flex-col w-full gap-4'>
                <h1 className='text-center font-bold text-lg'>{status}</h1>
                {progress != 0 && (
                    <>
                        <Progress
                            value={progress}
                            className='w-full'
                        />
                    </>
                )}
                <Button className='w-full' onClick={upload} disabled={loading}>
                    {
                        loading ? (
                            <Loader className='animate-spin' />
                        ) : (
                            <>Start Upload</>
                        )
                    }
                </Button>
            </div>
        </div>
    )
}

export default FileItem