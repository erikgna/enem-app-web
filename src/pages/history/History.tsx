import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { eraseHistory, getHistory, getOneRandomQuestion } from '../../api';
import { Link } from 'react-router-dom';

import emptyList from '../../images/empty_list.svg'
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../components/QueryError/QueryError';

import { IHistoryQuestion } from '../../interface/Question';
import { PercentageCircle } from '../../components/PercentageCircle/PercentageCircle';
import { Button } from '../../components/Buttons/Button';
import { useState } from 'react';
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert';
import { useQuestion } from '../../hooks/questionHooks';

export const History = () => {
    const navigate = useNavigate()
    const questionHook = useQuestion()

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const deleteHistory = async () => {
        setIsLoading(true)
        try {
            await eraseHistory()
            query.refetch()
        } catch (error) {
            setError('Ocorreu um erro ao apagar o histórico')
        }
        setIsLoading(false)
    }

    const query = useQuery({
        queryKey: ['questions'],
        refetchOnWindowFocus: false,
        queryFn: () => getHistory()
    })

    if (query.isLoading || isLoading) {
        return <QueryLoading />
    }

    if (query.isError) {
        return <QueryError
            title='Erro'
            description='Ocorreu um erro ao requisitar seu histórico, por favor, tente novamente.'
            func={() => { }}
            link="/"
            linkMsg='Voltar ao Inicio'
        />
    }

    if (query.data?.data.length === 0) {
        return (
            <section className='flex items-center flex-col px-2 dark:bg-gray-900 dark:text-white pt-32 pb-24 min-h-screen'>
                <img src={emptyList} alt="Empty List" className='max-w-xl w-64' />

                <h2 className='text-white mt-12 mb-4 font-semibold text-xl'>Ops... Seu histórico de questões está vazio.</h2>

                <button className="mt-5">
                    <p
                        className="relative inline-block text-sm font-medium text-blue-500 group active:text-blue-500 focus:outline-none focus:ring"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            <Link to="/">Voltar ao Inicio</Link>
                        </span>
                    </p>
                </button>
            </section>
        )
    }

    const questions = query.data?.data as IHistoryQuestion[]
    const tempPercentage = { humanas: { correct: 0, wrong: 0 }, linguagens: { correct: 0, wrong: 0 }, matematica: { correct: 0, wrong: 0 }, natureza: { correct: 0, wrong: 0 } }

    questions.forEach((item) => {
        if (item.question.url.includes('humanas')) {
            item.correct ? tempPercentage.humanas.correct++ : tempPercentage.humanas.wrong++
        }
        if (item.question.url.includes('linguagens')) {
            item.correct ? tempPercentage.linguagens.correct++ : tempPercentage.linguagens.wrong++
        }
        if (item.question.url.includes('matematica')) {
            item.correct ? tempPercentage.matematica.correct++ : tempPercentage.matematica.wrong++
        }
        if (item.question.url.includes('naturais')) {
            item.correct ? tempPercentage.natureza.correct++ : tempPercentage.natureza.wrong++
        }
    })

    const hundredPercentage = 100

    const medLinguagens = Math.round((tempPercentage.linguagens.correct * hundredPercentage) / (tempPercentage.linguagens.correct + tempPercentage.linguagens.wrong))
    const medHumanas = Math.round((tempPercentage.humanas.correct * hundredPercentage) / (tempPercentage.humanas.correct + tempPercentage.humanas.wrong))
    const medNaturezas = Math.round((tempPercentage.natureza.correct * hundredPercentage) / (tempPercentage.natureza.correct + tempPercentage.natureza.wrong))
    const medMatematicas = Math.round((tempPercentage.matematica.correct * hundredPercentage) / (tempPercentage.matematica.correct + tempPercentage.matematica.wrong))

    return (
        <section className='flex pb-8 flex-col px-4 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <h2 className='text-2xl text-white bold'>Pontuação</h2>
            <div className='flex pb-24 justify-center w-full flex-wrap'>
                <div className='flex flex-wrap justify-center'>
                    <div className='flex flex-col mt-8 w-80'>
                        <h4 className='pb-8 text-center text-base '>Ciências Humanas e suas Tecnologias</h4>
                        <PercentageCircle percentage={isNaN(medHumanas) ? 0 : medHumanas} />
                    </div>
                    <div className='flex flex-col mt-8 w-80'>
                        <h4 className='pb-8 text-center text-base'>Ciências Naturais e suas Tecnologias</h4>
                        <PercentageCircle percentage={isNaN(medNaturezas) ? 0 : medNaturezas} />
                    </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                    <div className='flex flex-col mt-8 w-80'>
                        <h4 className='pb-8 text-center text-base'>Linguagens, Códigos e suas Tecnologias</h4>
                        <PercentageCircle percentage={isNaN(medLinguagens) ? 0 : medLinguagens} />
                    </div>
                    <div className='flex flex-col mt-8 w-80'>
                        <h4 className='pb-8 text-center text-base'>Matemática e suas Tecnologias</h4>
                        <PercentageCircle percentage={isNaN(medMatematicas) ? 0 : medMatematicas} />
                    </div>
                </div>
            </div>
            <h2 className='text-2xl text-white bold mb-8'>Histórico de questões</h2>
            <ul className='mb-2'>
                {query.data?.data.map((item: any) => (
                    <li
                        onClick={async () => {
                            await questionHook.getQuestion(item.question.url)
                            navigate(`/question/random/false/${item.question.url}-${item.question.rightanswer}`)
                        }}
                        className={`${item.correct ? 'p-4 border-green-500 border rounded-lg cursor-pointer mb-4' : 'p-4 border-red-500 border rounded-lg cursor-pointer mb-4'}`}
                        key={item.question.name}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.question.name}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Button text='Apagar histórico' func={deleteHistory} />
            {error !== '' && <ErrorAlert feedback={error} func={() => setError('')} />}
        </section>
    )
}
