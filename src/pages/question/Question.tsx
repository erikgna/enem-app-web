import { useContext, useState } from 'react'
import { IQuestion } from '../../interface/Question';

import styles from './Question.module.scss'
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../components/QueryError/QueryError';
import { useQuestion } from '../../hooks/questionHooks';
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert';
import { QuestionContext } from '../../context/Question';
import { NotFound } from '../notFound/NotFound';

export const Question = () => {
    const questionHook = useQuestion()
    const { feedback, setFeedback } = useContext(QuestionContext)

    const [choose, setChoose] = useState<string | undefined>(undefined)
    const [modal, setModal] = useState<boolean>(false)
    const [modalMsg, setModalMsg] = useState<string>('')

    if (location.pathname.includes("undefined")) {
        return <NotFound />
    }

    const questionTemp = questionHook.question

    if (questionHook.isLoading) {
        return <QueryLoading />
    }

    if (questionHook.question === null) {
        return <QueryError
            title='Erro'
            description='Ocorreu um erro ao requisitar a questão, por favor, tente novamente.'
            func={questionHook.nextPage}
            linkMsg='Tentar novamente'
        />
    }

    return (
        <div className='flex flex-col px-4 dark:bg-gray-900 dark:text-white pt-8 min-h-screen pb-8'>
            <div className='flex-col items-center justify-between mb-8'>
                <div className='mb-8'>
                    {feedback !== '' && <ErrorAlert feedback={feedback} func={() => setFeedback('')} />}
                </div>
                <h2 className='text-2xl font-bold mb-4'>{questionTemp?.name}</h2>
                <button onClick={() => setModal(true)}>
                    <p
                        className="relative inline-block text-sm font-medium text-blue-500 group active:text-blue-500 focus:outline-none focus:ring"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span className="relative block px-4 py-2 bg-[#1A2238] border border-current">
                            Reportar problema
                        </span>
                    </p>
                </button>
            </div>

            <div className={`text-base mt-4 mb-8 ${styles.Image}`} dangerouslySetInnerHTML={{ __html: questionTemp?.description.replaceAll('<br />', '<div></div>')! }} />

            <p className={`text-base mb-8 ${styles.Image}`} dangerouslySetInnerHTML={{ __html: questionTemp?.ask.replaceAll('<br />', '<div></div>')! }} />

            <ul className='flex flex-col'>
                {['a', 'b', 'c', 'd', 'e'].map((item) => {
                    type IQuestionKey = keyof typeof questionTemp

                    if (questionHook.answer === undefined) {
                        return <li key={item} onClick={() => setChoose(item)} className='mb-4'>
                            <input type="radio" id={item} className="hidden peer" />
                            <label className={`${choose === item ? 'dark:text-blue-500 dark:border-blue-600 text-blue-600' : 'dark:hover:text-gray-300 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:border-gray-700'} dark:bg-gray-800 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer`}>
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">{item.toUpperCase()}</div>
                                    <div className={`w-full ${styles.Image}`} dangerouslySetInnerHTML={{ __html: (questionTemp?.answers[item as IQuestionKey] as unknown as string).replaceAll('<br />', '<div></div>')! }} />
                                </div>
                            </label>
                        </li>
                    }

                    return <li key={item} onClick={() => setChoose(item)} className='mb-4'>
                        <input type="radio" id={item} className="hidden peer" />
                        <label className={`${questionHook.answer === item ? 'dark:text-green-500 dark:border-green-600 text-green-600' : 'dark:text-red-500 dark:border-red-600 text-red-600'} dark:bg-gray-800 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer`}>
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{item.toUpperCase()}</div>
                                <div className={`w-full ${styles.Image}`} dangerouslySetInnerHTML={{ __html: (questionTemp?.answers[item as IQuestionKey] as unknown as string).replaceAll('<br />', '<div></div>')! }} />
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
                        onClick={() => {
                            setFeedback("")
                            setChoose(undefined)
                            questionHook.nextPage()
                        }}
                    >Próxima</button>
                </div>
            }
            {modal && <div id="popup-modal" tabIndex={-1} className="fixed bg-[rgba(0,0,0,.65)] top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Fechar</span>
                        </button>
                        <div className="p-6">
                            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-center mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Descreva brevemente o problema (opcional)</h3>

                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Digite aqui..."
                                value={modalMsg}
                                onChange={(e) => setModalMsg(e.target.value)}
                            />

                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="mt-8 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                onClick={() => {
                                    questionHook.sendReport(questionTemp?.id!, modalMsg)
                                    setModal(false)
                                }}
                            >
                                Reportar
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
