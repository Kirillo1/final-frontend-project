import { useEffect, useState } from "react";
import useProductsStore from "../store/useProductsStore";
import useUsersStore from "../store/useUsersStore";
import { Drawer } from "../components/ui/Drawer/Drawer";
import Table from "../components/ui/Table/Table";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import BatteryStdTwoToneIcon from '@mui/icons-material/BatteryStdTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import ProductionQuantityLimitsTwoToneIcon from '@mui/icons-material/ProductionQuantityLimitsTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import CurrencyRubleTwoToneIcon from '@mui/icons-material/CurrencyRubleTwoTone';

const Admin = () => {
    const {
        smartphones,
        accessories,
        fetchData,
        deleteDataById,
        changeStatus,
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        fetchData: state.fetchData,
        deleteDataById: state.deleteDataById,
        changeStatus: state.changeStatus,
    }));

    const { 
        users, 
        fetchUsersData 
    } = useUsersStore(state => ({
        users: state.users,
        fetchUsersData: state.fetchUsersData,
    }));

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemType, setItemType] = useState(null);
    
    useEffect(() => {
        fetchData("smartphones", "smartphones");
        fetchData("accessories", "accessories");
    }, [fetchData]);
    
    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]);
    
    const handleButtonSmartphoneClick = (smartphone) => {
        setSelectedItem(smartphone);
        setItemType('smartphone');
        setDrawerOpen(true);
    };

    const handleButtonAccessoryClick = (accessory) => {
        setSelectedItem(accessory);
        setItemType('accessory');
        setDrawerOpen(true);
    };

    const handleButtonUserClick = (user) => {
        setSelectedItem(user);
        setItemType('user');
        setDrawerOpen(true);    
    };

    const handleSmartphoneChange = (smartphone) => {
        if (!smartphone?.id) return;
        const isVerified = !smartphone.is_verified;

        changeStatus(smartphone.id, "smartphones", isVerified);
    };

    const handleAccessoryChange = (accessory) => {
        if (!accessory?.id) return;
        const isVerified = !accessory.is_verified;
        console.log(isVerified)

        changeStatus(accessory.id, "accessories", isVerified);    
    };

    const handleUserChange = (user) => {
        console.log(user)
    };

    const onDeleteSmartphoneButtonClick = (smartphoneID) => {
        deleteDataById(smartphoneID, "smartphones", "smartphones");
    };

    const onDeleteAccessoryButtonClick = (accessoryID) => {
        deleteDataById(accessoryID, "accessories", "accessories");
    };

    const onDeleteUserButtonClick = (userID) => {
        console.log(userID)
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedItem(null);
        setItemType(null);
    };

    const companyUsers = users.filter(user => user.role === 'company');

    return (
        <section className="admin">
            <div className="max-w-7xl mx-auto px-2">
                <div className="mb-8 pb-3">
                    <h3 className="mb-4 text-4xl font-bold text-zinc-100 mt-5">Смартфоны</h3>
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
                        onButtonClick={handleButtonSmartphoneClick}
                        handleChange={handleSmartphoneChange}
                        onDeleteButtonClick={onDeleteSmartphoneButtonClick}
                    />
                </div>

                <div className="mt-8 pt-3">
                    <h3 className="mb-4 text-4xl font-bold text-zinc-100 mt-5">Аксессуары</h3>
                    <Table
                        headers={[
                            { key: "name", title: "Название" },
                            { key: "modelPhone", title: "Модель" },
                            { key: "colorPhone", title: "Цвет" },
                            { key: "quantity", title: "Количество" },
                            { key: "isVerified", title: "Проверено" },
                            { key: "createdAt", title: "Добавлен" }
                        ]}
                        data={accessories}
                        onButtonClick={handleButtonAccessoryClick}
                        handleChange={handleAccessoryChange}
                        onDeleteButtonClick={onDeleteAccessoryButtonClick}
                    />
                </div>

                <div className="mt-8 pt-3">
                    <h3 className="mb-4 text-4xl font-bold text-zinc-100 mt-5">Компании</h3>
                    <Table
                        headers={[
                            { key: "company_name", title: "Компания" },
                            { key: "email", title: "Почта" },
                            { key: "first_name", title: "Имя" },
                            { key: "last_name", title: "Фамилия" },
                            { key: "phone_number", title: "Телефон" },
                        ]}
                        data={companyUsers}
                        onButtonClick={handleButtonUserClick}
                        handleChange={handleUserChange}
                        onDeleteButtonClick={onDeleteUserButtonClick}
                    />
                </div>

                {isDrawerOpen && (
                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={handleCloseDrawer}
                    >
                        <div className="w-full">
                            {selectedItem && itemType === 'smartphone' && (
                                <section className="card-details">
                                    <div className="max-w-7xl mx-auto px-2">
                                        <h3 className="mb-4 text-4xl font-bold text-zinc-300">
                                            {selectedItem?.name} {selectedItem?.phone_model}
                                        </h3>
                                        <div className="max-w-md rounded shadow-lg relative">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                                            </div>
                                            <Box sx={{ width: 450, height: 300, overflowY: 'scroll', display: 'flex' }}>
                                                <ImageList variant="masonry" cols={3} gap={8}>
                                                    {selectedItem.images.map((image) => (
                                                        <ImageListItem key={image}>
                                                            <img
                                                                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`/assets/smartphones/${image}`}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            </Box>
                                            <div className="px-1 py-4">
                                                <p className="text-zinc-300 text-sm mb-2">{selectedItem?.description}</p>
                                                <p className="text-zinc-500 text-sm mb-2"><ColorLensTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.color}</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><MemoryTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.processor}</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><StorageTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.ram_capacity} Гб (ОП)</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><StorageTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.memory_capacity} Гб (ВП)</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><BatteryStdTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.battery_capacity} мА*ч</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><EventAvailableTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.release_year} год</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><ProductionQuantityLimitsTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.quantity} месяцев</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><PublicTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.manufacturer_country}</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><CurrencyRubleTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.price}</span></p>
                                                {selectedItem?.rating && (
                                                    <div className="text-yellow-500 mb-2">
                                                        {"★".repeat(Math.floor(selectedItem?.rating)) +
                                                            "☆".repeat(5 - Math.floor(selectedItem?.rating))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {selectedItem && itemType === 'accessory' && (
                                <section className="card-details">
                                    <div className="max-w-7xl mx-auto px-2">
                                        <h3 className="mb-4 text-4xl font-bold text-zinc-300">
                                            {selectedItem?.name} {selectedItem?.phone_model}
                                        </h3>
                                        <div className="max-w-md rounded shadow-lg relative">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                                            </div>
                                            <Box sx={{ width: 450, height: 300, overflowY: 'scroll', display: 'flex' }}>
                                                <ImageList variant="masonry" cols={3} gap={8}>
                                                    {selectedItem.images.map((image) => (
                                                        <ImageListItem key={image}>
                                                            <img
                                                                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`/assets/smartphones/${image}`}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            </Box>
                                            <div className="px-1 py-4">
                                                <p className="text-zinc-300 text-sm mb-2">{selectedItem?.description}</p>
                                                <p className="text-zinc-500 text-sm mb-2"><ColorLensTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.color}</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><EventAvailableTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.release_year} год</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><ProductionQuantityLimitsTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.quantity} месяцев</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><PublicTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.manufacturer_country}</span></p>
                                                <p className="text-zinc-500 text-sm mb-2"><CurrencyRubleTwoToneIcon /> <span className="text-zinc-300">{selectedItem?.price}</span></p>
                                                {selectedItem?.rating && (
                                                    <div className="text-yellow-500 mb-2">
                                                        {"★".repeat(Math.floor(selectedItem?.rating)) +
                                                            "☆".repeat(5 - Math.floor(selectedItem?.rating))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {selectedItem && itemType === 'user' && (
                                <section className="card-details">
                                    <div className="max-w-7xl mx-auto px-2">
                                        <h3 className="mb-4 text-4xl font-bold text-zinc-300">
                                            {selectedItem?.company_name}
                                        </h3>
                                        <div className="max-w-md rounded shadow-lg relative">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                                            </div>
                                            <Box sx={{ width: 450, height: 300, overflowY: 'scroll', display: 'flex' }}>
                                                {/* <ImageList variant="masonry" cols={3} gap={8}>
                                                    {selectedItem.images.map((image) => (
                                                        <ImageListItem key={image}>
                                                            <img
                                                                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`/assets/smartphones/${image}`}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> */}
                                            </Box>
                                            <div className="px-1 py-4">
                                                <p className="text-zinc-300 text-sm mb-2">{selectedItem?.first_name}</p>
                                                <p className="text-zinc-300 text-sm mb-2">{selectedItem?.last_name}</p>
                                            
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
