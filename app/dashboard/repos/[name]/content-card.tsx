import React from 'react'
import { Content } from '../../modals'
import { File, Folder } from 'lucide-react'
import CardOptions from './card-options'
import Link from 'next/link'

function ContentCard({
   content, full_name 
}: {
  content: Content,
  full_name: string 
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

        <CardOptions content={content} />
      </div>
    )
  } else {
    return (
      <Link href={`${encodeURIComponent(full_name)}/${content.name}`}>
        <div className='w-full p-4 flex flex-row items-center justify-between z-50 shadow-md rounded-xl border hover:bg-primary-foreground'>
          <div className='flex flex-row gap-4 items-center justify-start'>
            <Folder />

            <div className='flex flex-col'>
              <h1>{content.name.length > 14 ? `${content.name.slice(0, 14)}...` : content.name}</h1>
            </div>
          </div>

          <CardOptions content={content} />
        </div>
      </Link>
    )
  }


}

export default ContentCard