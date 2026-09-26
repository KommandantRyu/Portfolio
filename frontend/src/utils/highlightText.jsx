// Splits "...{Keyword}..." into plain text plus highlighted keyword spans —
// the colored/underlined keyword styling used across the skill cards.
export function renderKeywordText(text, accentClass) {
  return text.split(/(\{[^}]+\})/g).map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span
          key={i}
          className={`${accentClass} font-semibold underline decoration-dotted underline-offset-2`}
        >
          {part.slice(1, -1)}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}
