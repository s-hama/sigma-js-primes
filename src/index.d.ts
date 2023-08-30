declare module "@sigma-js/primes" {
  type ChangeMaxInt = (newMaxInt: number) => void;
  type IsPrime = (num: number) => boolean;
  type GetPrimes = (start?: number, end?: number) => number[];

  export const changeMaxInt: ChangeMaxInt;
  export const isPrime: IsPrime;
  export const getPrimes: GetPrimes;
}
