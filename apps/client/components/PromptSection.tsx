'use client'
import { Button } from "@/components/ui/button"
import { SendHorizontal } from 'lucide-react'
import { useState } from "react"
import axios from 'axios';

export const PromptSection = () => {
  const [prompt, setPrompt] = useState('');

  const handleProjectCreation = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const project = await axios.post("http://localhost:5000/project", {
          prompt: prompt
        }, {
          withCredentials: true
        })

        console.log(project)
      } catch (error) {
        console.error(error)
      }
  }

    return (
        <form className="flex items-end justify-between border border-border mx-6 rounded-xl pb-2 px-2 max-w-2xl w-full"
          
        onSubmit={handleProjectCreation}

        >
          <div className="flex-1 relative">
            <textarea
              value={prompt}
              placeholder="Describe your idea here..."
              className="w-full p-3 rounded-lg outline-none h-32 resize-none bg-background text-foreground placeholder:text-muted-foreground"
              aria-label="Project prompt input"
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button type="submit" size="icon" className="ml-2" aria-label="Generate Project">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
    )
}