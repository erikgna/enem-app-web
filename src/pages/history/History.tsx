import { useContext, useEffect, useState } from 'react';

import { IQuestion } from '../../interface/Question';
import { useNavigate } from 'react-router';
import { QuestionContext } from '../../context/Question';

export const History = () => {
    const navigate = useNavigate()
    const { navigateToAnsweredQuestion } = useContext(QuestionContext)

    const [rights, setRights] = useState<IQuestion[]>([])
    const [wrongs, setWrongs] = useState<IQuestion[]>([])

    useEffect(() => {
        setRights(JSON.parse(sessionStorage.getItem('right') || '[]'))
        setWrongs(JSON.parse(sessionStorage.getItem('wrong') || '[]'))
    }, [])

    return (
        <section className='flex flex-col px-2 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <ul>
                {wrongs.map((item) => (
                    <li className="p-4 dark:border-red-500 border rounded-lg cursor-pointer mb-4" key={item.url}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.question}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Resposta correta: <strong>{item.rightAnswer?.toUpperCase()}</strong>
                                </p>
                            </div>
                            <div className="dark:text-red-500 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                Errada
                            </div>
                        </div>
                    </li>
                ))}
                {wrongs.map((item) => (
                    <li className="p-4 dark:border-green-500 border rounded-lg cursor-pointer mb-4" key={item.url}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item.question}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Resposta correta: <strong>{item.rightAnswer?.toUpperCase()}</strong>
                                </p>
                            </div>
                            <div className="dark:text-green-500 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                Correta
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

{/* // <Container>
        //     <List>
        //         {wrongs.map((item) => (
        //             <ListItem key={item.question} sx={{ background: 'red', mb: '16px' }} onClick={() => navigateToAnsweredQuestion(item)}>
        //                 <ListItemText primary={item.question} secondary='Errado' />
        //             </ListItem>
        //         ))}

        //         {rights.map((item) => (
        //             <ListItem key={item.question} sx={{ background: 'green' }}>
        //                 <ListItemText primary={item.question} secondary='Correta' />
        //             </ListItem>
        //         ))}
        //     </List>
        // </Container> */}
