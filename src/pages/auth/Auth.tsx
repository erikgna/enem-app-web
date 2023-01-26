import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { loginRoute, registerRoute } from '../../api'
import { ILogin, IRegister } from '../../interface/User'

const defaultCreds = { email: '', password: '', confirmPassword: '', fullName: '' }

export const Auth = () => {
    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate()
    const location = useLocation()

    const isLogin = location.pathname.includes('login')

    const [creds, setCreds] = useState<ILogin | IRegister>(defaultCreds)
    const [feedback, setFeedback] = useState<string>('')

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFeedback("")

        if (creds.email.length === 0 || creds.password.length === 0) {
            return;
        }

        try {
            const { data } = await loginRoute(creds)

            setCookies('unsolved-token', data['token'], { maxAge: 86400 })

            navigate('/')
            window.location.reload()
        } catch (error) {
            setFeedback('Ocorreu um erro com seu login, tente novamente.')
        }
        setCreds(defaultCreds)
    }

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFeedback("")

        if (creds.email.length === 0 || creds.password.length === 0) {
            return;
        }

        try {
            await registerRoute(creds as IRegister)

            setCreds(defaultCreds)
            navigate('/login')
        } catch (error) {
            setFeedback('Ocorreu um erro com seu registro, tente novamente.')
        }
    }

    return (
        <section className='flex-col pl-4 pr-4 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <h2 className='text-2xl font-medium'>{isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}</h2>
            <p className='text-base mt-1 mb-2'>{`${isLogin ? 'Entre na' : 'Crie'} sua conta para poder registrar as suas perguntas respondidas`}</p>
            <form onSubmit={(e) => isLogin ? login(e) : register(e)}>
                <div className="flex-col mb-6 md:grid-cols-2">
                    {!isLogin && <div>
                        <label
                            htmlFor="fullName"
                            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                            Nome Completo
                        </label>
                        <input
                            onChange={(e) => setCreds({ ...creds, fullName: e.target.value })}
                            name='fullName'
                            title='Nome completo'
                            value={(creds as IRegister).fullName}
                            type="text"
                            placeholder='Seu nome completo'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                            name='email'
                            title='Email'
                            value={(creds as IRegister).email}
                            type="email"
                            placeholder='Seu email'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                            Senha
                        </label>
                        <input
                            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                            name='password'
                            title='Senha'
                            value={(creds as IRegister).password}
                            type="password"
                            placeholder='Sua senha'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    {!isLogin && <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                            Confirmar senha
                        </label>
                        <input
                            onChange={(e) => setCreds({ ...creds, confirmPassword: e.target.value })}
                            name='confirmPassword'
                            title='Confirmar senha'
                            value={(creds as IRegister).confirmPassword}
                            type="password"
                            placeholder='Confirme sua senha'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>}
                </div>

                <div className='flex'>
                    <button type="submit" className="mr-4 h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLogin ? 'Realizar Login' : 'Criar Conta'}</button>
                    {!isLogin ? <Link to='/login'>
                        <button
                            type="button"
                            className="py-2.5 px-5 h-12 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >Fazer Login</button>
                    </Link> :
                        <Link to='/register'>
                            <button
                                type="button"
                                className="py-2.5 px-5 h-12 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >Criar Conta</button>
                        </Link>}
                </div>
            </form>
            {feedback !== '' && <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{feedback}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setFeedback('')}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>}
        </section>
    )
}
