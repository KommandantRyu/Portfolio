import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

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
          <img
            src="/images/mypfp.jpg"
            alt="Your Name"
            className="w-40 h-40 rounded-full object-cover border border-border mb-6"
          />

          <p>
            An BSIT student at PHINMA-University of Iloilo, I Rud Gabriel is following this 
            career because I'm motivated to slove problems that people might have for 
            their daily life that can be automated or made easy to do with the help of software engineering
          </p>
          <p>
            Use the second paragraph to describe how you like to work: do you
            favor small iterative releases, pairing with teammates, writing
            tests first? Recruiters and collaborators read this section to
            get a sense of what you'd be like on their team.
          </p>
          <p>
            Close with something personal — a hobby, a side interest, or what
            you're currently learning. It makes the page feel like a person
            wrote it, not a template.
          </p>

          <Link
            to="/beyond-code"
            className="inline-flex items-center gap-2 text-amber font-medium hover:underline"
          >
            See what I do outside of coding →
          </Link>
        </div>

        <div className="space-y-6">
          <div className="card">
            <p className="font-mono text-xs text-muted mb-3">experience</p>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-text font-medium">Intern, </p>
                <p className="text-muted">2023 — 2023</p>
              </li>
              <li>
                <p className="text-text font-medium"></p>
                <p className="text-muted"></p>
              </li>
            </ul>
          </div>

          <div className="card">
            <p className="font-mono text-xs text-muted mb-3">education</p>
            <p className="text-text font-medium text-sm">Degree, School</p>
            <p className="text-muted text-sm">Graduation year</p>
          </div>
        </div>
      </div>
    </section>
  )
}
