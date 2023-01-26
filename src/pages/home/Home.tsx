import { useContext, useState } from 'react'
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert'
import { QueryLoading } from '../../components/QueryLoading/QueryLoading'

import { QuestionContext } from '../../context/Question'

const areas = [{ name: 'Ciências Humanas e suas Tecnologias', cod: 'humanas' },
{ name: 'Ciências Naturais e suas Tecnologias', cod: 'naturais' },
{ name: 'Linguagens, Códigos e suas Tecnologias', cod: 'linguagens' },
{ name: 'Matemática e suas Tecnologias', cod: 'matematica' }]

export const Home = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { getRandomQuestion, setFilters, setFeedback, filters, isLoading, feedback } = useContext(QuestionContext)

    const addOrRemoveYear = (year: string) => {
        if (filters.years.includes(year)) {
            const tempYears = filters.years.filter((val) => val !== year)
            setFilters({ areas: filters.areas, years: tempYears })
            localStorage.setItem('filters', JSON.stringify({ ...filters, years: tempYears }))
            return;
        }
        setFilters({ ...filters, years: [...filters.years, year] })

        localStorage.setItem('filters', JSON.stringify({ ...filters, years: [...filters.years, year] }))
    }

    const addOrRemoveArea = (area: string) => {
        if (filters.areas.includes(area)) {
            const tempAreas = filters.areas.filter((val) => val !== area)
            setFilters({ years: filters.years, areas: tempAreas })
            localStorage.setItem('filters', JSON.stringify({ ...filters, areas: tempAreas }))
            return;
        }
        setFilters({ ...filters, areas: [...filters.areas, area] })

        localStorage.setItem('filters', JSON.stringify({ ...filters, areas: [...filters.areas, area] }))
    }

    if (isLoading) {
        return <QueryLoading />
    }

    return (
        <div className='flex flex-col px-4 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <div className='flex flex-col pb-4'>
                <h2 className='text-2xl font-bold'>Filtre as perguntas que você irá receber</h2>
                <h4 className='text-lg font-semibold pt-8'>Selecione as áreas de conhecimento desejadas</h4>
            </div>

            <ul className="grid gap-6 w-full md:grid-cols-2">
                {areas.map((item) => (
                    <li key={item.name} onClick={() => addOrRemoveArea(item.cod)}>
                        <input type="radio" id={item.name} className="hidden peer" />
                        <label className={`${filters.areas.includes(item.cod) ? 'dark:text-blue-500 dark:border-blue-600 text-blue-600' : 'dark:hover:text-gray-300 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:border-gray-700'} dark:bg-gray-800 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer`}>
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{(item.cod.includes('naturais') || item.cod.includes('matematica')) ? 'Segundo dia' : 'Primeiro dia'}</div>
                                <div className="w-full">{item.name}</div>
                            </div>
                            <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </label>
                    </li>
                ))}
            </ul>

            <h4 className='text-lg font-semibold pt-8 pb-4'>Selecione os anos desejados</h4>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 lg:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022].map((year) => (
                    <li key={year} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" onClick={() => addOrRemoveYear(year.toString())}>
                        <div className="flex items-center pl-3">
                            <input
                                readOnly={true}
                                checked={filters.years.includes(year.toString())}
                                id={year.toString()}
                                type="radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{year}</label>
                        </div>
                    </li>))}
            </ul>

            {open && <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <span className="font-medium">Selecione ao menos um ano e uma área.</span>
            </div>}

            <div className='flex align-center mt-4 pb-8'>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {
                        if (filters.areas.length === 0 || filters.years.length === 0) {
                            setOpen(true)
                        }
                        getRandomQuestion(false)
                    }}
                >Gerar Perguntas</button>
                <button
                    type="button"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => getRandomQuestion(true)}
                >Gerar Perguntas Aleatoriamente</button>
            </div>
            {feedback !== '' && <ErrorAlert feedback={feedback} func={() => setFeedback('')} />}
        </div>
    )
}
