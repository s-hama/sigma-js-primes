declare module "@sigma-js/primes" {
  type Msgs = {[key: string]: string};
  type GetMsg = (key: string, repArr?: (number | string)[]) => string;

  export const msgs: Msgs;
  export const getMsg: GetMsg;
}