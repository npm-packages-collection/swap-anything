
# swap-anything

This package provides a utility function to swap any two values in JavaScript, including primitives, objects, arrays, typed arrays, maps, sets, and other built-in JavaScript types.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The `swap-anything` package allows swapping any two values, regardless of their type. This includes primitives, objects, arrays, sets, maps, and other complex JavaScript data structures. It’s a simple and flexible utility that fits easily into most JavaScript or Node.js projects.

## Installation

You can install the package via npm:

```bash
npm install swap-anything
```

## Usage

Here’s an example of how to use the `swap-anything` function:

```javascript
import { swapAnything } from 'swap-anything';

// Swap two numbers
let a = 5, b = 10;
[a, b] = swapAnything(a, b);
console.log(a, b);  // Outputs: 10 5

// Swap two objects
let objA = { key: 'value1' }, objB = { key: 'value2' };
[objA, objB] = swapAnything(objA, objB);
console.log(objA, objB);  // Outputs: { key: 'value2' } { key: 'value1' }
```

## Development

To contribute to `swap-anything`, clone the repository and start adding new features or fixing issues.

### Scripts

- **Install dependencies:**
  ```bash
  npm install
  ```

- **Run the project in development mode:**
  ```bash
  npm run dev
  ```

## Testing

Run the test cases using:

```bash
npm test
```

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or improvements, feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the CC-BY-SA-4.0 License.
