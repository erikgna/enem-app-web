import { cienciasNaturais2011 } from "../assets/2011";
import { matematica2012 } from "../assets/2012";
import { IQuestion } from "../interface/Question";

export interface IAllQuestions {
  [key: number]: {
    [key: string]: IQuestion[];
  };
}

export const all: IAllQuestions = {
  2011: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2012: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2013: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2014: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2015: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2016: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2017: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2018: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2019: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2020: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
  2022: {
    "Matemática e suas Tecnologias": matematica2012,
    "Ciências Humanas e suas Tecnologias": matematica2012,
    "Ciências Naturais e suas Tecnologias": cienciasNaturais2011,
    "Linguagens, Códigos e suas Tecnologias": matematica2012,
  },
};
