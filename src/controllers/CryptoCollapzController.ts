import {NextFunction, Request, Response} from 'express';

export default class CryptoCollapzController {
  public async index(req: Request, res: Response) {
    const input: number[][] = req.body as number[][];
    console.log(input);
    const memory = new Map<number, number>([
      [1, 4],
      [2, 4],
      [4, 4],
    ]);

    const solveForMax = (num: number): number => {
      if (memory.has(num)) {
        return memory.get(num)!;
      }

      let resp = 0;
      const isEven = num % 2 === 0;
      if (isEven) {
        const newResult = num / 2;
        resp = Math.max(solveForMax(newResult), num);
      } else {
        const newResult = num * 3 + 1;
        resp = Math.max(solveForMax(newResult), num);
      }

      memory.set(num, resp);
      return resp;
    };

    const cryptoMax = (testCase: number[]) =>
      testCase.map(val => solveForMax(val));
    const output = input.map(x => cryptoMax(x));

    res.json(output);
  }
}
