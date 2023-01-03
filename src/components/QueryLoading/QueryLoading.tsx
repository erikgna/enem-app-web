export const QueryLoading = () => {
    return (
        <section className='flex flex-col px-2 dark:bg-gray-900 dark:text-white pt-16 min-h-screen'>
            <div className="p-4 max-w-2xl w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1">
                        <div className="h-5 bg-slate-700 rounded mb-10"></div>
                        <div className="h-5 bg-slate-700 rounded mb-10"></div>
                        <div className="h-5 bg-slate-700 rounded mb-10"></div>
                        <div className="h-5 bg-slate-700 rounded mb-10"></div>
                        <div className="h-5 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
