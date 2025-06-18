import type React from "react"
// Generate random color in hex format
export function getRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Get a pair of colors that work well together
export function getGradientColors(): [string, string, string] {
  // Base hue (0-360)
  const hue = Math.floor(Math.random() * 360)
  // Create analogous colors (adjacent on color wheel)
  const hue2 = (hue + 30) % 360
  const hue3 = (hue + 60) % 360

  // Convert HSL to hex
  const saturation = 70 + Math.floor(Math.random() * 30) // 70-100%
  const lightness = 40 + Math.floor(Math.random() * 20) // 40-60%

  const color1 = hslToHex(hue, saturation, lightness)
  const color2 = hslToHex(hue2, saturation, lightness)
  const color3 = hslToHex(hue3, saturation, lightness)

  return [color1, color2, color3]
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Generate mesh gradient styles for card backgrounds
export function getMeshGradientStyle(): React.CSSProperties {
  const [color1, color2, color3] = getGradientColors()
  const angle = Math.floor(Math.random() * 360)

  return {
    background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${color1}99 0%, transparent 50%), 
                 radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${color2}99 0%, transparent 50%), 
                 radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${color3}99 0%, transparent 50%), 
                 linear-gradient(${angle}deg, ${color1}99, ${color2}99)`,
  }
}
