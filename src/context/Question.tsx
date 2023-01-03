import { useState, createContext, ReactNode } from 'react'
import { useNavigate } from 'react-router';
import { addQuestion, getOneRandomQuestion } from '../api';
import { IFilters } from '../interface/Filter';
import { IAddQuestion, IQuestion } from '../interface/Question';

type QuestionContextProps = {
    children: ReactNode;
};

interface IQuestionContext {
    question: IQuestion | null;
    filters: IFilters;

    setFilters: React.Dispatch<React.SetStateAction<IFilters>>

    getRandomQuestion: (noFilter: boolean) => Promise<void>;
    saveResult: (question: IAddQuestion) => Promise<void>;
}

export const QuestionContext = createContext<IQuestionContext>(null!)

export const QuestionContextCmpnt = ({ children }: QuestionContextProps) => {
    const [question, setQuestion] = useState<IQuestion | null>(null)
    const [filters, setFilters] = useState<IFilters>(JSON.parse(localStorage.getItem('filters') ?? JSON.stringify({ years: [], areas: [] })))

    const navigate = useNavigate()

    const getRandomQuestion = async (noFilter: boolean) => {
        try {
            const { data } = await getOneRandomQuestion(noFilter ? { years: [], areas: [] } : filters)

            setQuestion(question)

            navigate(`/question/random/${noFilter}/` + data.url)
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