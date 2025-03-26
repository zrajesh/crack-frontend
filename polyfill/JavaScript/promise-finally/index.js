Promise.prototype.polyfillFinally = function (callback) {
  if (typeof callback !== "function") {
    return this.then(callback, callback);
  }
  // get the current promise or a new one
  const P = this.constructor || Promise;

  // return the promise and call the callback function
  // as soon as the promise is rejected or resolved with its value
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (err) =>
      P.resolve(callback()).then(() => {
        throw err;
      })
  );
};

new Promise((resolve) => setTimeout(() => resolve("Success"), 1000))
  .then((result) => console.log("Result:", result))
  .catch((err) => console.error("Error:", err))
  .polyfillFinally(() => console.log("Cleanup task"));
// OUTPUT
// Result: Success
// Cleanup task

new Promise((_, reject) =>
  setTimeout(() => reject("Something went wrong"), 1000)
)
  .polyfillFinally(() => console.log("Cleanup task"))
  .then((result) => console.log("Result:", result))
  .catch((err) => console.error("Error:", err));
// OUTPUT
// Cleanup task
// Error: Something went wrong
