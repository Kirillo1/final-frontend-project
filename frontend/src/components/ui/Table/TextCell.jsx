/**
 * Компонент ячейка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {string} props.value - Содержимое ячейки.
 * @returns {JSX.Element} Элемент JSX.
 */
const TextCell = ({ value }) => (    
    <div className="flex justify-center border text-zinc-100 border-violet-700 flex-grow w-2">
        {value}
    </div>
);

export default TextCell;