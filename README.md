# use-flag

Utility react hook to simplify use cases when a 'flag' value and it's controls are needed.

[![codecov](https://codecov.io/gh/asmailov/use-flag/branch/main/graph/badge.svg?token=MX28F7RNML)](https://codecov.io/gh/asmailov/use-flag)

## Installation

### npm

`npm i use-flag`

### yarn

`yarn add use-flag`

## Import

`import useFlag from "use-flag";`

or

`import { useFlag } from "use-flag";`

## Usage:

```javascript
import React from "react";
import useFlag from "use-flag";

export function Component() {
  const [isExpanded, { on, off, toggle }] = useFlag(false);
  // or
  // const { isExpanded, on, off, toggle } = useFlag("isExpanded", false);

  return (
    <div>
      <div>{isExpanded ? "Is expanded" : "Is collapsed"}</div>
      <button type="button" onClick={on}>
        On
      </button>
      <button type="button" onClick={off}>
        Off
      </button>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
}
```

```javascript
// initial value can be ommited and will default to 'false'
useFlag("isExpanded");
// or
useFlag();
```

## Motivation

There are many cases when a simple 'flag' value with toggle functionality is needed.
To achieve this with default react we could write.

```javascript
const [isExpanded, setIsExpanded] = useState(false);

return (
  <button type="button" onClick={() => setIsExpanded((value) => !value)} />
);
```

After writing the same code many times I've decided to write a generic solution for this problem.
