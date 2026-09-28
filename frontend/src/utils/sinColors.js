// Maps a sin name to its Tailwind classes, using the sin.* color tokens
// defined in tailwind.config.js. Falls back to the neutral border color
// for anything unrecognized.
export const SIN_COLORS = {
  wrath: { border: 'border-sin-wrath', text: 'text-sin-wrath', bg: 'bg-sin-wrath' },
  lust: { border: 'border-sin-lust', text: 'text-sin-lust', bg: 'bg-sin-lust' },
  sloth: { border: 'border-sin-sloth', text: 'text-sin-sloth', bg: 'bg-sin-sloth' },
  gluttony: { border: 'border-sin-gluttony', text: 'text-sin-gluttony', bg: 'bg-sin-gluttony' },
  envy: { border: 'border-sin-envy', text: 'text-sin-envy', bg: 'bg-sin-envy' },
  gloom: { border: 'border-sin-gloom', text: 'text-sin-gloom', bg: 'bg-sin-gloom' },
  pride: { border: 'border-sin-pride', text: 'text-sin-pride', bg: 'bg-sin-pride' },
}

export const DEFAULT_SIN_COLOR = {
  border: 'border-border',
  text: 'text-muted',
  bg: 'bg-border',
}

export function sinColor(sin) {
  return SIN_COLORS[sin] || DEFAULT_SIN_COLOR
}
