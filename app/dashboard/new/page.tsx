
import React from 'react'
import CreateForm from './create-form'

function NewPage() {


    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col rounded-xl z-50 border shadow-md p-4 w-full lg:w-[400px]'>
                <header>
                    <h1 className='text-center text-lg font-bold lg:text-2xl'>Create Repository</h1>
                </header>
                <CreateForm />
            </div>
        </div>
    )
}

export default NewPage