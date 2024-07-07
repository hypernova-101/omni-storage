import React from 'react'
import ChangeToken from './change-token'
import { Check, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

function TokenAvailable() {
    return (
        <div className="border p-4 rounded-xl border-green-400 w-full lg:w-auto flex flex-col gap-4 z-50 shadow-lg">
            <h1 className="text-2xl text-green-400 text-center font-extrabold">All good!</h1>
            <div className='items-center flex flex-col'>
                <div className='p-2 border-green-400 rounded-full border-4'>
                    <Check color='lime' strokeWidth={4}/>
                </div>
            </div>
            <h1 className="text-lg text-center font-extrabold">Change Token</h1>
            <ChangeToken />
            <Button className='gap-2 z-50 shadow-md' variant="outline">
                <Trash size={18}/>
                Clear   
            </Button>
        </div>
    )
}

export default TokenAvailable