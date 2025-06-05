// Auto Retry Promise on rejection
// Implement a function in JavaScript that retries promises N number of times with a delay between each call.

function fetchWithAutoRetry(fetcher, maximumRetryCount, delay = 1000) {
  return new Promise((resolve, reject) => {
    const retry = () => {
      fetcher()
        .then(resolve)
        .catch((error) => {
          if (maximumRetryCount > 0) {
            maximumRetryCount--;
            setTimeout(retry, delay);
          } else {
            reject(error);
          }
        });
    };

    retry();
  });
}
