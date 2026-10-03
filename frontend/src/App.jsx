import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Chain from './components/Chain.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import BeyondCodeHub from './pages/BeyondCodeHub.jsx'
import BeyondCodeCategory from './pages/BeyondCodeCategory.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background machinery: huge, faint chains draped across the corners */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Chain
          size={64}
          links={12}
          sway
          swayDuration="16s"
          className="absolute -left-32 top-1/4 text-gold/[0.06] rotate-[-35deg] origin-top-left"
        />
        <Chain
          size={56}
          links={11}
          sway
          reverse
          swayDuration="13s"
          className="absolute -right-24 bottom-10 text-crimson/[0.08] rotate-[28deg] origin-bottom-right"
        />
        <Chain
          size={40}
          links={8}
          sway
          swayDuration="10s"
          className="absolute right-[14%] -top-6 text-gold/[0.05] rotate-[40deg] origin-top-right"
        />
      </div>

      <Header />
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/beyond-code" element={<BeyondCodeHub />} />
          <Route path="/beyond-code/:category" element={<BeyondCodeCategory />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
