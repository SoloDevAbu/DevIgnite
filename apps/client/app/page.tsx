import { Button } from "@/components/ui/button"
import { GithubIcon, Linkedin, SendHorizontal } from 'lucide-react'

export default function Home() {
  return (
    <main className="">
      <div className="w-full border-b flex justify-between items-center px-4">
        <div className="container flex h-14 items-center">
          DevIgnite
        </div>
        <div className="flex gap-2">
          <Linkedin />
          <GithubIcon />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl font-bold">What you want to build today?</h1>
        <p className="text-gray-800 font-semibold text-lg">Just describe your idea and let DevIgnite do your work</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex items-end justify-between border border-gray-500 mt-20 mx-6 rounded-xl pb-2 px-2 max-w-2xl w-full">
          <textarea
        placeholder="Send a message..."
        className="flex-1 p-3 rounded-lg outline-none h-32"
          />
          <Button size="icon">
        <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
