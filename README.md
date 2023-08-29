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
const { isPrime, changeMaxInt } = require("../src/index.js");

// By default, prime numbers can be determined up to a maximum of 8388607.
isPrime(3); // Output: true
isPrime(8); // Output: false
isPrime(8388607); // Output: false

// You can adjust the maximum value for prime number determination as needed.
changeMaxInt(9999999); // Set the maximum value to 99999999
isPrime(9999999); // Output: false

// You can specify a range and get the prime numbers in that range.
changeMaxInt(15); // Set the maximum value to 15
getPrimes(); // Range: 1〜15, Output: [2, 3, 5, 7, 11, 13]
getPrimes(10); // Range: 1〜10, Output: [2, 3, 5, 7]
getPrimes(4, 12); // Range: 4〜10, Output: [5, 7, 11]
```

### License

Copyright (c) 2023, [s-hama](https://github.com/s-hama).
Released under the [MIT License](LICENSE).

***
