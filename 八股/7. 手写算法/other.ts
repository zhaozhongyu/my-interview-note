// 实现一个批量请求函数, 能够限制并发量?
async function sendRequest(urls: string[], max: number, callback: () => void) {
  async function send() {
    do {
      let url = urls.shift();
      if (!url) {
        return;
      }
      try {
        await fetch(url);
      } catch(e) {
        //
      }
    } while(urls.length > 0);
  }
  let sendinglist: any[] = [];
  for(let i = 0; i < max; i++) {
    sendinglist.push(send());
  }
  Promise.all(sendinglist).then(() => callback());
}

type test = {
  name: string;
} & {age: number};

interface test1 {
  name: string;
  age: number;
}

interface test1 {
  male: boolean;
}

class people implements test {
  name: string;
  age: number;
}