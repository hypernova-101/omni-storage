import { Bird } from 'lucide-react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ContentCard from './content-card'
import { getContents } from '@/lib/github/content'

async function RepoPage({ params }: { params: { name: string } }) {
    // let name = decodeURIComponent(params.name).split('/')[1]
    let full_name = decodeURIComponent(params.name)

    let contents = await getContents(full_name)
   

    if (contents === undefined || contents === null || contents.length === 0) {
        return (
            <>
                <div className='flex flex-col flex-1 items-center justify-center'>
                    <div className='p-4 border rounded-xl flex flex-col items-center gap-6 z-50 shadow-md'>    
                        <Bird />
                        <span className='text-xl font-bold'>Empty Repository</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Tabs defaultValue='all' className='w-full'>
            <TabsList className='w-full grid grid-cols-3'>
                <TabsTrigger value='all'>
                    All
                </TabsTrigger>
                <TabsTrigger value='files'>
                    Files
                </TabsTrigger>
                <TabsTrigger value='folders'>
                    Folders
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className='border border-t-0 h-96 lg:h-80 py-2 px-6 overflow-hidden overflow-y-auto scroll-auto z-50 shadow-md rounded-xl rounded-t-none '>
                {contents.map((content) => {
                    return (
                        <>
                            <ContentCard 
                                content={content}
                                key={content.sha} 
                                full_name={full_name}
                             />
                            <div className='w-full py-2' />
                        </>
                    )
                })}
            </TabsContent>
            <TabsContent value="files" className='border border-t-0 h-96 lg:h-80 py-2 px-6 overflow-hidden overflow-y-auto scroll-auto z-50 shadow-md rounded-xl rounded-t-none '>
                {
                    contents.filter(item => item.type === 'file')
                        .map((file) => {
                            return (
                                <>
                                    <ContentCard 
                                        content={file}
                                        key={file.sha}
                                        full_name={full_name}    
                                    />
                                    <div className='w-full py-2' />
                                </>
                            )
                        })
                }
            </TabsContent>
            <TabsContent value="folders" className='border border-t-0 h-96 lg:h-80 py-2 px-6 overflow-hidden overflow-y-auto scroll-auto z-50 shadow-md rounded-xl rounded-t-none '>
                {
                    contents.filter(item => item.type === 'dir')
                        .map((folder) => {
                            return (
                                <>
                                    <ContentCard
                                        content={folder}
                                        key={folder.sha}
                                        full_name={full_name}
                                    />
                                    <div className='w-full py-2' />
                                </>
                            )
                        })

                }
            </TabsContent>
        </Tabs>
    )
}

export default RepoPage