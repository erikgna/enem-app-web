import { useContext, useEffect, useState } from "react";
import { postReport } from "../api";
import { QuestionContext } from "../context/Question";
import { IQuestion } from "../interface/Question";

export const useQuestion = () => {
    const { saveResult, getRandomQuestion, isLoading } = useContext(QuestionContext)

    const [open, setOpen] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string | undefined>(undefined)
    const [question, setQuestion] = useState<IQuestion | null>(null)

    const url = location.pathname.split('-')

    const nextPage = async () => {
        const data = await getRandomQuestion(url[0].includes('true'));

        setQuestion(data as IQuestion)
        setAnswer(undefined)
        setOpen(false)
    }

    const finalAnswer = async (savedQuestion: IQuestion, choose: string | undefined) => {
        if (!choose) {
            setOpen(true)
            return
        }

        const rightAnswer = savedQuestion.rightAnswer?.toLowerCase()
        setAnswer(rightAnswer)

        if (!document.cookie.includes("unsolved-token")) {
            return
        }

        saveResult({ id: savedQuestion.id, correct: choose === savedQuestion.rightAnswer })
    }

    useEffect(() => {
        if (url.length === 4) {
            setAnswer(url[3])
        }
        const questionFromStorage = sessionStorage.getItem("question")
        if (questionFromStorage) {
            setQuestion(JSON.parse(questionFromStorage))
        }

    }, [])

    const sendReport = async (id: string, msg: string) => {
        try {
            await postReport({ id, msg })
        } catch (_) { }
    }

    return {
        question,

        open,
        answer,
        url,
        isLoading,

        finalAnswer,
        nextPage,
        sendReport
    }
}