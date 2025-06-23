// Implement executing n-async callbacks in race
async function executeInRace(callbacks) {
  if (!Array.isArray(callbacks)) {
    throw new Error("Expected an array of async functions");
  }

  const promises = callbacks.map((cb) => cb());
  return Promise.race(promises);
}

// Example Usage
const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const asyncCallbacks = [
  () => delay(1000, "First (1s)"),
  () => delay(500, "Second (0.5s)"),
  () => delay(1500, "Third (1.5s)"),
];

executeInRace(asyncCallbacks)
  .then((result) => {
    console.log("First resolved:", result); // "Second (0.5s)"
  })
  .catch((err) => {
    console.error("First rejected:", err);
  });
