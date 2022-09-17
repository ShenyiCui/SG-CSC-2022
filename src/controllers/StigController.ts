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
      if (i < currentQuestion.lower || i > currentQuestion.higher) {
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
    // console.log('range', range);
    // console.log('prefix', prefixSum);
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

const solve = (input: Input) => {
  const {questions, maxRating} = input;

  const ans = {
    p: 0,
    q: maxRating,
  };

  for (let k = 1; k <= maxRating; k++) {
    let arr = new Array<number>(maxRating + 5).fill(0);
    questions.forEach(question => {
      if (!(question.lower <= k && k <= question.higher)) {
        arr[question.lower] += 1;
        arr[question.higher + 1] -= 1;
      } else {
        arr[1] += 1;
        arr[question.lower] -= 1;
        arr[question.higher + 1] += 1;
      }
    });

    for (let i = 1; i <= maxRating; i++) {
      arr[i] += arr[i - 1];
      if (arr[i] === 0) {
        if (i == k) {
          ans.p += 1;
        }
        break;
      }
    }
  }

  const g = gcdTwoNumbers(ans.p, ans.q);
  ans.p /= g;
  ans.q /= g;

  return ans;
};

export default class StigController {
  public warmUp(req: Request, res: Response, next: NextFunction) {
    const input: Input[] = req.body as Input[];
    const output: Output[] = input.map(currentInput =>
      // getPandQWarmUp(currentInput)
      solve(currentInput)
    );

    res.json(output);
  }

  public full(req: Request, res: Response, next: NextFunction) {
    res.json({message: 'TypeScript + Express Server'});
  }
}
