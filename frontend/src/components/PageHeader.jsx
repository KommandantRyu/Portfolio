export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="mb-12 max-w-prose">
      {eyebrow && (
        <p className="font-mono text-xs text-teal mb-3">{eyebrow}</p>
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
