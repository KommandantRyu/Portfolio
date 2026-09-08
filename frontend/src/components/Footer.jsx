export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-8 mt-16">
      <p className="text-sm text-muted">
        © {new Date().getFullYear()} Your Name. Built with React, Vite, Tailwind CSS and Express.
      </p>
    </footer>
  )
}
