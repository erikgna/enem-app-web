import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../../api';

export const History = () => {
    const navigate = useNavigate()

    const query = useQuery({
        queryKey: ['questions'],
        refetchOnWindowFocus: false,
        queryFn: () => getHistory()
    })

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
        </section >
    )
}
