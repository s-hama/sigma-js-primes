# ＠sigma-js/primes [![NPM version](https://img.shields.io/npm/v/@sigma-js/primes.svg?style=flat)](https://www.npmjs.com/package/@sigma-js/primes) [![NPM monthly downloads](https://img.shields.io/npm/dm/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) [![NPM total downloads](https://img.shields.io/npm/dt/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/@sigma-js/primes.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/@sigma-js/primes)

This is a simple JavaScript module that generates prime numbers using the Sieve of Eratosthenes algorithm, enabling fast prime number detection and prime number operations.

(Currently, functions beyond prime number detection are under development.)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i @sigma-js/primes
```

## Usage

### JavaScript require

```js
const { changeMaxInt, isPrime, getPrimes … } = require("@sigma-js/primes");
```

### TypeScript import

```js
import { changeMaxInt, isPrime, getPrimes … } from "@sigma-js/primes";
```

### Example

```js
// The default maximum value is 8388607, but you can adjust the maximum value for primality test if necessary.
changeMaxInt(9999999); // Set the maximum value to 99999999

// You can get the result if the specified number is prime.
isPrime(3); // Output: true
isPrime(8); // Output: false
isPrime(8388607); // Output: false

// You can specify a range and get the prime numbers in that range.
changeMaxInt(15); // Set the maximum value to 15
getPrimes(); // Range: 1～15, Output: [2, 3, 5, 7, 11, 13]
getPrimes(10); // Range: 1～10, Output: [2, 3, 5, 7]
getPrimes(4, 12); // Range: 4～12, Output: [5, 7, 11]

// You can obtain the prime factorization result of the specified number.
changeMaxInt(1000); // Set the maximum value to 1000
getFactors(24); // Output: [2, 2, 2, 3]
getFactors(555); // Output: [3, 5, 37]

// You can get prime numbers randomly within a specified range.
changeMaxInt(1000); // Set the maximum value to 1000
getRandomPrime(); // Range: 1～1000, Output: 13
getRandomPrime(10); // Range: 1～10, Output: 7
getRandomPrime(4, 12); // Range: 4～12, Output: 5

// You can get the result if the given numbers are coprime.
changeMaxInt(1000); // Set the maximum value to 1000
isAreCoprime(15, 28); // Output: true
isAreCoprime(8, 12); // Output: false

// You can get the number of prime numbers in a specified range.
changeMaxInt(20); // Set the maximum value to 20
getPrimesCount(); // Range: 1～20, Output: 8
getPrimesCount(6); // Range: 6～20, Output: 5
getPrimesCount(1, 10); // Range: 1～10, Output: 4

// You can get the correct index of prime numbers in a given range.
changeMaxInt(25); // Set the maximum value to 25
getPrimesIndex(3); // Range: 1～25, Output: 2
getPrimesIndex(17, 10); // Range: 10～25, Output: 3
getPrimesIndex(2, 1, 10); // Range: 1～10, Output: 1

// You can get the sum of prime numbers within a specified range.
changeMaxInt(30); // Set the maximum value to 30
getPrimesSum(); // Range: 1～30, Output: 129
getPrimesSum(25); // Range: 25～30, Output: 29
getPrimesSum(5, 30); // Range: 5～30, Output: 124

// You can get the average of prime numbers within a specified range.
changeMaxInt(30); // Set the maximum value to 30
getPrimesAverage(); // Range: 1～30, Rounded to third decimal places, Output: 12.9
getPrimesAverage(25); // Range: 25～30, Rounded to third decimal places, Output: 29
getPrimesAverage(5, 30); // Range: 5～30, Rounded to third decimal places, Output: 15.5
getPrimesAverage(1, 5, 9); // Range: 1～5, Rounded to the ninth decimal place, Output: 3.333333333
getPrimesAverage(5, 12, 9); // Range: 5～12, Rounded to the ninth decimal place, Output: 7.666666667
getPrimesAverage(5, 12, 0); // Range: 5～12, Rounded to the first decimal place, Output: 8

// You can get the number of prime numbers in a specified range.
changeMaxInt(100); // Set the maximum value to 100
getPrimesMedian(); // Range: 1～100, Output: 41
getPrimesMedian(25); // Range: 25～100, Output: 60
getPrimesMedian(5, 34); // Range: 5～34, Output: 17
getPrimesMedian(5, 50); // Range: 5～50, Output: 23

// You can get twin prime numbers within a specified range.
changeMaxInt(20); // Set the maximum value to 20
getPrimesTwins(); // Range: 1～20, Output: [[3, 5],[5, 7],[11, 13],[17, 19]]
getPrimesTwins(6); // Range: 6～20, Output: [[11, 13],[17, 19]]
getPrimesTwins(1, 10); // Range: 1～10, Output: [[3, 5],[5, 7]]
getPrimesTwins(3, 4); // Range: 3～4, Output: []

// You can get the prime factorization result of the specified number using a formula.
getFactorsFormula(24); // Output: "2^3*3"
getFactorsFormula(30); // Output: "2*3*5"
getFactorsFormula(7); // Output: "7"
```

## License

Copyright (c) 2023, [s-hama](https://github.com/s-hama).
Released under the [MIT License](LICENSE).

---
