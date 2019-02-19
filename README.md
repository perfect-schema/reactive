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

/**
 * Manually setting Tracker to PerfectSchema
 * allows providing custom implementations and
 * prevent unnecessary dependencies
 */
PerfectSchema.Tracker = Tracker;
PerfectSchema.use(trackerPlugin);


const baseSchema = new PerfectSchema({
  foo: String
});


const schema = new PerfectSchema({
  foo: {
    type: String,
    minLength: 10,
    maxLength: 20
  }
});

const context = schema.createContext();

context.isValid();  // reactive method
```

## Documentation

* [Perfect Schema Documentation](https://perfect-schema.github.io/perfect-schema/)


## license

MIT
