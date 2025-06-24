// Implement cancellable promises on timeout
function cancellablePromiseWithTimeout(promiseFn, timeout) {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort(); // abort after timeout
  }, timeout);

  return {
    promise: promiseFn(signal).finally(() => clearTimeout(timeoutId)),
    cancel: () => {
      clearTimeout(timeoutId);
      controller.abort(); // allow manual
    },
  };
}

// Example Usage
const mockAsyncTask = (signal) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => resolve("✅ Done"), 5000);
    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

const { promise, cancel } = cancellablePromiseWithTimeout(mockAsyncTask, 3000);

promise.then(console.log).catch((err) => {
  if (err.name === "AbortError") {
    console.warn("⏱️ Cancelled due to timeout or manual abort");
  } else {
    console.error("Error:", err);
  }
});

// Optional manual cancel
// setTimeout(cancel, 1000);
