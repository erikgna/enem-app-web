import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getOne, postReport } from "../api";
import { QuestionContext } from "../context/Question";
import { IQuestion } from "../interface/Question";

export const useQuestion = () => {
    const { question, saveResult, getRandomQuestion } = useContext(QuestionContext)

    const [open, setOpen] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string | undefined>(undefined)

    const url = location.pathname.split('-')

    const nextPage = async () => {
        await getRandomQuestion(url[0].includes('true'));

        window.location.reload()
    }

    const finalAnswer = async (savedQuestion: IQuestion, choose: string | undefined) => {
        if (!choose) {
            setOpen(true)
            return
        }

        const rightAnswer = savedQuestion.rightAnswer?.toLowerCase()
        setAnswer(rightAnswer)

        await saveResult({ id: savedQuestion.id, correct: choose === savedQuestion.rightAnswer })
    }

    let query;
    if (!question) query = useQuery({
        queryKey: ['question'],
        refetchOnWindowFocus: false,
        queryFn: () => getOne(`${url[0].split('/')[4]}-${url[1]}-${url[2]}`)
    })

    useEffect(() => {
        if (url.length === 4) {
            setAnswer(url[3])
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
        query,
        url,

        finalAnswer,
        nextPage,
        sendReport
    }
}