export interface IQuestion {
  id: string;
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
  rightanswer?: string;
}

export interface ISessionQuestion {
  url: string;
}

export interface IAddQuestion {
  id: string;
  correct: boolean;
}

export interface IHistoryQuestion {
  question: {
    url: string;
    name: string;
    rightanswer: string;
  };
  correct: boolean;
}
