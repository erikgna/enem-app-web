import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router'
import { loginRoute } from '../../api'
import { ILogin } from '../../interface/User'

export const Login = () => {
    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate()

    const [creds, setCreds] = useState<ILogin>({ email: '', password: '' })
    const [feedback, setFeedback] = useState<string>('')

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (creds.email.length === 0 || creds.password.length === 0) {
            return
        }

        try {
            const { data } = await loginRoute(creds)

            setCookies('token', data['token'])

            navigate('/')
        } catch (error) {
            setFeedback('Ocorreu um erro com seu login, tente novamente.')
        }
    }

    return (
        <section className='flex-col pl-4 pr-4 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <h2 className='text-2xl font-medium' onClick={() => setFeedback('dsds')}>Entrar na sua conta</h2>
            <p className='text-base mt-1 mb-2'>Entre na sua conta para poder registrar as suas perguntas respondidas</p>
            <form onSubmit={(e) => login(e)}>
                <div className="flex-col mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                            name='email'
                            title='email'
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
                            title='password'
                            type="password"
                            placeholder='Sua senha'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Realizar Login</button>
            </form>
            {feedback !== '' && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{feedback}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>}
        </section>
    )
}
