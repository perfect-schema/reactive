
class TrackerPlugin {

  constructor(PerfectSchema) {
    this.PerfectSchema = PerfectSchema;
  }

  extendContext(context, schema) {
    if (this.PerfectSchema.Tracker) {
      const dependency = new this.PerfectSchema.Tracker.Dependency();
      const _isValid = context.isValid.bind(context);
      const _setMessage = context.setMessage.bind(context);
      const _reset = context.reset.bind(context);
      const _validate = context.validate.bind(context);

      Object.assign(context, {
        isValid() {
          dependency.depend();

          return _isValid();
        },
        setMessage(field, message) {
          const ret = _setMessage(field, message);

          dependency.changed();

          return ret;
        },
        reset() {
          const valid = this._valid;
          const ret = _reset();

          if (valid !== this._valid) {
            dependency.changed();
          }

          return ret;
        },
        validate(data, options) {
          const valid = this._valid;
          const ret = _validate(data, options);

          if (valid !== this._valid) {
            dependency.changed();
          }

          return ret;
        }
      });
    } else {
      console.warn('PerfectSchema.Tracker not set');
    }

    return context;
  }

}


export default PerfectSchema => new TrackerPlugin(PerfectSchema);
