import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { eraseHistory, getHistory } from '../../api';
import { Link } from 'react-router-dom';

import emptyList from '../../images/empty_list.svg'
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../components/QueryError/QueryError';

export const History = () => {
    const navigate = useNavigate()

    const query = useQuery({
        queryKey: ['questions'],
        refetchOnWindowFocus: false,
        queryFn: () => getHistory()
    })

    if (query.isLoading) {
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

    return (
        <section className='flex flex-col px-2 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <h2 className='text-2xl text-white bold mb-8'>Histórico de questões</h2>
            <ul>
                {query.data?.data.map((item: any) => (
                    <li
                        onClick={() => navigate(`/question/random/false/${item.question.url}-${item.question.rightAnswer}`)}
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
            <button className="mt-2" onClick={async () => {
                await eraseHistory()
                window.location.reload()
            }}>
                <p
                    className="relative inline-block text-sm font-medium text-blue-500 group active:text-blue-500 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Apagar histórico
                    </span>
                </p>
            </button>
        </section>
    )
}
