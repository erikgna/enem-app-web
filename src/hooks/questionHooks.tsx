import { useContext, useEffect, useState } from "react";
import { getOne, postReport } from "../api";
import { QuestionContext } from "../context/Question";
import { IQuestion } from "../interface/Question";

export const useQuestion = () => {
    const { saveResult, getRandomQuestion, getOneQuestion, isLoading } = useContext(QuestionContext)

    const [open, setOpen] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string | undefined>(undefined)
    const [question, setQuestion] = useState<IQuestion | null | undefined>(undefined)

    const url = location.pathname.split('-')

    const nextPage = async () => {
        const data = await getRandomQuestion(url[0].includes('true'));

        setQuestion(data)
        setAnswer(undefined)
        setOpen(false)
    }

    const finalAnswer = async (savedQuestion: IQuestion, choose: string | undefined) => {
        if (!choose) {
            setOpen(true)
            return
        }

        const rightAnswer = savedQuestion.rightanswer?.toLowerCase()
        setAnswer(rightAnswer)

        if (!document.cookie.includes("unsolved-token")) {
            return
        }

        saveResult({ id: savedQuestion.id, correct: choose === savedQuestion.rightanswer })
    }

    const getQuestion = async (url: string) => {
        const data = await getOneQuestion(url)
        setQuestion(data)
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
        getQuestion,
        nextPage,
        sendReport
    }
}