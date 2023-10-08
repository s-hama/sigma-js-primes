# ＠sigma-js/primes [![NPM version](https://img.shields.io/npm/v/@sigma-js/primes.svg?style=flat)](https://www.npmjs.com/package/@sigma-js/primes) [![NPM license](https://img.shields.io/github/license/s-hama/sigma-js-primes.svg)](https://github.com/s-hama/sigma-js-primes/blob/master/LICENSE) [![NPM monthly downloads](https://img.shields.io/npm/dm/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) [![NPM total downloads](https://img.shields.io/npm/dt/@sigma-js/primes.svg?style=flat)](https://npmjs.org/package/@sigma-js/primes) 


`@sigma-js/primes` is a javascript library that enables fast detection of prime numbers and prime number arithmetic with the following characteristics.
- The default setting uses the Sieve of Eratosthenes to generate a list of prime numbers ranging from 1 to 8388607.
- The generated prime number list is used for prime number detection and prime number arithmetic, allowing for high-speed processing.
- However, if the target prime number is larger than the default setting, the processing time for generating prime numbers may become longer.
In this case, the range of prime numbers to be generated can be narrowed down or an appropriate algorithm (Eratosthenes sieve or Atkin sieve) can be set according to the range of prime numbers to speed up the process of prime number generation even for large numbers.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i @sigma-js/primes
```

## Usage

### JavaScript require

```js
const { isPrime, isCoprime, getPrimes … } = require("@sigma-js/primes");
```

### TypeScript import

```js
import { isPrime, isCoprime, getPrimes … } from "@sigma-js/primes";
```

### Call example: init

```js
// You can default settings can be changed
init({ sieveType: "atkin" }); // default: { sieveType: "eratosthenes" } -> after setting: { sieveType: "atkin" }
init({ minNum: 1234567 }); // default: { minNum: 1 } -> after setting: { minNum: 1234567 }
init({ maxNum: 8901234 }); // default: { maxNum: 8388607 } -> after setting: { maxNum: 8901234 }
init({ sieveType: "atkin", minNum: 1234567, maxNum: 8901234 }); // set all at once
```

### Call example: isPrime

```js
// You can get the result if the specified number is prime.
isPrime(3); // Output: true
isPrime(8); // Output: false
isPrime(8388607); // Output: false
```

### Call example: isCoprime

```js
// You can get the result if the given numbers are coprime.
isCoprime(15, 28); // Output: true
isCoprime(8, 12); // Output: false
```

### Call example: getPrimes

```js
// You can specify a range and get the prime numbers in that range.
init({ minNum: 100, maxNum: 150 }); // Set maximum value to 100 and maximum value to 150
getPrimes(); // Range: 100～150, Output: [101, 103, 107, 109, 113, 127, 131, 137, 139, 149]
getPrimes(125); // Range: 125～150, Output: [127, 131, 137, 139, 149]
getPrimes(110, 140); // Range: 110～140, Output: [113, 127, 131, 137, 139]
```

### Call example: getPrimesAverage

```js
// You can get the average of prime numbers within a specified range.
init({ maxNum: 30 }); // Set the maximum value to 30
getPrimesAverage(); // Range: 1～30, Rounded to third decimal places, Output: 12.9
getPrimesAverage(25); // Range: 25～30, Rounded to third decimal places, Output: 29
getPrimesAverage(5, 30); // Range: 5～30, Rounded to third decimal places, Output: 15.5
getPrimesAverage(1, 5, 9); // Range: 1～5, Rounded to the ninth decimal place, Output: 3.333333333
getPrimesAverage(5, 12, 9); // Range: 5～12, Rounded to the ninth decimal place, Output: 7.666666667
getPrimesAverage(5, 12, 0); // Range: 5～12, Rounded to the first decimal place, Output: 8
```

### Call example: getPrimesCount

```js
// You can get the number of prime numbers in a specified range.
init({ maxNum: 20 }); // Set the maximum value to 20
getPrimesCount(); // Range: 1～20, Output: 8
getPrimesCount(6); // Range: 6～20, Output: 5
getPrimesCount(1, 10); // Range: 1～10, Output: 4
```

### Call example: getPrimesIndex

```js
// You can get the correct index of prime numbers in a given range.
init({ maxNum: 25 }); // Set the maximum value to 25
getPrimesIndex(3); // Range: 1～25, Output: 2
getPrimesIndex(17, 10); // Range: 10～25, Output: 3
getPrimesIndex(2, 1, 10); // Range: 1～10, Output: 1
```

### Call example: getPrimesMedian

```js
// You can get the number of prime numbers in a specified range.
init({ maxNum: 100 }); // Set the maximum value to 100
getPrimesMedian(); // Range: 1～100, Output: 41
getPrimesMedian(25); // Range: 25～100, Output: 60
getPrimesMedian(5, 34); // Range: 5～34, Output: 17
getPrimesMedian(5, 50); // Range: 5～50, Output: 23
```

### Call example: getPrimesSum

```js
// You can get the sum of prime numbers within a specified range.
init({ maxNum: 30 }); // Set the maximum value to 30
getPrimesSum(); // Range: 1～30, Output: 129
getPrimesSum(25); // Range: 25～30, Output: 29
getPrimesSum(5, 30); // Range: 5～30, Output: 124
```

### Call example: getPrimesTwins

```js
// You can get twin prime numbers within a specified range.
init({ maxNum: 20 }); // Set the maximum value to 20
getPrimesTwins(); // Range: 1～20, Output: [[3, 5],[5, 7],[11, 13],[17, 19]]
getPrimesTwins(6); // Range: 6～20, Output: [[11, 13],[17, 19]]
getPrimesTwins(1, 10); // Range: 1～10, Output: [[3, 5],[5, 7]]
getPrimesTwins(3, 4); // Range: 3～4, Output: []
```

### Call example: getFactors

```js
// You can obtain the prime factorization result of the specified number.
getFactors(24); // Output: [2, 2, 2, 3]
getFactors(555); // Output: [3, 5, 37]
```

### Call example: getFactorsFormula

```js
// You can get the prime factorization result of the specified number using a formula.
getFactorsFormula(24); // Output: "2^3*3"
getFactorsFormula(30); // Output: "2*3*5"
getFactorsFormula(7); // Output: "7"
```

### Call example: getMultInverse

```js
// You can get the multiplicative inverse of a given number.
getMultInverse(3, 11); // Output: 4 (Get x that becomes 3*x≡1(mod 11))
getMultInverse(7, 13); // Output: 2 (Get x that becomes 7*x≡1(mod 13))
```

### Call example: getRandomPrime

```js
// You can get prime numbers randomly within a specified range.
init({ maxNum: 100 }); // Set the maximum value to 100
getRandomPrime(); // Range: 1～100, Output: 7
getRandomPrime(10); // Range: 10～100, Output: 11
getRandomPrime(4, 12); // Range: 4～12, Output: 5
```

## License

Copyright (c) 2023, [s-hama](https://github.com/s-hama).
Released under the [MIT License](LICENSE).

---
