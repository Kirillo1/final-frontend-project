import { useEffect, useState } from "react";
import { Drawer } from "../components/ui/Drawer/Drawer";
import useSmartphonesStore from "../store/useSmartphonesStore";
import Table from "../components/ui/Table/Table";


const Admin = () => {
    // Стор для работы с смартфонами
    const { smartphones, getSmartphones } = useSmartphonesStore();

    // Стейт для скрытия/показа компонента Drawer
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // Состояние для хранения ID выбранного смартфона
    const [selectedSmartphoneId, setSelectedSmartphoneId] = useState(null);

    useEffect(() => {
        getSmartphones();
    }, [getSmartphones])

    // Функция для обработки клика на кнопку
    const handleButtonClick = (id) => {
        setSelectedSmartphoneId(id);
        setDrawerOpen(true);
    };

    return (
        <section className="admin">
            <div className="max-w-7xl mx-auto px-2">
                <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                    Страница управления товарами
                </h2>
                <button
                    className="bg-indigo-500 mb-4 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setDrawerOpen(true)}
                >
                    Добавить товар
                </button>
                <Table
                    headers={[
                        { key: "name", title: "Название" },
                        { key: "modelPhone", title: "Модель" },
                        { key: "colorPhone", title: "Цвет" },
                        { key: "quantity", title: "Количество" },
                        { key: "isVerified", title: "Проверено" },
                        { key: "createdAt", title: "Добавлен" }
                    ]}
                    data={smartphones}
                    onButtonClick={handleButtonClick}
                />
                {isDrawerOpen && (
                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        title="Добавление нового товара"
                    >
                        <div className="w-full max-w-xs">
                            {selectedSmartphoneId && (
                                <p>ID выбранного смартфона: {selectedSmartphoneId}</p>
                            )}
                        </div>
                    </Drawer>
                )}
            </div>
        </section>
    );
};

export default Admin;
