import React from 'react'
import { File, Folder } from 'lucide-react'
import Link from 'next/link'
import { Content } from '@/app/dashboard/modals'
import InterCardOptions from './inter-card-options'

function InterContentCard({
   content,
   path
}: {
  content: Content,
  path: string
}) {
  if (content.type === "file") {
    return (
      <div className='w-full p-4 flex flex-row items-center justify-between z-50 shadow-md rounded-xl border'>
        <div className='flex flex-row gap-4 items-center justify-start'>
          <File />

          <div className='flex flex-col'>
            <h1>{content.name.length > 14 ? `${content.name.slice(0, 14)}...` : content.name}</h1>
            {content.type === "file" && (<span>{(content.size / 1024).toFixed(1)} KB</span>)}
          </div>
        </div>

        <InterCardOptions content={content} />
      </div>
    )
  } else {
    return (
      <Link href={`${path}/${content.name}`}>
        <div className='w-full p-4 flex flex-row items-center justify-between z-50 shadow-md rounded-xl border hover:bg-primary-foreground'>
          <div className='flex flex-row gap-4 items-center justify-start'>
            <Folder />

            <div className='flex flex-col'>
              <h1>{content.name.length > 14 ? `${content.name.slice(0, 14)}...` : content.name}</h1>
            </div>
          </div>

          <InterCardOptions content={content} />
        </div>
      </Link>
    )
  }


}

export default InterContentCard
