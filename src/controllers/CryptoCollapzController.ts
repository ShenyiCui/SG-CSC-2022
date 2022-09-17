import {NextFunction, Request, Response} from 'express';

export default class CryptoCollapzController {
  public async index(req: Request, res: Response) {
    const input: number[][] = req.body as number[][];

    const solveForMax = (
      num: number,
      max: number,
      visited: Set<number>
    ): number => {
      const returnMax = (val: number): number => {
        return val > max ? val : max;
      };

      if (visited.has(num)) {
        return max;
      }

      visited.add(num);
      const isEven = num % 2 === 0;
      if (isEven) {
        const newResult = num / 2;
        const newMax = returnMax(newResult);
        return solveForMax(newResult, newMax, visited);
      } else {
        const newResult = num * 3 + 1;
        const newMax = returnMax(newResult);
        return solveForMax(newResult, newMax, visited);
      }
    };

    const cryptoMax = (testCase: number[]) =>
      testCase.map(val => solveForMax(val, val, new Set<number>()));
    const output = input.map(x => cryptoMax(x));

    res.json(output);
  }
}
