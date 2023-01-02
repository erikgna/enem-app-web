export interface IQuestion {
  url: string;
  name: string;
  description: string;
  ask: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  rightAnswer?: string;
}

export interface ISessionQuestion {
  url: string;
}
