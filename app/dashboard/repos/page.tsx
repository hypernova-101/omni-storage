import { redirect } from 'next/navigation'
import React from 'react'

function ReposPage() {
  return (
    <>{redirect('/dashboard')}</>
  )
}

export default ReposPage