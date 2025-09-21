// oklch 转 hex
// 复制粘贴了 npm 中的 oklch 包
// 为什么不直接用呢，因为导入不进来，哈哈
// 同时升级为 TypeScript，添加了类型支持

const oklabToLinearRgb = (L: number, a: number, b: number) => {
  const l = L + 0.3963377774 * a + 0.2158037573 * b
  const m = L - 0.1055613458 * a - 0.0638541728 * b
  const s = L - 0.0894841775 * a - 1.291485548 * b

  const l3 = l * l * l
  const m3 = m * m * m
  const s3 = s * s * s

  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ]
}

const linearToSrgb = (rgb: number[]) => {
  return rgb.map((c) => {
    if (c <= 0.0031308) {
      return 12.92 * c
    }
    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  })
}

const oklchToRgb = (l: number, c: number, h: number) => {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)

  const linear = oklabToLinearRgb(l, a, b)
  return linearToSrgb(linear)
}

const oklchToHex = (l: number, c: number, h: number) => {
  const rgb = oklchToRgb(l, c, h)
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(1, n)) * 255)
      .toString(16)
      .padStart(2, '0')
  return '#' + rgb.map(toHex).join('')
}

export default oklchToHex
