'use clinet'
import { Button } from "@/components/ui/button"
import { SendHorizontal } from 'lucide-react'

export const PromptSection = () => {
    return (
        <form className="flex items-end justify-between border border-border mx-6 rounded-xl pb-2 px-2 max-w-2xl w-full">
          <div className="flex-1 relative">
            <textarea
              placeholder="Describe your idea here..."
              className="w-full p-3 rounded-lg outline-none h-32 resize-none bg-background text-foreground placeholder:text-muted-foreground"
              aria-label="Project prompt input"
            />
          </div>
          <Button type="submit" size="icon" className="ml-2" aria-label="Generate Project">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
    )
}