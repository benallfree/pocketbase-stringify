export const defaultReplacer = (k: string, v: any) => {
  if (v instanceof Error) {
    return `${v}\n${v.stack}`
  }
  if (v instanceof RegExp) {
    return v.toString()
  }
  if (v instanceof Function) {
    return v.toString()
  }
  return v
}

export const stringify = (obj: any, _replacer = defaultReplacer, space = 0) => {
  const replacer = _replacer || defaultReplacer
  const seen = new WeakSet()
  return JSON.stringify(
    obj,
    (k, v) => {
      if (typeof v === 'object' && v !== null) {
        if (seen.has(v)) {
          return replacer(k, `[Circular]`)
        }
        seen.add(v)
      }
      return replacer(k, v)
    },
    space
  )
}

export const parse = <T = any>(str: string): T => {
  try {
    return JSON.parse(str) as T
  } catch (e) {
    return null
  }
}

export const toObject = <T>(input: any): T | null => parse<T>(stringify(input))
