import Sidebar from "./components/Sidebar";
import Formulario from "./components/Formulario";

function App() {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <Formulario />
            </div>
        </>
    );
}

export default App;
