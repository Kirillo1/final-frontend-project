import { useEffect } from "react";
import useSmartphonesStore from "../store/useSmartphonesStore";
import Table from "../components/ui/Table/Table";

const Admin = () => {
    // Стор для работы с смартфонами
    const { smartphones, getSmartphones } = useSmartphonesStore();

    useEffect(() => {
        getSmartphones();
    }, [getSmartphones])

    return (
        <section className="admin">
            <div className="max-w-7xl mx-auto px-2">
                <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                    Страница управления товарами
                </h2>
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
                />
            </div>
        </section>
    );
};

export default Admin;
