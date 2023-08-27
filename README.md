# ＠sigma-js/primes [![NPM version](https://img.shields.io/npm/v/@sigma-js/primes.svg?style=flat)](https://www.npmjs.com/package/@sigma-js/primes) [![NPM monthly downloads](https://img.shields.io/npm/dm/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) [![NPM total downloads](https://img.shields.io/npm/dt/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/@sigma-js/primes.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/@sigma-js/primes)

This is a simple JavaScript module that generates prime numbers using the Sieve of Eratosthenes algorithm, enabling fast prime number detection and prime number operations. 

(Currently, functions beyond prime number detection are under development.)


## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i @sigma-js/primes
```

## Usage

```js
const primes = require("../src/index.js");

// By default, prime numbers can be determined up to a maximum of 8388607.
primes.isPrime(3) // Output: true
primes.isPrime(8) // Output: false
primes.isPrime(8388607) // Output: false

// You can adjust the maximum value for prime number determination as needed.
primes.changeMaxInt(9999999);
primes.isPrime(9999999); // Output: false
```

### License

Copyright (c) 2023, [s-hama](https://github.com/s-hama).
Released under the [MIT License](LICENSE).

***
