const { msgs } = require("./msgs.js");

// Generate a list of prime numbers using the Sieve of Eratosthenes.
let maxInt = 8388607;
let primes = null;
const generatePrimes = () => {
  // Generate a list of prime numbers in the target range.
  primes = new Array(maxInt + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= maxInt; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= maxInt; j += i) {
        primes[j] = false;
      }
    }
  }
};
generatePrimes();

// Re-generate the list of primes in the target range by re-setting the maximum value.
const changeMaxInt = (newMaxInt) => {
  if (newMaxInt < 1) throw new Error(msgs.err1);
  maxInt = newMaxInt;
  generatePrimes();
};

// Determine prime numbers.
const isPrime = (num) => {
  if (num < 2) return false;
  if (num > maxInt)
    throw new Error(msgs.err2.replace('{0}', maxInt));
  return primes[num];
};

// Get prime numbers in a specified range.
const getPrimes = (start = 1, end = maxInt) => {
  if (start < 1) throw new Error(msgs.err3);
  if (end > maxInt)
    throw new Error(msgs.err4.replace('{0}', maxInt));

  const primesInRange = [];
  for (let i = start; i <= end; i++) {
    if (primes[i]) primesInRange.push(i);
  }
  return primesInRange;
};

// Factorize a number into prime factors.
const getFactors = (num) => {
  if (num < 2 || num > maxInt)
    throw new Error(msgs.err2.replace('{0}', maxInt));

  const factors = [];
  let divisor = 2;
  while (num > 1 && divisor <= num) {
    if (primes[divisor] && num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};

// Export module.
module.exports = {
  changeMaxInt,
  isPrime,
  getPrimes,
  getFactors,
};
