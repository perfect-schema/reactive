# Perfect Schema - Tracker Plugin

Enable Tracker-enabled PerfectSchema instances.


## Install

```
npm i -S @perfect-schema/tracker
```

## Usage

```js
import PerfectSchema from '@perfect-schema/base';
import trackerPlugin from '@perfect-schema/tracker';
import { Tracker } from 'meteor/tracker';


PerfectSchema.Tracker = Tracker;
PerfectSchema.use(trackerPlugin);


const baseSchema = new PerfectSchema({
  foo: String
});


const schema = new PerfectSchema({
  foo: {
    type: String,
    min: 10,
    max: 20
  }
});

const context = schema.createContext();

context.isValid();  // reactive method
```

## Documentation

* [Perfect Schema Documentation](https://perfect-schema.github.io/perfect-schema/)


## license

MIT
