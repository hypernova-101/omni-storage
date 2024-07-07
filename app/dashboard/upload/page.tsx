import { Upload } from 'lucide-react'
import React from 'react'
import UploadCard from './upload-card'

function UploadPage() {
  
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='p-4 flex flex-col rounded-xl border z-50 shadow-md w-full gap-4 lg:w-[400px]'>
            <div className='flex flex-row w-full items-center justify-center gap-4'>
                <Upload/>
                <h1 className='text-xl font-bold lg:text-2xl'>Upload Files</h1>
            </div>
            <UploadCard/>
        </div>
    </div>
  )
}

export default UploadPage