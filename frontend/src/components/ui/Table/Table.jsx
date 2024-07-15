import TableRow from "./TableRow";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headers - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @returns {JSX.Element} Элемент JSX.
 */
const Table = ({ data, headers }) => (
    <div className="w-full">
        <div className="flex flex-row">
            {headers.map((header) => (
                <div
                    key={header?.key}
                    className="py-2 px-4 justify-center text-zinc-100 font-semibold bg-violet-700 flex items-center border border-gray-800 flex-grow w-2"
                >
                    {header?.title}
                </div>
            ))}
            <div className="py-2 px-4 justify-center text-zinc-100 font-semibold bg-violet-700 flex items-center border border-gray-800 flex-grow w-2">
                Действие
            </div>
        </div>
        {data?.length > 0 ? (
            data?.map((item) => <TableRow key={crypto.randomUUID()} rowData={item} />)
        ) : (
            <div className="flex flex-row py-2 px-4 border">
                Данные в таблице отсутствуют.
            </div>
        )}
    </div>
);

export default Table;
