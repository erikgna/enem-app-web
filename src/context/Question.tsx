import { useState, createContext, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { addQuestion, getOneRandomQuestion } from '../api';
import { IFilters } from '../interface/Filter';
import { IAddQuestion, IQuestion, ISessionQuestion } from '../interface/Question';

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
    saveResult: (question: IAddQuestion) => Promise<void>;
}

export const QuestionContext = createContext<IQuestionContext>(null!)

export const QuestionContextCmpnt = ({ children }: QuestionContextProps) => {
    const [question, setQuestion] = useState<IQuestion | null>(null)
    const [filters, setFilters] = useState<IFilters>(JSON.parse(localStorage.getItem('filters') ?? JSON.stringify({ years: [], areas: [] })))

    const navigate = useNavigate()

    const getRandomQuestion = async () => {
        try {
            const { data } = await getOneRandomQuestion(filters)
            console.log(data)
            setQuestion(question)

            navigate('/question/' + data.url)
        } catch (error) {
            console.error(error)
        }
    }

    const saveResult = async (body: IAddQuestion) => {
        const { status } = await addQuestion(body)
    }

    const initState: IQuestionContext = {
        getRandomQuestion,
        saveResult,

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