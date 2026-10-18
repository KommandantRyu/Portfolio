import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Chain from '../components/Chain.jsx'

export default function About() {
  return (
    <section>
      <PageHeader
        eyebrow="about"
        title="A bit about how I work"
        description="Background, how I approach problems, and what I care about."
      />

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-5 text-text/90 leading-relaxed max-w-prose">
          <div className="sinner-card w-44 mb-6">
            <div className="sinner-card-inner">
              <div className="sinner-card-band">identity file</div>
              <div className="relative">
                <span className="sinner-card-no">NO. 01</span>
                <img
                  src="/images/mypfp.jpg"
                  alt="Rud Gabriel Ba-oy"
                  className="sinner-card-photo"
                />
                <Chain
                  size={18}
                  links={5}
                  sway
                  swayDuration="6s"
                  className="absolute top-1 right-1 text-gold/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] rotate-[35deg] origin-top-right z-10"
                />
                <span className="dog-ear" />
              </div>
              <div className="sinner-card-ticket" />
              <div className="sinner-card-plate">
                <p className="font-display text-sm font-semibold text-text leading-tight">
                  Rud Gabriel Ba-oy
                </p>
                <p className="font-mono text-[10px] text-gold tracking-widest uppercase mt-1">
                  software developer
                </p>
              </div>
            </div>
          </div>

          <div className="paper-lines border border-border px-5 py-4 -mx-1">
            <p>
              I'm Rud Gabriel, a BSIT student at PHINMA-University of Iloilo and a
              software developer focused on web apps and APIs. I like taking
              problems that are messy in real life and turning them into
              interfaces that are simple to use. Most of what I know came from
              building things — picking up a stack because a project needed it,
              breaking it, and figuring out why.
            </p>
            <p>
              I do my best work on projects that push me: hard bugs and
              unfamiliar tools are where I learn the fastest. The goal is
              straightforward — build software that actually works and makes
              everyday tasks easier for the people using it. Whether it's school,
              a personal project, or something for this site, I'd rather ship
              something real than talk about it.
            </p>
          </div>

          <div className="glow-divider my-2" />

          <Link
            to="/beyond-code"
            className="inline-flex items-center gap-2 text-crimson font-medium hover:underline"
          >
            See what I do outside of coding →
          </Link>
        </div>

        <div className="space-y-6">
          <div className="card">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">experience</p>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-text font-medium">Intern, Lead Gen</p>
                <p className="text-muted">2023 — 2023</p>
              </li>
            </ul>
          </div>

          <div className="card">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">education</p>
            <p className="text-text font-medium text-sm">BSIT, PHINMA-UI</p>
            <p className="text-muted text-sm">2024-Present</p>
          </div>
        </div>
      </div>
    </section>
  )
}
