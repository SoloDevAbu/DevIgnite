'use client'

export const PromptSuggestion = () => {
    return (
        <div className="flex justify-center gap-1.5 flex-wrap max-w-3xl">
          {["Create TODO Website", "Build a mobile app with Expo", "Create a Management app"].map((tag, index) => (
            <span key={index} className="bg-muted rounded-full text-xs p-1.5 border border-border shadow-sm cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
    )
}