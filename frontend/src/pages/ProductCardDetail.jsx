import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useProductsStore from "../store/useProductsStore";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BatteryStdTwoToneIcon from '@mui/icons-material/BatteryStdTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import CurrencyRubleTwoToneIcon from '@mui/icons-material/CurrencyRubleTwoTone';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Image from "../components/ui/Image/Image";

const ProductCardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const {
        smartphones,
        accessories,
        smartphoneDetail,
        accessoryDetail,
        loading,
        error,
        fetchDetail,
        deleteDataById,
        clearDetail,
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        smartphoneDetail: state.smartphoneDetail,
        accessoryDetail: state.accessoryDetail,
        loading: state.loading,
        error: state.error,
        fetchDetail: state.fetchDetail,
        deleteDataById: state.deleteDataById,
        clearDetail: state.clearDetail,
    }));

    useEffect(() => {
        const endpoint = location.pathname.includes("smartphone") ? "smartphones" : "accessories";
        const detailType = location.pathname.includes("smartphone") ? "smartphone" : "accessory";
        fetchDetail(id, endpoint, detailType);
        return () => clearDetail(detailType);
    }, [id, location, fetchDetail, clearDetail]);

    const onDeleteButtonClick = async (id) => {
        const endpoint = location.pathname.includes("smartphone") ? "smartphones" : "accessories";
        const type = location.pathname.includes("smartphone") ? "smartphone" : "accessory";
        try {
            await deleteDataById(id, endpoint, type);
            navigate('/company_products');
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (location.pathname.includes("smartphone")) {
        return (
            <section className="card-details">
                <div className="max-w-7xl mx-auto px-2">
                    <div className="flex justify-between mb-3">
                        <h2 className="mb-4 text-4xl font-bold text-zinc-200">
                            {smartphoneDetail?.name} {smartphoneDetail?.phone_model}
                        </h2>
                        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded">
                            Добавить в корзину
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <div className="basis-1/2">
                            <div className="py-4">
                                <p className="text-gray-600 text-sm mb-2"><ColorLensTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Цвет: {smartphoneDetail?.color}</p>
                                <p className="text-gray-600 text-sm mb-2"><MemoryTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Процессор: {smartphoneDetail?.processor}</p>
                                <p className="text-gray-600 text-sm mb-2"><StorageTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Оперативная память: {smartphoneDetail?.ram_capacity}</p>
                                <p className="text-gray-600 text-sm mb-2"><StorageTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Внутренняя память: {smartphoneDetail?.memory_capacity}</p>
                                <p className="text-gray-600 text-sm mb-2"><BatteryStdTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Емкость аккумулятора: {smartphoneDetail?.battery_capacity}</p>
                                <p className="text-gray-600 text-sm mb-2"><EventAvailableTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Релиз: {smartphoneDetail?.release_year}</p>
                                <p className="text-gray-600 text-sm mb-2"><PublicTwoToneIcon sx={{ color: "rgb(124 58 237)" }} /> Страна производства: {smartphoneDetail?.manufacturer_country}</p>
                                <p className="text-gray-600 text-sm mb-2"><InfoRoundedIcon sx={{ color: "rgb(124 58 237)" }} /> Описание: {smartphoneDetail?.description}</p>
                                {smartphoneDetail?.rating && (
                                    <div className="text-yellow-500 mb-2">
                                        {"★".repeat(Math.floor(smartphoneDetail?.rating)) +
                                            "☆".repeat(5 - Math.floor(smartphoneDetail?.rating))}
                                    </div>
                                )}
                                <p className="text-gray-600 text-2xl mt-5">{smartphoneDetail?.price} <CurrencyRubleTwoToneIcon /></p>
                            </div>
                            {user && (smartphoneDetail?.user_id !== user?.id) && (
                                <div className="mt-5">
                                    <ButtonGroup variant="outlined" aria-label="Loading button group">
                                        <Button onClick={() => console.log(smartphoneDetail.id)}>Изменить</Button>
                                        <Button>
                                            <DeleteForeverTwoToneIcon sx={{ color: "#c1121f" }} onClick={() => onDeleteButtonClick(smartphoneDetail.id)} />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            )}
                        </div>
                        <div className="basis-1/8">
                            <ImageList sx={{ width: 700, height: 500 }} cols={3} rowHeight={200}>
                                {smartphoneDetail?.images && smartphoneDetail.images.length > 0 ? (
                                    smartphoneDetail.images.map((image) => (
                                        <ImageListItem key={`/assets/smartphones/${image}`}>
                                            <img
                                                srcSet={`/assets/smartphones/${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`/assets/smartphones/${image}?w=164&h=164&fit=crop&auto=format`}
                                                alt={smartphoneDetail.name}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))
                                ) : (
                                    <div>Нет изображений для смартфона</div>
                                )}
                            </ImageList>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else if (location.pathname.includes("accessory")) {
        if (accessoryLoading) return <div>Loading...</div>;
        if (accessoryError) return <div>Error: {accessoryError}</div>;

        return (
            <section className="card-details">
                <div className="max-w-7xl mx-auto px-2">
                    <Link to="/accessories" className="inline-flex text-indigo-500 hover:text-indigo-600 mb-8">
                        Назад
                    </Link>
                    <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                        {accessoryDetail?.name} {accessoryDetail?.phone_model}
                    </h2>
                    <div className="max-w-md rounded shadow-lg relative">
                        <div className="relative">
                            <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                            <Image
                                className="w-full max-h-44"
                                isCritical={true}
                                src={`/assets/smartphones/${accessoryDetail?.images[0]}`}
                                alt={accessoryDetail?.name}
                            />
                        </div>
                        <button className="absolute top-0 left-0 m-2 p-2 rounded-full text-white">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                            </svg>
                        </button>
                        <div className="px-6 py-4">
                            <p className="text-gray-600 text-sm mb-2">{accessoryDetail?.description}</p>
                            <p className="text-gray-600 text-sm mb-2">{accessoryDetail?.color}</p>
                            <p className="text-gray-600 text-sm mb-2">{accessoryDetail?.quantity}</p>
                            <p className="text-gray-600 text-sm mb-2">{accessoryDetail?.manufacturer_country}</p>
                            {accessoryDetail?.rating && (
                                <div className="text-yellow-500 mb-2">
                                    {"★".repeat(Math.floor(accessoryDetail?.rating)) +
                                        "☆".repeat(5 - Math.floor(accessoryDetail?.rating))}
                                </div>
                            )}
                            <div className="text-lg font-bold mb-2">{accessoryDetail?.price}$</div>
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return <div>Page not found</div>;
};

export default ProductCardDetail;
