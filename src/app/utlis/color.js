export function generatePleasantHexColor() {
  // Define hue range (0–360), soft saturation (30–70), and lightness (60–85)
  const hue = Math.floor(Math.random() * 360) // Any hue
  const saturation = Math.floor(Math.random() * 40) + 30 // 30% to 70%
  const lightness = Math.floor(Math.random() * 25) + 60 // 60% to 85%

  // Convert HSL to HEX
  return hslToHex(hue, saturation, lightness)
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    Math.round(255 * (l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1)))
      .toString(16)
      .padStart(2, '0')

  return `#${f(0)}${f(8)}${f(4)}`
}
