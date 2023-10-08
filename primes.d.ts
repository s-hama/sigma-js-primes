declare module "@sigma-js/primes" {
  type GetMsg = (key: string, repArr?: (number | string)[]) => string;
  type GetMinNum = () => number;
  type GetMaxNum = () => number;
  type Init = (config: {
    sieveType?: "eratosthenes" | "atkin";
    minNum?: number;
    maxNum?: number;
  }) => void;
  type IsPrime = (num: number) => boolean;
  type IsCoprime = (a: number, b: number) => boolean;
  type GetPrimes = (start?: number, end?: number) => number[];
  type GetPrimesAverage = (start?: number, end?: number, places?: number) => number;
  type GetPrimesCount = (start?: number, end?: number) => number;
  type GetPrimesIndex = (start?: number, end?: number) => number;
  type GetPrimesMedian = (start?: number, end?: number) => number;
  type GetPrimesSum = (start?: number, end?: number) => number;
  type GetPrimesTwins = (start?: number, end?: number) => [number, number][];
  type GetFactors = (num: number) => number[];
  type GetFactorsFormula = (num: number) => string;
  type GetMultInverse = (a: number, m: number) => number;
  type GetRandomPrime = (start?: number, end?: number) => number;

  export const getMsg: GetMsg;
  export const getMinNum: GetMinNum;
  export const getMaxNum: GetMaxNum;
  export const init: Init;
  export const isPrime: IsPrime;
  export const isCoprime: IsCoprime;
  export const getPrimes: GetPrimes;
  export const getPrimesAverage: GetPrimesAverage;
  export const getPrimesCount: GetPrimesCount;
  export const getPrimesIndex: GetPrimesIndex;
  export const getPrimesMedian: GetPrimesMedian;
  export const getPrimesSum: GetPrimesSum;
  export const getPrimesTwins: GetPrimesTwins;
  export const getFactors: GetFactors;
  export const getFactorsFormula: GetFactorsFormula;
  export const getMultInverse: GetMultInverse;
  export const getRandomPrime: GetRandomPrime;
}
