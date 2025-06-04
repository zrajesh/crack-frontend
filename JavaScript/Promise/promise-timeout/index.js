// Convert an input promise to a new promise which delays resolving after a timeout
function delayAfterResolve(inputPromise, delayMs) {
  return new Promise((resolve, reject) => {
    inputPromise
      .then((result) => {
        setTimeout(() => resolve(result), delayMs);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const inputPromise = Promise.resolve("done");

delayAfterResolve(inputPromise, 1000).then(console.log);
