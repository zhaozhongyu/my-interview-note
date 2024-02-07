

const scheduler = (max) => {
  let num = 0;
  const list = [];
  return (task) => {
    return new Promise((resolve) => {
      const exec = () => {
        num++;
        task().then((res) => {
          resolve(res);
          num--;
          if (num < max) {
            const next = list.shift();
            next && next();
          }
        })
      }
      if (num < max) {
        exec();
      } else {
        list.push(exec);
      }
    })
  }
}


const add = scheduler(2);

const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  });
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  });
add(request1).then(console.log)
add(request2).then(console.log)
add(request3).then(console.log)
add(request4).then(console.log)