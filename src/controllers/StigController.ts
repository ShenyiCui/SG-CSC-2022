import {NextFunction, Request, Response} from 'express';

type Question = {
  lower: number;
  higher: number;
};

type Input = {
  questions: Question[];
  maxRating: number;
};

type Output = {
  p: number;
  q: number;
};

function gcdTwoNumbers(x: number, y: number) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

const getPandQWarmUp = (currentInput: Input): Output => {
  let q = currentInput.maxRating;
  let p = 0;
  for (let i = 1; i <= currentInput.maxRating; i++) {
    const range = new Array<number>(currentInput.maxRating).fill(0);
    for (let j = 0; j < currentInput.questions.length; j++) {
      const currentQuestion = currentInput.questions[j];
      if (i < currentQuestion.lower || i >= currentQuestion.higher) {
        range[currentQuestion.lower - 1] += 1;
        range[currentQuestion.higher] += -1;
        continue;
      }
      range[currentQuestion.higher] += 1;
      range[0] += 1;
      range[currentQuestion.lower - 1] += -1;
    }
    const prefixSum = [...range];
    for (let j = 1; j < prefixSum.length; j++) {
      prefixSum[j] = prefixSum[j - 1] + prefixSum[j];
    }
    console.log('range', range);
    console.log('prefix', prefixSum);
    for (let j = 0; j < prefixSum.length; j++) {
      if (prefixSum[j] === 0) {
        if (j + 1 === i) {
          p++;
        }
        break;
      }
    }
  }

  const gcd = gcdTwoNumbers(q, p);
  return {
    p: p / gcd,
    q: q / gcd,
  };
};

export default class StigController {
  public warmUp(req: Request, res: Response, next: NextFunction) {
    const input: Input[] = req.body as Input[];
    const output: Output[] = input.map(currentInput =>
      getPandQWarmUp(currentInput)
    );

    res.json(output);
  }

  public full(req: Request, res: Response, next: NextFunction) {
    res.json({message: 'TypeScript + Express Server'});
  }
}
