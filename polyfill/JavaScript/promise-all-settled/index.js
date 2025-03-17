const allSettled = (promises) => {
  const mappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (err) => ({ status: "rejected", reason: err })
    )
  );

  // run all the promises once with .all
  return Promise.all(mappedPromises);
};

const apiOne = new Promise((resolve) =>
  setTimeout(() => {
    resolve(3);
  }, 200)
);
const apiTwo = new Promise((resolve, reject) => reject(9));
const apiThree = new Promise((resolve) => resolve(5));

allSettled([apiOne, apiTwo, apiThree]).then((val) => {
  console.log(val);
});
