import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl tracking-tight text-ink">
              A<span className="lowercase">i</span>GENT <span className="text-green">SMITH</span>
            </div>
            <p className="mono-description mt-3 max-w-xs text-ink-mute">
              The AI tools directory for builders, operators and creators. New tools every week.
            </p>
            <p className="mono mt-4 text-[11px] tracking-[0.14em] text-ink-mute">
              A <a href="https://19keys.com/ai" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">High Lvl AI</a> property
            </p>
          </div>
          <Col title="Directory" links={[["All tools", "/#directory"], ["Submit a tool", "/submit"], ["App of the day", "/#featured"]]} />
          <Col title="Learn" links={[["AI Tool Finder", "/survey"], ["AI Alchemy Dictionary", "/dictionary"], ["About", "/about"]]} />
          <Col title="Community" links={[["Join Ziion (CNFDNT)", "https://ziion.io/nations/cnfdnt"], ["CNFDNT.CO", "https://cnfdnt.co"], ["Advertise", "/advertise"], ["Contact", "mailto:cnfdnt.ai@gmail.com"]]} />
        </div>
        <div className="mono mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[11px] tracking-[0.12em] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} AiGENT SMITH · Built by High Lvl AI</span>
          <span>Built for people who ship.</span>
        </div>
      </div>
    </footer>
  )
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-display text-sm text-ink">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="font-sans text-sm text-ink-soft transition-colors hover:text-green">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
