declare module "@sigma-js/primes" {
  type ChangeMaxInt = (num: number) => void;
  type IsPrime = (num: number) => boolean;
  type GetPrimes = (start?: number, end?: number) => number[];
  type GetFactors = (num: number) => number[];
  type Msgs = {[key: string]: string};

  export const changeMaxInt: ChangeMaxInt;
  export const isPrime: IsPrime;
  export const getPrimes: GetPrimes;
  export const getFactors: GetFactors;
  export const msgs: Msgs;
}
