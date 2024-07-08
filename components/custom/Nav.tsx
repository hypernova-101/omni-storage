import Sidebar from "./sidebar"

function Nav() {
  return (
    <nav className="fixed top-0 left-0 min-w-full p-4 z-50 shadow-md flex flex-row gap-4 justify-between items-center dark:bg-zinc-900 border-b-2">
        <div className="flex flex-row gap-4 items-center">
          <Sidebar/>
          <h1 className="text-2xl font-bold">Omni</h1>
        </div>
        
    </nav>
  )
}

export default Nav
