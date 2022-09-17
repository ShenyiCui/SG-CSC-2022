import {NextFunction, Request, Response} from 'express';

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
};

export default class StigController {
  public async warmUp(req: Request, res: Response, next: NextFunction) {
    const ans: {p: number; q: number}[] = [];

    req.body.forEach((testCase: any) => {
      const questions: {
        lower: number;
        higher: number;
      }[] = testCase.questions;

      const maxRating: number = testCase.maxRating;

      let p = 0;

      for (let k = 1; k <= maxRating; k++) {
        let arr: number[] = [];
        for (let i = 0; i < maxRating + 5; i++) {
          arr.push(0);
        }

        questions.forEach(({lower, higher}) => {
          if (k < lower || k > higher) {
            ++arr[lower];
            --arr[higher + 1];
          } else {
            ++arr[1];
            --arr[lower];
            ++arr[higher];
          }
        });

        for (let i = 1; i <= maxRating; i++) {
          arr[i] += arr[i - 1];
          if (arr[i] === 0) {
            if (i === k) {
              ++p;
            }
            break;
          }
        }
      }

      const g = gcd(p, maxRating);

      ans.push({
        p: p / g,
        q: maxRating / g,
      });
    });

    res.json(ans);
  }
}
