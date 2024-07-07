import React from 'react'
import ChangeToken from './change-token'

function TokenNotAvailable() {
    return (
        <div className="border p-4 rounded-xl border-red-400 w-full lg:w-auto flex flex-col gap-4 z-50 shadow-lg">
            <h1 className="text-2xl text-red-400 text-center font-extrabold">Urgent!</h1>
            <span className="text-center text-sm ">You don't have valid token.</span>

            <ChangeToken />
        </div>
    )
}

export default TokenNotAvailable