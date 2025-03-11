// Write polyfill of promise.all

const dummyAPI = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

const tasksArray = [dummyAPI(1000), dummyAPI(3000), dummyAPI(5000)];

const myPromiseAll = (tasksArray) => {
  return new Promise((resolve, reject) => {
    const output = [];
    if (tasksArray.length === 0) resolve([]);
    tasksArray.forEach((promise, index) => {
      promise
        .then((data) => {
          console.log(`data is ${data}`);
          output[index] = data;
          if (index === tasksArray.length - 1) resolve(output);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

myPromiseAll(tasksArray)
  .then((data) => {
    console.log(`the output if ${data}`);
  })
  .catch((err) => {
    console.log(`the error is ${err}`);
  });
