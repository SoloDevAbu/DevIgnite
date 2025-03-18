import { Appbar } from "@/components/Appbar"
import { Hero } from "@/components/hero"
import { PromptSection } from "@/components/PromptSection"
import { PromptSuggestion } from "@/components/PromptSuggestion"

export default function Home() {
  return (
    <main className="bg-background">
      {/* Header */}
      <Appbar />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center gap-4 mt-20 text-center">
        <Hero />
      </section>

      {/* Prompt Input Area */}
      <section className="w-full flex justify-center mt-24">
        <PromptSection />
      </section>

      {/* Prompt Suggestions */}
      <section className="flex justify-center mt-6">
        <PromptSuggestion />
      </section>
    </main>
  )
}
