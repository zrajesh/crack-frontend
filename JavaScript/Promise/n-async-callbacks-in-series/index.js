// Implement executing n-async callbacks in series
async function executeInSeries(callbacks) {
  if (!Array.isArray(callbacks)) {
    throw new Error("Expected an array of async functions");
  }

  const results = [];

  for (const cb of callbacks) {
    const result = await cb();
    results.push(result);
  }

  return results;
}

// Example Usage
const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const asyncCallbacks = [
  () => delay(1000, "First"),
  () => delay(500, "Second"),
  () => delay(300, "Third"),
];

executeInSeries(asyncCallbacks)
  .then((results) => {
    console.log("All done in series:", results);
    // Logs after ~1.8s: ["First", "Second", "Third"]
  })
  .catch((err) => {
    console.error("Error in one of the callbacks:", err);
  });

// Important Point to Remember
//   ⚔️ The Core Difference:
// for...of is compatible with await, while forEach isn’t, because of how control flow and promises work in JavaScript.

// for (const cb of callbacks) {
//   await cb(); // pauses the loop here until cb() resolves
// }

// JavaScript waits before moving to the next iteration.
// The await is inside an async function, and it's in a regular loop, so the runtime pauses correctly.
// The loop body is async, but the loop itself is still synchronous in structure, so await works naturally.

// ❌ forEach — does NOT wait for await
// callbacks.forEach(async cb => {
//   await cb(); // fires all at once, doesn't wait
// });

// forEach is not async-aware — it doesn't wait for the async cb => {} function to complete.
// It just schedules all iterations immediately and continues.
// The outer function (executeInSeries) will return before those inner async callbacks finish.
