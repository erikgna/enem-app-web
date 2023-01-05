import { useState } from 'react'
import { IQuestion } from '../../interface/Question';

import styles from './Question.module.scss'
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../components/QueryError/QueryError';
import { useQuestion } from '../../hooks/questionHooks';

export const Question = () => {
    const questionHook = useQuestion()

    const [choose, setChoose] = useState<string | undefined>(undefined)

    const questionTemp = questionHook.query ? questionHook.query.data?.data as IQuestion : questionHook.question

    if (!questionHook.query || questionHook.query.isError) {
        return <QueryError
            title='Erro'
            description='Ocorreu um erro ao requisitar a questão, por favor, tente novamente.'
            func={questionHook.nextPage}
            linkMsg='Tentar novamente'
        />
    }

    if (questionHook.query.isLoading) {
        return <QueryLoading />
    }

    return (
        <div className='flex flex-col px-2 dark:bg-gray-900 dark:text-white pt-8 min-h-screen pb-8'>
            <h2 className='text-2xl font-bold'>{questionTemp?.name}</h2>
            <div className={`text-base mt-4 mb-8 ${styles.Image}`} dangerouslySetInnerHTML={{ __html: questionTemp?.description! }} />

            <p className='text-base mb-8'>{questionTemp?.ask}</p>

            <ul className='flex flex-col'>
                {['a', 'b', 'c', 'd', 'e'].map((item) => {
                    type IQuestionKey = keyof typeof questionTemp

                    if (questionHook.answer === undefined) {
                        return <li key={item} onClick={() => setChoose(item)} className='mb-4'>
                            <input type="radio" id={item} className="hidden peer" />
                            <label className={`${choose === item ? 'dark:text-blue-500 dark:border-blue-600 text-blue-600' : 'dark:hover:text-gray-300 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:border-gray-700'} dark:bg-gray-800 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer`}>
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">{item.toUpperCase()}</div>
                                    <div className="w-full">{questionTemp?.answers[item as IQuestionKey]}</div>
                                </div>
                            </label>
                        </li>
                    }

                    return <li key={item} onClick={() => setChoose(item)} className='mb-4'>
                        <input type="radio" id={item} className="hidden peer" />
                        <label className={`${questionHook.answer === item ? 'dark:text-green-500 dark:border-green-600 text-green-600' : 'dark:text-red-500 dark:border-red-600 text-red-600'} dark:bg-gray-800 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer`}>
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{item.toUpperCase()}</div>
                                <div className="w-full">{questionTemp?.answers[item as IQuestionKey]}</div>
                            </div>
                        </label>
                    </li>
                })}
            </ul>

            {questionHook.open && <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <span className="font-medium">Por favor, selecione ao menos uma opção!</span>
            </div>}

            {questionHook.url.length < 4 &&
                <div className='flex align-center mt-4 pb-8'>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => questionHook.finalAnswer(questionTemp!, choose)}
                    >Ver Resposta</button>
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={questionHook.nextPage}
                    >Próxima</button>
                </div>
            }
        </div>
    )
}
