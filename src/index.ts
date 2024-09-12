export const defaultReplacer = (k: string, v: any) => {
  if (v instanceof Error) {
    return v.stack
  }
  if (v instanceof RegExp) {
    return v.toString()
  }
  if (v instanceof Function) {
    return v.toString()
  }
  return v
}

export const stringify = (obj: any, replacer = defaultReplacer, space = 0) => {
  const seen = new WeakSet()
  return JSON.stringify(
    obj,
    (k, v) => {
      if (typeof v === 'object' && v !== null) {
        if (seen.has(v)) {
          return replacer ? replacer(k, `[Circular]`) : `[Circular]`
        }
        seen.add(v)
      }
      return replacer ? replacer(k, v) : v
    },
    space
  )
}
