// Implement promisifying an (error,data) style async callback

function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  };
}

// Simulating a fake async call
function foo(url, options, callback) {
  setTimeout(() => {
    if (!url) return callback(new Error("No URL"));
    callback(null, { ok: true, url, options });
  }, 300);
}

const promisifiedFoo = promisify(foo);

promisifiedFoo("example.com", { foo: 1 })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
