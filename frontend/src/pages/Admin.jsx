import { useEffect, useState } from "react";
import { Drawer } from "../components/ui/Drawer/Drawer";
import useSmartphonesStore from "../store/useSmartphonesStore";
import Table from "../components/ui/Table/Table";
import Image from "../components/ui/Image/Image";

const Admin = () => {
    // Стор для работы с смартфонами
    const { smartphones, getSmartphones } = useSmartphonesStore();

    // Стейт для скрытия/показа компонента Drawer
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // Состояние для хранения ID выбранного смартфона
    const [selectedSmartphone, setSelectedSmartphone] = useState(null);

    useEffect(() => {
        getSmartphones();
    }, [getSmartphones])

    // Функция для обработки клика на кнопку
    const handleButtonClick = (smartphone) => {
        setSelectedSmartphone(smartphone);
        setDrawerOpen(true);
    };

    const handleChange = (smartphone) => {
        console.log(smartphone);
    };

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
                    onButtonClick={handleButtonClick}
                    handleChange={handleChange}
                />
                {isDrawerOpen && (
                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    >
                        <div className="w-full max-w-xs">
                            {selectedSmartphone && (
                                <section className="card-details">
                                    <div className="max-w-7xl mx-auto px-2">
                                        <h3 className="mb-4 text-4xl font-bold text-zinc-800">
                                            {selectedSmartphone?.name} {selectedSmartphone?.model_phone}
                                        </h3>
                                        <div className="max-w-md rounded shadow-lg relative">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                                                <Image
                                                    className="w-full max-h-44"
                                                    isCritical={true}
                                                    src={`/assets/smartphones/${selectedSmartphone.images[0]}`}
                                                    alt={selectedSmartphone.name}
                                                />
                                            </div>

                                            <button
                                                className="absolute top-0 left-0 m-2 p-2 rounded-full text-white"
                                            >
                                                <svg
                                                    className="w-6 h-6 fill-current"
                                                    viewBox="0 0 32 32"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                                                </svg>
                                            </button>
                                            <div className="px-6 py-4">
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.description}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.color}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.processor}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.ram_capacity}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.memory_capacity}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.battery_capacity}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.release_year}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.quantity}</p>
                                                <p className="text-gray-600 text-sm mb-2">{selectedSmartphone?.manufacturer_country}</p>
                                                {selectedSmartphone?.rating && (
                                                    <div className="text-yellow-500 mb-2">
                                                        {"★".repeat(Math.floor(selectedSmartphone?.rating)) +
                                                            "☆".repeat(5 - Math.floor(selectedSmartphone?.rating))}
                                                    </div>
                                                )}
                                                <div className="text-lg font-bold mb-2">{selectedSmartphone?.price}$</div>
                                                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </Drawer>
                )}
            </div>
        </section>
    );
};

export default Admin;
