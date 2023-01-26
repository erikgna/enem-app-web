import { useState, createContext, ReactNode } from 'react'
import { useNavigate } from 'react-router';
import { addQuestion, getOneRandomQuestion } from '../api';
import { IFilters } from '../interface/Filter';
import { IAddQuestion, IQuestion } from '../interface/Question';

type QuestionContextProps = {
    children: ReactNode;
};

interface IQuestionContext {
    filters: IFilters;
    feedback: string;
    isLoading: boolean;

    setFeedback: React.Dispatch<React.SetStateAction<string>>
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>

    getRandomQuestion: (noFilter: boolean) => Promise<IQuestion | void>;
    saveResult: (question: IAddQuestion) => Promise<void>;
}

export const QuestionContext = createContext<IQuestionContext>(null!)

export const QuestionContextCmpnt = ({ children }: QuestionContextProps) => {
    const [filters, setFilters] = useState<IFilters>(JSON.parse(localStorage.getItem('filters') ?? JSON.stringify({ years: [], areas: [] })))
    const [feedback, setFeedback] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const getRandomQuestion = async (noFilter: boolean) => {
        setIsLoading(true)
        setFeedback("")
        try {
            const { data } = await getOneRandomQuestion(noFilter ? { years: [], areas: [] } : filters)

            sessionStorage.removeItem("question")
            sessionStorage.setItem("question", JSON.stringify(data))

            navigate(`/question/random/${noFilter}/` + data.url)
            setIsLoading(false)

            return data
        } catch (error) {
            setFeedback('Ocorreu um erro ao requisitar a questão, por favor, tente novamente.')
        }

        setIsLoading(false)
    }

    const saveResult = async (body: IAddQuestion) => {
        setFeedback("")

        try {
            await addQuestion(body)
        } catch (error) {
            setFeedback('Ocorreu um erro ao salvar a questão no seu histórico.')
        }
    }

    const initState: IQuestionContext = {
        getRandomQuestion,
        saveResult,
        feedback,
        isLoading,

        setFeedback,
        setFilters,

        filters
    }

    return (
        <QuestionContext.Provider value={initState} >
            {children}
        </QuestionContext.Provider>
    )
}