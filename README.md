<h1 align="center">Welcome to @casperengl/try-catch 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@casperengl/try-catch" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@casperengl/try-catch.svg">
  </a>
  <a href="https://github.com/CasperEngl/try-catch#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CasperEngl/try-catch/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CasperEngl/try-catch/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CasperEngl/@casperengl/try-catch" />
  </a>
  <a href="https://twitter.com/casperengl" target="_blank">
    <img alt="Twitter: casperengl" src="https://img.shields.io/twitter/follow/casperengl.svg?style=social" />
  </a>
</p>

> Package to trycatch code that accepts functions and promises

### 🏠 [Homepage](https://github.com/CasperEngl/try-catch#readme)

## Install

```sh
npm install @casperengl/try-catch

# or
yarn add @casperengl/try-catch
```

## Usage

### ES2015+

```js
import { tryCatch } from '@casperengl/try-catch';
```

### CommonJS

```js
const { tryCatch } = require('@casperengl/try-catch');
```

#### Function

```js
(async () => { // success
  const fn = () => 'success';
  
  const [error, result] = await tryCatch(fn);

  console.log([error, result]); // [null, 'success']
})();

(async () => { // error
  const fn = () => {
    if (true) {
      throw new Error('An error occurred');
    }

    return 'success';
  };
  
  const [error, result] = await tryCatch(fn);

  console.log([error, result]); // [[Error: An error occurred], undefined]
})();
```

#### Promise

```js
(async () => { // success
  const promise = () => Promise.resolve('success');

  const [error, result] = await tryCatch(promise);

  console.log([error, result]) // [null, 'success']
})();

(async () => { // error
  const promise = () => Promise.reject('An error occurred');

  const [error, result] = await tryCatch(promise);

  console.log([error, result]) // [[Error: An error occurred], undefined]
})();
```

## Run tests

```sh
npm run test
```

## Author

👤 **Casper Engelmann <me@casperengelmann.com>**

* Website: https://casperengelmann.com/
* Twitter: [@casperengl](https://twitter.com/casperengl)
* Github: [@CasperEngl](https://github.com/CasperEngl)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/CasperEngl/try-catch/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Casper Engelmann <me@casperengelmann.com>](https://github.com/CasperEngl).<br />
This project is [MIT](https://github.com/CasperEngl/try-catch/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_