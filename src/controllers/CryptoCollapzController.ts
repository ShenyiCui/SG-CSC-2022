import {NextFunction, Request, Response} from 'express';

export default class CryptoCollapzController {
  public async index(req: Request, res: Response) {
    const input: number[][] = req.body as number[][];
    const memory = new Map<number, number>([
      [1, 4],
      [2, 4],
      [4, 4],
    ]);

    const solveForMax = (
      num: number,
      max: number,
      visited: Set<number>
    ): number => {
      if (memory.has(num)) {
        return memory.get(num)!;
      }

      if (visited.has(num)) {
        visited.forEach(function (val) {
          memory.set(val, max);
        });
        return max;
      }

      visited.add(num);

      const isEven = num % 2 === 0;
      if (isEven) {
        const newResult = num / 2;
        const newMax = Math.max(newResult, max);
        return Math.max(solveForMax(newResult, newMax, visited), max);
      } else {
        const newResult = num * 3 + 1;
        const newMax = Math.max(newResult, max);
        return Math.max(solveForMax(newResult, newMax, visited), max);
      }
    };

    const cryptoMax = (testCase: number[]) =>
      testCase.map(val => solveForMax(val, val, new Set<number>()));
    const output = input.map(x => cryptoMax(x));

    res.json(output);
  }
}
