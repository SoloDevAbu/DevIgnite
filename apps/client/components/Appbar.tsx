import { GithubIcon, Linkedin} from 'lucide-react'

export const Appbar = () => {
    return (
        <header className="w-full border-b flex justify-between items-center px-4">
            <div className="container flex h-14 items-center text-lg font-bold">
                DevIgnite
            </div>
            <nav className="flex gap-2">
                <a href="https://github.com/SoloDevAbu/DevIgnite" target="_blank" aria-label="GitHub">
                    <GithubIcon />
                </a>
                <a href="https://www.linkedin.com/in/abu-bakkar-siddique-546112205/" target="_blank" aria-label="LinkedIn">
                    <Linkedin />
                </a>
            </nav>
        </header>
    )
}
