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
    feedback: string;
    isLoading: boolean;

    setFeedback: React.Dispatch<React.SetStateAction<string>>
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>

    getRandomQuestion: (noFilter: boolean) => Promise<void>;
    saveResult: (question: IAddQuestion) => Promise<void>;
}

export const QuestionContext = createContext<IQuestionContext>(null!)

export const QuestionContextCmpnt = ({ children }: QuestionContextProps) => {
    const [question, setQuestion] = useState<IQuestion | null>(null)
    const [filters, setFilters] = useState<IFilters>(JSON.parse(localStorage.getItem('filters') ?? JSON.stringify({ years: [], areas: [] })))
    const [feedback, setFeedback] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const getRandomQuestion = async (noFilter: boolean) => {
        setIsLoading(true)
        try {
            const { data } = await getOneRandomQuestion(noFilter ? { years: [], areas: [] } : filters)

            setQuestion(question)

            navigate(`/question/random/${noFilter}/` + data.url)
        } catch (error) {
            setFeedback('Ocorreu um erro ao requisitar a questão, por favor, tente novamente.')
        }
        setIsLoading(false)
    }

    const saveResult = async (body: IAddQuestion) => {
        setIsLoading(true)
        try {
            await addQuestion(body)
        } catch (error) {
            setFeedback('Ocorreu um erro ao salvar a questão no seu histórico.')
        }
        setIsLoading(false)
    }

    const initState: IQuestionContext = {
        getRandomQuestion,
        saveResult,
        feedback,
        isLoading,

        setFeedback,
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