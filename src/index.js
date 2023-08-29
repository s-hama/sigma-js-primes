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
  if (newMaxInt < 1) throw new Error("Maximum integer must be greater than 0.");
  maxInt = newMaxInt;
  generatePrimes();
};

// Determine prime numbers.
const isPrime = (num) => {
  if (num < 2) return false;
  if (num > maxInt)
    throw new Error(
      `The value exceeds the maximum of ${maxInt}.Please specify an integer greater than or equal to 2 and less than or equal to ${maxInt}.`
    );
  return primes[num];
};

// Get prime numbers in a specified range.
const getPrimes = (start = 1, end = maxInt) => {
  if (start < 1) throw new Error("Range start must be greater than 0.");
  if (end > maxInt)
    throw new Error(
      `Range end value exceeds maximum value ${maxInt}. Specify an integer between 2 and ${maxInt}.`
    );

  const primesInRange = [];
  for (let i = start; i <= end; i++) {
    if (primes[i]) primesInRange.push(i);
  }
  return primesInRange;
};

// Export module.
module.exports = {
  changeMaxInt,
  isPrime,
  getPrimes,
};
