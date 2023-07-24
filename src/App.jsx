function App() {
    return (
        <>
            <div className="container bg-slate-500">
                <h1 className="text-4xl text-center text-indigo-700">Excel</h1>
                <form>
                    <label htmlFor="excel">Seleccione archivo Excel</label>
                    <input type="file" className="w-full" />
                </form>
            </div>
        </>
    );
}

export default App;
