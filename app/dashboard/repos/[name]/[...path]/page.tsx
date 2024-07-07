import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Bird } from 'lucide-react'
import RepoOptions from '../../repo-options'
import { Content } from '@/app/dashboard/modals'
import InterContentCard from './inter-content-card'
import { getContents } from '@/lib/github/content'

async function PathPage({ params }: { params: { name: string, path: string[] } }) {
  let name = decodeURIComponent(params.name).split('/')[1]
  let full_name = decodeURIComponent(params.name)
  let path = ''

  if (params.path.length > 1) {
    params.path.forEach((p) => {
      path = path + `/${p}`;
    })
  } else {
    path = params.path[0]
  }

  let contents: Content[] = await getContents(full_name, path)

  if (contents === undefined || contents === null || contents.length === 0) {
    return (
      <>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <Bird />
          <span className='text-xl font-bold'>Empty Repository</span>
        </div>
      </>
    )
  }


  return (
    <>
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
                <InterContentCard
                  content={content}
                  key={content.sha}
                  path={path}
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
                    <InterContentCard
                      content={file}
                      key={file.sha}
                      path={path}
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
                    <InterContentCard
                      content={folder}
                      key={folder.sha}
                      path={path}
                    />
                    <div className='w-full py-2' />
                  </>
                )
              })

          }
        </TabsContent>
      </Tabs>
    </>
  )
}

export default PathPage
