import { useState, useEffect } from "react";
import { read } from "xlsx";
import Papa from "papaparse";

const Formulario = () => {
    const [cargando, setCargando] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.file[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;
            const libro = XLSX.read(data, { type: "binary" });

            const encabezado = libro.SheetNames[0];
            const sheet = libro.Sheets[encabezado];

            const csv = XLSX.utils.sheet_to_csv(libro);
            const resultado = Papa.parse(csv, { header: true });

            console.log(resultado.data);
        };
    };

    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl md:my-10 mx-10">
            <h1 className="text-4xl text-center text-indigo-700">Excel</h1>
            <hr></hr>
            <form>
                <div className="w-4/5 p-4">
                    <label htmlFor="excel" className="mb-5">
                        Seleccione archivo Excel
                    </label>
                    <input
                        type="file"
                        className="w-full"
                        onChange={(e) => handleFileChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default Formulario;
