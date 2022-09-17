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

function gcd(x: number, y: number) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export default class StigController {
  public warmUp(req: Request, res: Response, next: NextFunction) {
    res.json({message: 'TypeScript + Express Server'});
  }

  public full(req: Request, res: Response, next: NextFunction) {
    res.json({message: 'TypeScript + Express Server'});
  }
}
