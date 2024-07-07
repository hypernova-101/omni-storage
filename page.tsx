import { Button } from "@/components/ui/button"
import { SignedIn } from "@clerk/nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

function Page() {
  let isValidToken = false
  const token = cookies().get('token')

  if(token) {
    isValidToken = token.value.startsWith('github_pat')
  }

  return (
    <div className="flex flex-1 h-screen w-full items-center justify-center">
      <SignedIn>
        {isValidToken
          ? (
            <Button>
              <Link href="/dashboard">
                Continue to dashboard
              </Link>
            </Button>
          )
          : (
            <Button>
                <Link href="/dashboard/settings">
                  Continue to settings 
                </Link>
            </Button>
          )
        }
      </SignedIn>
    </div>
  )
}

export default Page