import { useState, createContext, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { getOneRandomQuestion } from '../api';
import { IFilters } from '../interface/Filter';
import { IQuestion, ISessionQuestion } from '../interface/Question';

import { all } from '../utils/Files';

const areas = ['naturais', 'matematica', 'humanas', 'linguagens'];
const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022]

type QuestionContextProps = {
    children: ReactNode;
};

interface IQuestionContext {
    question: IQuestion | null;
    filters: IFilters;

    setFilters: React.Dispatch<React.SetStateAction<IFilters>>

    getRandomQuestion: () => Promise<void>;
    navigateToAnsweredQuestion: (historyQuestion: IQuestion) => void;
    saveResult: (wrong: boolean) => void;
}

export const QuestionContext = createContext<IQuestionContext>(null!)

export const QuestionContextCmpnt = ({ children }: QuestionContextProps) => {
    const [question, setQuestion] = useState<IQuestion | null>(null)
    const [filters, setFilters] = useState<IFilters>({ years: [], areas: [] })

    const navigate = useNavigate()

    const getRandomQuestion = async () => {
        try {
            const { data } = await getOneRandomQuestion(filters)

            navigate('/question/random-' + data.url)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    const saveResult = (wrong: boolean) => {
        if (wrong) {
            const wrong = JSON.parse(sessionStorage.getItem('wrong') || '[]')
            wrong.push(question)
            sessionStorage.setItem('wrong', JSON.stringify(wrong))
            return
        }

        const right = JSON.parse(sessionStorage.getItem('right') || '[]')
        right.push(question)
        sessionStorage.setItem('right', JSON.stringify(right))
    }

    const navigateToAnsweredQuestion = (historyQuestion: IQuestion) => {
        setQuestion(historyQuestion)

        navigate(`/question/${historyQuestion.url}/${historyQuestion.rightAnswer}`)
    }

    const initState: IQuestionContext = {
        getRandomQuestion,
        saveResult,
        navigateToAnsweredQuestion,

        setFilters,

        filters,
        question
    }

    return (
        <QuestionContext.Provider value={initState} >
            {children}
        </QuestionContext.Provider>
    )
}