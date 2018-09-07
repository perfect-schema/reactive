import assert from 'assert';
import Tracker from 'meteor-standalone-tracker';
import PerfectSchema from '@perfect-schema/base';
import trackerPlugin from '../src/tracker';


describe('Testing Perfect Schema Tracker plugin', () => {

  PerfectSchema.use(trackerPlugin);


  it('should warn if no Tracker set', () => {
    const schema = new PerfectSchema({
      foo: String
    });
    const warn = console.warn;

    let wasWarned = false;

    console.warn = message => {
      wasWarned = true;
    };

    const context = schema.createContext();

    console.warn = warn;

    assert.strictEqual(wasWarned, true, 'Did not warn about missing Tracker');
  });


  it('should be reactive', () => {
    const schema = new PerfectSchema({
      foo: String
    });

    PerfectSchema.Tracker = Tracker;

    const context = schema.createContext();

    let shouldBeValid = context.isValid();
    let trackCounter = 0;

    assert.strictEqual( shouldBeValid, true );

    Tracker.autorun(() => {
      //console.log("*** AUTORUN", trackCounter, context.isValid(), shouldBeValid);
      assert.strictEqual( context.isValid(), shouldBeValid );
      trackCounter++;
    });  // 1

    shouldBeValid = false;
    context.setMessage('foo', 'test');
    Tracker.flush();  // 2

    shouldBeValid = true;
    context.reset();
    Tracker.flush();  // 3

    context.reset();
    Tracker.flush();  // ... should not call autorun

    shouldBeValid = false;
    context.setMessage('foo', 'test 2');
    Tracker.flush();  // 4

    shouldBeValid = true;
    context.validate({ foo: 'valid' });
    Tracker.flush();  // 5

    context.validate({ foo: 'another value' });
    Tracker.flush();  // ... should not call autorun

    assert.strictEqual( trackCounter, 5 );
  });


});
