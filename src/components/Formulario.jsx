import { useState } from "react";
import * as XLSX from "xlsx";

const Formulario = () => {
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        e.preventDefault();
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
        <div className="md:flex-1 bg-white rounded-lg shadow-xl my-10 mx-10">
            <h1 className="text-4xl text-center text-green-700">
                Lector de archivos Excel
            </h1>
            <hr></hr>
            <form>
                <div className="w-4/5 p-4">
                    <label className="flex justify-center w-full h-32 px-4 transition-color bg-white border-2 border-gray-300 border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
                                <span className="text-blue-600 underline no-underline text-2xl text-gray-500">
                                    {" "}
                                    Seleccione un archivo Excel
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
            <div className="p-4">
                {data.length > 0 ? (
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500 bg-slate-500 text-white cursor-pointer">
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th
                                        scope="col"
                                        key={key}
                                        className="px-6 py-4"
                                    >
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-400 hover:text-white dark:border-neutral-500 dark:hover:bg-neutra cursor-pointer"
                                >
                                    {Object.values(row).map((value, index) => (
                                        <td
                                            key={index}
                                            className=" whitespace-nowrap px-6 py-4 font-medium"
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-orange-400 text-3xl text-center">
                        <p className=" text-green-700 py-10">
                            Debe seleccionar un archivo (Xlsx o Xls)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Formulario;
