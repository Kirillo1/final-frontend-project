import TextCell from "./TextCell";
import Switch from '@mui/material/Switch';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

/**
 * Компонент строка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {object} props.rowData - Объект с характеристиками передаваемой сущности.
 * @param {Function} props.onButtonClick - Функция обработки клика на кнопку доп информации смартфона
 * @param {Function} props.handleChange - Функция обработки свича изменения статуса смартфона
 * @param {Function} props.onDeleteButtonClick - Функция обработки клика на кнопку удаления товара
 * @returns {JSX.Element} Элемент JSX.
 */
const TableRow = ({ rowData, onButtonClick, handleChange, onDeleteButtonClick }) => {
    const exclusionKeys = [
        "id",
        "processor",
        "ram_capacity",
        "memory_capacity",
        "battery_capacity",
        "release_year",
        "guarantee",
        "price",
        "manufacturer_country",
        "description",
        "images",
        "user_id",
        "role",
        "is_superuser",
        "is_active"
    ];

    // Получает все ключи объекта rowData, кроме исключенных ключей
    const rowKeys = Object.keys(rowData || {}).filter((key) => !exclusionKeys.includes(key));

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const transformedData = rowKeys.map(key => {
        let value = rowData[key];
        if (key === "is_verified") {
            value = value ? "Проверено" : "Не проверено";
        }
        if (key === "created_at") {
            value = formatDateTime(value);
        }
        return { key, value };
    });

    // Переопределяем ключи для компаний, если это необходимо
    const companyHeaders = [
        "company_name", "email", "first_name", "last_name", "phone_number",
    ];

    const companyTransformedData = companyHeaders.map(key => ({
        key,
        value: rowData[key] || ''
    }));

    return (
        <div className="flex flex-row">
            {(rowData.role === 'company' ? companyTransformedData : transformedData).map(({ key, value }) => (
                <TextCell key={key} value={value} />
            ))}
            {rowData.role === 'company' ? (
                <>
                <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
                    <button onClick={() => onButtonClick(rowData)} className="px-4 py-2 text-white">
                        ...
                    </button>
                </div>
                <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
                        <Switch
                            defaultChecked={rowData?.is_verified ? true : undefined}
                            onChange={() => handleChange(rowData)}
                            color="secondary"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
                        <button onClick={() => onButtonClick(rowData)} className="px-4 py-2 text-white">
                            ...
                        </button>
                    </div>
                    <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
                        <Switch
                            defaultChecked={rowData?.is_verified ? true : undefined}
                            onChange={() => handleChange(rowData)}
                            color="secondary"
                        />
                    </div>
                </>
            )}
            <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
                <button onClick={() => onDeleteButtonClick(rowData.id)} className="px-4 py-2 text-red">
                    <DeleteForeverTwoToneIcon sx={{ color: "#c1121f" }} />
                </button>
            </div>
        </div>
    );
};

export default TableRow;
