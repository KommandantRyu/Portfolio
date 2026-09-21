export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="mb-12 max-w-prose">
      {eyebrow && (
        <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3 flex items-center gap-3">
          <span className="w-6 h-px bg-gold/50" />
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl md:text-5xl font-semibold text-text mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-muted text-lg leading-relaxed">{description}</p>
      )}
    </header>
  )
}
