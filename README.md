# pocketbase-stringify

A cycle-safe, PocketBase-compatible JSON stringifier.

## Installation

```bash
npm install pocketbase-stringify
```

## Usage

```typescript
import { stringify, parse, toObject } from 'pocketbase-stringify'

// Safely stringify objects with circular references
const circular = { a: 1 }
circular.self = circular

stringify(circular) // Handles circular references

// Special types are handled automatically
stringify({
  error: new Error('oops'),
  regex: /test/,
  fn: () => console.log('hello'),
})

// Parse JSON strings
const obj = parse(jsonString)

// Parse JSON strings with type support
const obj = parse<MyType>(jsonString)

// Convert complex objects to plain objects
const plainObj = toObject(complexObj)

// Convert complex objects to plain objects of a specific type
const plainObj = toObject<MyType>(complexObj)
```

## API

- `stringify(obj, replacer?, space?)` - Stringify with circular reference detection
- `parse<T>(str)` - Safe JSON.parse with type support
- `toObject<T>(input)` - Convert to plain object
