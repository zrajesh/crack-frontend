// Implement executing n-async callbacks in parallel
async function executeInParallel(callbacks) {
  if (!Array.isArray(callbacks)) {
    throw new Error("Expected an array of async functions");
  }

  const promises = callbacks.map((cb) => cb());
  return Promise.all(promises);
}

// Example Usage
const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const asyncCallbacks = [
  () => delay(1000, "First"),
  () => delay(500, "Second"),
  () => delay(1500, "Third"),
];

executeInParallel(asyncCallbacks)
  .then((results) => {
    console.log("All done:", results); // ["First", "Second", "Third"]
  })
  .catch((err) => {
    console.error("Error in one of the callbacks:", err);
  });
