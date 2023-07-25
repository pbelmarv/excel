import { useState } from "react";
import * as XLSX from "xlsx";

const Formulario = () => {
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const libro = XLSX.read(data, { type: "binary" });
            const nombreHoja = libro.SheetNames[0];
            const hoja = libro.Sheets[nombreHoja];
            const parseData = XLSX.utils.sheet_to_json(hoja);
            setData(parseData);
        };
    };

    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl md:my-10 mx-10">
            <h1 className="text-4xl text-center text-indigo-700">Excel</h1>
            <hr></hr>
            <form>
                <div className="w-4/5 p-4">
                    <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <span className="font-medium text-gray-600">
                                Arrastre los archivos, o{" "}
                                <span className="text-blue-600 underline">
                                    Seleccione
                                </span>
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                            />
                        </span>
                    </label>
                </div>
            </form>
            <hr></hr>
            <div>
                {data.length > 0 ? (
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    "Ho existen datos para mostrar"
                )}
            </div>
        </div>
    );
};

export default Formulario;
