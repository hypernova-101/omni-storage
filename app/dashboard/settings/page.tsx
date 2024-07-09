import { UserButton } from "@clerk/nextjs"
import { cookies } from "next/headers"
import TokenAvailable from "./token-available"
import TokenNotAvailable from "./token-not-available"

function UserPage() {

  let isValidToken = false
  let token = cookies().get('token')

  if(token) {
    isValidToken = token.value.startsWith('github_pat')
  }

  return (
    <div className="flex flex-1 gap-4 flex-col py-8 px-4 rounded-xl shadow-md z-50 items-center justify-center border">
      <UserButton />
      { isValidToken ? <TokenAvailable/> : <TokenNotAvailable/> }
    </div>
  )
}

export default UserPage
