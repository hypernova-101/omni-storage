import React from 'react'
import RepoCard from './repo-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getRepos } from '@/lib/github/repos'
import Refresh from './refresh'

async function DashboardPage() {

  let data = await getRepos()

  return (
    <>
      <div className='flex flex-row w-full items-center justify-between'>
        <h1 className='text-2xl font-extrabold'>{data.length} Buckets</h1>
        <div className='flex items-center justify-start gap-x-4 flex-row'>
          <Refresh/>
          <Link href='/dashboard/new'>
            <Button>Create</Button>
          </Link>
        </div>
      </div>
      <div
        className="h-[480px] lg:h-96 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded-xl overflow-hidden overflow-y-auto scroll-auto shadow-md z-50"
      >
        { data.map((repo) => {
          return(
            <RepoCard repo={repo} key={repo.id}/>
          )
        })}
      </div> 
    </> 
  )
}


export default DashboardPage