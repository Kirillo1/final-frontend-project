import TableRow from "./TableRow";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @param {Array} props.headers - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Function} props.onButtonClick - Функция обработки клика на кнопку доп информации смартфона
 * @param {Function} props.handleChange - Функция обработки свича изменения статуса смартфона
 * @param {Function} props.onDeleteButtonClick - Функция обработки клика на кнопку удаления товара
 * @returns {JSX.Element} Элемент JSX.
 */
const Table = ({ data, headers, onButtonClick, handleChange, onDeleteButtonClick }) => (
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
                Информация
            </div>
            <div className="py-2 px-4 justify-center text-zinc-100 font-semibold bg-violet-700 flex items-center border border-gray-800 flex-grow w-2">
                Статус
            </div>
            <div className="py-2 px-4 justify-center text-zinc-100 font-semibold bg-violet-700 flex items-center border border-gray-800 flex-grow w-2">
                Удалить
            </div>
        </div>
        {data?.length > 0 ? (
            data?.map((item) => (
                <TableRow
                    key={crypto.randomUUID()}
                    rowData={item}
                    onButtonClick={onButtonClick}
                    handleChange={handleChange}
                    onDeleteButtonClick={onDeleteButtonClick}
                />
            ))
        ) : (
            <div className="flex flex-row py-2 px-4 border">
                Данные в таблице отсутствуют.
            </div>
        )}
    </div>
);

export default Table;
