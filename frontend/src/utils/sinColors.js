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

// Space-separated RGB channels for each sin hue (mirrors the --c-sin-* vars
// in index.css). Exposed so components can hand a raw value to CSS via a
// custom property, e.g. style={{ '--sin': sinRgb(cat.sin) }} — then rules
// like box-shadow: 0 0 20px rgb(var(--sin) / 0.5) can be tinted per item.
export const SIN_RGB = {
  wrath: '214 69 69',
  lust: '224 136 48',
  sloth: '212 178 60',
  gluttony: '76 175 109',
  envy: '155 111 196',
  gloom: '111 184 217',
  pride: '74 127 199',
}

export const DEFAULT_SIN_RGB = '143 127 119'

export function sinRgb(sin) {
  return SIN_RGB[sin] || DEFAULT_SIN_RGB
}
