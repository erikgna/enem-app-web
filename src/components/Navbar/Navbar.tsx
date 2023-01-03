import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookies, removeCookies] = useCookies()
    const navigate = useNavigate()

    const signOut = () => {
        removeCookies('token')
        navigate('/')
    }

    return (
        <nav className='border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b'>
            <div className='container flex items-center justify-between mx-auto'>
                <Link to="/" className='flex items-center'>
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Unsolved</span>
                </Link>
                <div className='items-center justify-between'>
                    <ul className='flex p-4'>
                        <li>
                            <Link to="/" className='pl-3 pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Inicio</Link>
                        </li>
                        {cookies['token'] &&
                            <li>
                                <Link to="/history" className='pl-3 pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Histórico</Link>
                            </li>
                        }
                        {cookies['token'] &&
                            <li onClick={signOut} className='pl-3 pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>
                                Sair da conta
                            </li>
                        }
                        {!cookies['token'] &&
                            <li>
                                <Link to="/login" className='pl-3 pr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>Acessar conta</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
