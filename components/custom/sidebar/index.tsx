import { Flame, LogOut, Menu, Plus, Settings, Upload } from "lucide-react"
import { Button } from "../../ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { DarkMode } from "../dark-mode"

function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="z-50 shadow-md" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <DarkMode />
                    </SheetTitle>
                </SheetHeader>
                <div className="h-2/3 flex flex-col items-center justify-center">
                    <Link href="/dashboard" className="w-full">
                        <Button className="w-full gap-2" variant="ghost">
                            <Flame fill="" />
                            <h1>Home</h1>
                        </Button>
                    </Link>
                    <Link href="/dashboard/new" className="w-full">
                        <Button className="w-full gap-2" variant="ghost">
                            <Plus />
                            <h1>Create</h1>
                        </Button>
                    </Link>
                    <Link href="/dashboard/upload" className="w-full">
                        <Button className="w-full gap-2" variant="ghost">
                            <Upload />
                            <h1>Upload</h1>
                        </Button>
                    </Link>
                    <Link href="/dashboard/settings" className="w-full">
                        <Button className="w-full gap-2" variant="ghost">
                            <Settings />
                            <h1>Settings</h1>
                        </Button>
                    </Link>
                </div>
                <SheetFooter className="pt-12">
                    <UserInfo />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

async function UserInfo() {
    const user = await currentUser();
    return (
        <>
            <div className="flex flex-row items-center justify-between gap-2 p-2 py-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                <div className="flex flex-row items-center gap-2">
                    {user?.hasImage && (
                        <Image
                            src={{
                                width: 36,
                                height: 36,
                                src: user.imageUrl
                            }}
                            className="rounded-full shadow-md z-50"
                            alt="Avatar"
                        />
                    )}
                    <div>
                        <span className="text-sm font-bold lg:text-md">{user?.fullName}</span>
                        <h1 className="text-zinc-400 text-sm hidden lg:block">{user?.primaryEmailAddress?.emailAddress}</h1>
                    </div>
                </div>
                <SignOutButton>
                    <Button size="icon" variant="ghost">
                        <LogOut />
                    </Button>
                </SignOutButton>
            </div>
        </>
    )
}

export default Sidebar