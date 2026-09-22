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
          <div className="id-frame w-40 mb-6">
            <img
              src="/images/mypfp.jpg"
              alt="Rud Gabriel Ba-oy"
              className="w-40 h-40 object-cover block"
            />
            <div className="bg-crimson text-ink font-mono text-[10px] tracking-widest uppercase text-center py-1">
              identity
            </div>
          </div>

          <p>
           As a BSIT student at PHINMA-University of Iloilo, I, Rud Gabriel, aspire to become a software developer because I enjoy using technology to create solutions to real-world problems.
          I am drawn to this career because software development allows me to combine creativity, logical thinking, and problem-solving to build things that can be useful in people's everyday lives. 
          I find challenging projects exciting because they give me opportunities to learn, experiment, and discover better ways of doing things. My goal is to develop software that not only works effectively 
          but also makes tasks simpler, more convenient, and enjoyable for the people who use it.

          </p>
          <p>
            I am an enthusiastic and passionate software developer who enjoys creating software based on the excitement, creativity, and challenges 
            that come with development. I see programming not only as a way to build useful applications, 
            but also as an opportunity to solve problems, explore new ideas, and continuously improve my skills. 
            I enjoy taking on challenging projects because they push me to think creatively and find unique solutions. 
            For me, the most rewarding part of software development is the process of turning an idea into something functional and enjoyable, especially 
            when I can experiment, learn from mistakes, and overcome difficult problems along the way.
          </p>
          <p>
      
          </p>

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
                <p className="text-text font-medium">Intern,Lead Gen </p>
                <p className="text-muted">2023 — 2023</p>
              </li>
              <li>
                <p className="text-text font-medium"></p>
                <p className="text-muted"></p>
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
