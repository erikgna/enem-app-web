import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { isExpired } from 'react-jwt';
import { Link } from 'react-router-dom';

import icon from '../../images/icon.png'

export const Navbar = () => {
    const [cookies, setCookies, removeCookies] = useCookies()
    const isTokenExpired = isExpired(cookies["unsolved-token"])

    const signOut = () => {
        removeCookies('unsolved-token')
        window.location.replace("/")
    }

    useEffect(() => {
        if (isTokenExpired && cookies["unsolved-token"]) {
            removeCookies('unsolved-token')
            window.location.replace("/login")
        }
    }, [])

    return (
        <nav className='border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b'>
            <div className='flex items-center justify-between mx-auto'>
                <Link to="/" className='flex items-center'>
                    <img src={icon} className="mr-3 sm:w-8 sm:h-8 w-6 h-6" alt="Flowbite Logo" />
                    <span className="self-center sm:text-xl text-lg font-semibold whitespace-nowrap dark:text-white">Unsolved</span>
                </Link>
                <div className='items-center justify-between'>
                    <ul className='flex p-4 text-sm sm:text-md font-semibold'>
                        <li>
                            <Link to="/" className='pl-3 pr-0 sm:pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Inicio</Link>
                        </li>
                        {cookies['unsolved-token'] &&
                            <li>
                                <Link to="/history" className='pl-3 pr-0 sm:pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Histórico</Link>
                            </li>
                        }
                        {cookies['unsolved-token'] &&
                            <li onClick={signOut} className='cursor-pointer pl-3 pr-0 sm:pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>
                                Sair
                            </li>
                        }
                        {!cookies['unsolved-token'] &&
                            <li>
                                <Link to="/login" className='pl-3 pr-0 sm:pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Acessar conta</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
