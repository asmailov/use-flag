# use-flag

Utility React hook

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

```
import React from "react";
import useFlag from "use-flag";

export function Component() {
  const { isExpanded, on, off, toggle } = useFlag("isExpanded", false);

  return (
    <div>
      <div>{isExpanded ? 'Is expanded' : 'Is collapsed'}</div>
      <button type="button" onClick={on}>On</button>
      <button type="button" onClick={off}>Off</button>
      <button type="button" onClick={toggle}>Toggle</button>
    </div>
  );
}
```
