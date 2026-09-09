import PageHeader from '../components/PageHeader.jsx'

export default function About() {
  return (
    <section>
      <PageHeader
        eyebrow="about"
        title="A bit about how I work"
        description="Background, how I approach problems, and what I care about outside code."
      />

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-5 text-text/90 leading-relaxed max-w-prose">
          <img
            src="/images/mypfp.jpg"
            alt="Rud Gabriel Ba-oy"
            className="w-40 h-40 rounded-full object-cover border border-border mb-6"
          />

          <p>
            An BSIT student at PHINMA-University of Iloilo, I Rud Gabriel is following this career
            because I'm motivated to slove problems that people might have for their daily life 
            that can be automated or made easy to do with the help of software engineering
          </p>
          
          <p>
           
          </p>
          <p>
            I Love Burgers and Soulslike
          </p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <p className="font-mono text-xs text-muted mb-3">experience</p>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-text font-medium"></p>
                <p className="text-muted"></p>
              </li>
              <li>
                <p className="text-text font-medium"></p>
                <p className="text-muted"></p>
              </li>
            </ul>
          </div>

          <div className="card">
            <p className="font-mono text-xs text-muted mb-3">education</p>
            <p className="text-text font-medium text-sm">Information Technology, PHINMA-University of Iloilo</p>
            <p className="text-muted text-sm">2024-Present</p>
          </div>
        </div>
      </div>
    </section>
  )
}
