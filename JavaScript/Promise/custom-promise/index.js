// Implement your own promise from scratch
class CustomPromise {
  constructor(executor) {
    this._state = "pending";

    this._successCallbackHandlers = [];
    this._failureCallbackHandlers = [];
    this._finallyCallbackHandler = undefined;

    this._value = undefined;
    this._reason = undefined;

    executor(
      this._promiseResolver.bind(this),
      this._promiseRejector.bind(this)
    );
  }

  then(handlerFn) {
    if (this._state === "fulfilled") {
      handlerFn(this._value);
    } else {
      this._successCallbackHandlers.push(handlerFn);
    }
    return this;
  }

  catch(handlerFn) {
    if (this._state === "rejected") {
      handlerFn(this._reason);
    } else {
      this._failureCallbackHandlers.push(handlerFn);
    }
    return this;
  }

  finally(handlerFn) {
    if (this._state !== "pending") return handlerFn();
    this._finallyCallbackHandler = handlerFn;
  }

  _promiseResolver(value) {
    if (this._state === "fulfilled") return;
    this._state = "fulfilled";
    this._value = value;
    this._successCallbackHandlers.forEach((cb) => cb(value));
    if (this._finallyCallbackHandler) this._finallyCallbackHandler();
  }

  _promiseRejector(reason) {
    if (this._state === "rejected") return;
    this._state = "rejected";
    this._reason = reason;
    this._failureCallbackHandlers.forEach((cb) => cb(reason));
    if (this._finallyCallbackHandler) this._finallyCallbackHandler();
  }
}

function asyncCall() {
  return new CustomPromise((resolve, reject) => {
    resolve(1);
    // reject("ASYNC TASK FAILED");
  });
}

const promise = asyncCall();
promise
  .then((val) => {
    console.log("RESOLVED: ", val);
  })
  .catch((err) => {
    console.error("REJECTED: ", err);
  })
  .finally(() => {
    console.log("FINALLY");
  });
