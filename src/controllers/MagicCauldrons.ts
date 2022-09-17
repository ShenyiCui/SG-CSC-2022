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

const roundToTwo = (num: number) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

const partOne = (input: Part1): number => {
  const {flow_rate, time, row_number, col_number} = input;
  const memory = new Map<string, number>();

  const findOverflow = (row: number, col: number): number => {
    if (row == 0 && col == 0) {
      const overflow = flow_rate * time - 100;
      return overflow < 0 ? 0 : overflow / 2;
    }
    if (col < 0 || col > row) {
      return 0;
    }
    if (memory.has([row, col].toString())) {
      return memory.get([row, col].toString())!;
    }

    const currentValue =
      findOverflow(row - 1, col) + findOverflow(row - 1, col - 1);

    if (currentValue > 100) {
      const overflow = (currentValue - 100) / 2;
      memory.set([row, col].toString(), overflow);
      return overflow;
    }

    memory.set([row, col].toString(), 0);
    return 0;
  };

  const solve = (row: number, col: number): number => {
    if (row === 0 && col === 0) {
      const isOverflow = flow_rate * time - 100 > 0;
      return isOverflow ? 100 : flow_rate * time;
    }
    const answer = findOverflow(row - 1, col) + findOverflow(row - 1, col - 1);
    return answer >= 100 ? 100 : answer;
  };

  return solve(row_number, col_number);
};

const partTwo = (input: Part2): number => {
  const {flow_rate, amount_of_soup, row_number, col_number} = input;

  const findOverflow = (
    row: number,
    col: number,
    time: number,
    memory: Map<string, number>
  ): number => {
    if (row == 0 && col == 0) {
      const overflow = flow_rate * time - 100;
      return overflow < 0 ? 0 : overflow / 2;
    }
    if (col < 0 || col > row) {
      return 0;
    }
    if (memory.has([row, col].toString())) {
      return memory.get([row, col].toString())!;
    }

    const currentValue =
      findOverflow(row - 1, col, time, memory) +
      findOverflow(row - 1, col - 1, time, memory);

    if (currentValue > 100) {
      const overflow = (currentValue - 100) / 2;
      memory.set([row, col].toString(), overflow);
      return overflow;
    }

    memory.set([row, col].toString(), 0);
    return 0;
  };

  const solve = (row: number, col: number, time: number): number => {
    const memory = new Map<string, number>();
    if (row === 0 && col === 0) {
      const isOverflow = flow_rate * time - 100 > 0;
      return isOverflow ? 100 : flow_rate * time;
    }
    const answer =
      findOverflow(row - 1, col, time, memory) +
      findOverflow(row - 1, col - 1, time, memory);
    return answer >= 100 ? 100 : answer;
  };

  let left = 0;
  let right = 998;
  let mid = (left + right) / 2;
  let counter = 0;
  while (left <= right) {
    mid = (left + right) / 2;
    const soupLevel = solve(row_number, col_number, mid);
    if (soupLevel > amount_of_soup) {
      right = mid;
    }

    if (soupLevel < amount_of_soup) {
      left = mid;
    }

    if (soupLevel === amount_of_soup || counter >= 100) {
      return mid;
    }
    counter++;
  }
  return mid;
};

const partThree = (input: Part1): number => {
  const {flow_rate, time, row_number, col_number} = input;
  const memory = new Map<string, number>();

  const findOverflow = (row: number, col: number): number => {
    const isEven = col % 2 === 0;
    const capacity = isEven ? 150 : 100;
    if (row == 0 && col == 0) {
      const overflow = flow_rate * time - capacity;
      return overflow < 0 ? 0 : overflow / 2;
    }
    if (col < 0 || col > row) {
      return 0;
    }
    if (memory.has([row, col].toString())) {
      return memory.get([row, col].toString())!;
    }

    const currentValue =
      findOverflow(row - 1, col) + findOverflow(row - 1, col - 1);

    if (currentValue > capacity) {
      const overflow = (currentValue - capacity) / 2;
      memory.set([row, col].toString(), overflow);
      return overflow;
    }

    memory.set([row, col].toString(), 0);
    return 0;
  };

  const solve = (row: number, col: number): number => {
    const isEven = col % 2 === 0;
    const capacity = isEven ? 150 : 100;

    if (row === 0 && col === 0) {
      const isOverflow = flow_rate * time - capacity > 0;
      return isOverflow ? capacity : flow_rate * time;
    }
    const answer = findOverflow(row - 1, col) + findOverflow(row - 1, col - 1);
    return answer >= capacity ? capacity : answer;
  };

  return solve(row_number, col_number);
};

const partFour = (input: Part2): number => {
  const {flow_rate, amount_of_soup, row_number, col_number} = input;

  const findOverflow = (
    row: number,
    col: number,
    time: number,
    memory: Map<string, number>
  ): number => {
    const isEven = col % 2 === 0;
    const capacity = isEven ? 150 : 100;
    if (row == 0 && col == 0) {
      const overflow = flow_rate * time - capacity;
      return overflow < 0 ? 0 : overflow / 2;
    }
    if (col < 0 || col > row) {
      return 0;
    }
    if (memory.has([row, col].toString())) {
      return memory.get([row, col].toString())!;
    }

    const currentValue =
      findOverflow(row - 1, col, time, memory) +
      findOverflow(row - 1, col - 1, time, memory);

    if (currentValue > capacity) {
      const overflow = (currentValue - capacity) / 2;
      memory.set([row, col].toString(), overflow);
      return overflow;
    }

    memory.set([row, col].toString(), 0);
    return 0;
  };

  const solve = (row: number, col: number, time: number): number => {
    const isEven = col % 2 === 0;
    const capacity = isEven ? 150 : 100;
    const memory = new Map<string, number>();

    if (row === 0 && col === 0) {
      const isOverflow = flow_rate * time - capacity > 0;
      return isOverflow ? capacity : flow_rate * time;
    }
    const answer =
      findOverflow(row - 1, col, time, memory) +
      findOverflow(row - 1, col - 1, time, memory);
    return answer >= capacity ? capacity : answer;
  };

  let left = 0;
  let right = 998;
  let mid = (left + right) / 2;
  let counter = 0;
  while (left <= right) {
    mid = (left + right) / 2;
    const soupLevel = solve(row_number, col_number, mid);
    if (soupLevel > amount_of_soup) {
      right = mid;
    }

    if (soupLevel < amount_of_soup) {
      left = mid;
    }

    if (soupLevel === amount_of_soup || counter >= 100) {
      return mid;
    }
    counter++;
  }
  return mid;
};

export default class MagicCauldronsController {
  public index(req: Request, res: Response, next: NextFunction) {
    const input: Item[] = req.body as Item[];
    const output: Output[] = input.map(parts => {
      return {
        part1: roundToTwo(partOne(parts.part1)),
        part2: Math.round(partTwo(parts.part2)),
        part3: roundToTwo(partThree(parts.part3)),
        part4: Math.round(partFour(parts.part4)),
      };
    });
    res.json(output);
  }
}
