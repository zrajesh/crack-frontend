// Implement throttling promises by batching
// You have a list of asynchronous functions or promise-returning tasks, and you want to execute them N at a time (batching), waiting for the current batch to finish before starting the next.

async function throttlePromisesInBatches(tasks, batchSize) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((task) => task()));
    results.push(...batchResults);
  }

  return results;
}

// Simulate async task
function createTask(id, delay) {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(`Task ${id} done`);
        resolve(id);
      }, delay)
    );
}

const tasks = [
  createTask(1, 400),
  createTask(2, 200),
  createTask(3, 500),
  createTask(4, 100),
  createTask(5, 700),
  createTask(6, 300),
];

throttlePromisesInBatches(tasks, 2).then((results) => {
  console.log("All tasks completed. Results:", results);
});
