export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Rud Gabrie Ba-oy. Built with React, Vite, Tailwind CSS and Express.
        </p>
      </div>
    </footer>
  )
}
