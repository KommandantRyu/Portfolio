import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Gear from './components/Gear.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import BeyondCodeHub from './pages/BeyondCodeHub.jsx'
import BeyondCodeCategory from './pages/BeyondCodeCategory.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background machinery: huge, faint gears turning very slowly */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Gear size={340} spin spinDuration="140s" className="absolute -left-24 top-1/3 text-gold/[0.05]" />
        <Gear size={260} spin reverse spinDuration="110s" className="absolute -right-16 bottom-8 text-crimson/[0.07]" />
        <Gear size={170} spin reverse spinDuration="80s" className="absolute right-[18%] -top-10 text-gold/[0.04]" />
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
