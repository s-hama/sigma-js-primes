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

// Export module.
module.exports = {
  changeMaxInt,
  isPrime,
};
