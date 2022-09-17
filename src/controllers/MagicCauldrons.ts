import {NextFunction, Request, Response} from 'express';

type Part1 = {
  flow_rate: number;
  time: number;
  row_number: number;
  col_number: number;
};

type Part2 = {
  flow_rate: number;
  amount_of_soup: number;
  row_number: number;
  col_number: number;
};

type Item = {
  part1: Part1;
  part2: Part2;
  part3: Part1;
  part4: Part2;
};

type Output = {
  part1: number;
  part2: number;
  part3: number;
  part4: number;
};

const partOne = (input: Part1): number => {
  const {flow_rate, time, row_number, col_number} = input;
  const totalSoup = flow_rate * time;
  const numOfBowlsAbove = row_number * ((1 + row_number) / 2);
  const soupAtMyLevel = totalSoup - numOfBowlsAbove * 100;

  if (soupAtMyLevel <= 0) {
    return 0;
  }

  const soupFlow = soupAtMyLevel / (row_number + 1);
  return getCurrentSoupLevel(soupFlow, row_number, col_number);
};

const getCurrentSoupLevel = (
  soupFlow: number,
  row: number,
  col: number
): number => {
  if (col === 0 || col === row + 1) {
    return soupFlow;
  }
  return soupFlow * 2;
};

export default class MagicCauldronsController {
  public index(req: Request, res: Response, next: NextFunction) {
    const input: Item[] = req.body as Item[];
    const output: Output[] = input.map(parts => {
      return {
        part1: partOne(parts.part1),
        part2: 0,
        part3: 0,
        part4: 0,
      };
    });
    res.json(output);
  }
}
