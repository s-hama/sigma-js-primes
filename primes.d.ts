declare module "@sigma-js/primes" {
  type Config = {
    maxNum?: number;
    minNum?: number;
    sieveType?: "eratosthenes" | "atkin";
  };
  type Init = (config: Config) => void;
  type GetMsg = (key: string, repArr?: (number | string)[]) => string;
  type IsPrime = (num: number) => boolean;
  type GetPrimes = (start?: number, end?: number) => number[];
  type GetFactors = (num: number) => number[];
  type GetRandomPrime = (start?: number, end?: number) => number;
  type IsCoprime = (a: number, b: number) => boolean;
  type GetPrimesCount = (start?: number, end?: number) => number;
  type GetPrimesIndex = (start?: number, end?: number) => number;
  type GetPrimesSum = (start?: number, end?: number) => number;
  type GetPrimesAverage = (start?: number, end?: number, places?: number) => number;
  type GetPrimesMedian = (start?: number, end?: number) => number;
  type GetPrimesTwins = (start?: number, end?: number) => [number, number][];
  type GetFactorsFormula = (num: number) => string;
  type GetMultInverse = (a: number, m: number) => number;

  export const init: Init;
  export const getMsg: GetMsg;
  export const isPrime: IsPrime;
  export const getPrimes: GetPrimes;
  export const getFactors: GetFactors;
  export const getRandomPrime: GetRandomPrime;
  export const isCoprime: IsCoprime;
  export const getPrimesCount: GetPrimesCount;
  export const getPrimesIndex: GetPrimesIndex;
  export const getPrimesSum: GetPrimesSum;
  export const getPrimesAverage: GetPrimesAverage;
  export const getPrimesMedian: GetPrimesMedian;
  export const getPrimesTwins: GetPrimesTwins;
  export const getFactorsFormula: GetFactorsFormula;
  export const getMultInverse: GetMultInverse;
}
