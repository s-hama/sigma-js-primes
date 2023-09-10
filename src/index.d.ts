declare module "@sigma-js/primes" {
  type ChangeMaxInt = (num: number) => void;
  type IsPrime = (num: number) => boolean;
  type GetPrimes = (start?: number, end?: number) => number[];
  type GetFactors = (num: number) => number[];
  type GetRandomPrime = (start?: number, end?: number) => number;
  type IsAreCoprime = (a: number, b: number) => boolean;
  type GetPrimesCount = (start?: number, end?: number) => number;

  export const changeMaxInt: ChangeMaxInt;
  export const isPrime: IsPrime;
  export const getPrimes: GetPrimes;
  export const getFactors: GetFactors;
  export const getRandomPrime: GetRandomPrime;
  export const isAreCoprime: IsAreCoprime;
  export const getPrimesCount: GetPrimesCount;
}
