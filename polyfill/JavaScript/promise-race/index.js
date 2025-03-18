const race = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve, reject) // resolve, when any of the input promise resolves
        .catch(reject); // reject, when any of the input promise rejects
    });
  });
};

const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});

const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});

race([test1, test2, test3])
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });
