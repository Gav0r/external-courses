const myFetch = (url, config) => (
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    let method = 'GET';

    if (config) {
      if (config.method) {
        method = config.method;
      }
    }

    xhr.open(method, new URL(url), true);

    if (config) {
      if (config.headers && config.headers instanceof Object && !Array.isArray(config.headers) && typeof config.headers === 'object') {
        Object.keys(config.headers).forEach((header) => {
          xhr.setRequestHeader(header, config.headers[header]);
        });
      }
    }

    xhr.onload = () => {
      const headers = {};

      const headersString = xhr.getAllResponseHeaders().split('\r\n').filter((header) => !!header.length);

      if (headersString) {
        headersString.forEach((header) => {
          const [name, value] = header.split(': ');
          headers[name] = value;
        });
      }

      res({
        body: JSON.parse(xhr.response),
        headers,
      });
    };

    xhr.onerror = (() => {
      rej(new Error('error'));
    });

    if (config && config.body) {
      xhr.send(JSON.stringify(config.body));
    } else {
      xhr.send();
    }
  })
);

const $getButton = document.querySelector('.get-button');
const $getHeadersButton = document.querySelector('.get-headers-button');
const $postButton = document.querySelector('.post-button');
const $postHeadersButton = document.querySelector('.post-headers-button');

if ($getButton) {
  $getButton.addEventListener('click', () => {
    myFetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => console.log('res: ', res));
  });
}

if ($getHeadersButton) {
  $getHeadersButton.addEventListener('click', () => {
    myFetch('https://jsonplaceholder.typicode.com/todos', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => console.log('res: ', res));
  });
}

if ($postButton) {
  $postButton.addEventListener('click', () => {
    myFetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: { user: 'user1' },
    })
      .then((res) => console.log('res: ', res));
  });
}

if ($postHeadersButton) {
  $postHeadersButton.addEventListener('click', () => {
    myFetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { user: 'user1' },
    })
      .then((res) => console.log('res: ', res));
  });
}
