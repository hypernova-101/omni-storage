import Nav from "@/components/custom/Nav"

function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Nav />
      <div className="pt-24 px-6 flex flex-col gap-5">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout