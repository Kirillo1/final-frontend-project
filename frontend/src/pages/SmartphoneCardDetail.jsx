import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useSmartphonesStore from "../store/useSmartphonesStore";
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

const SmartphoneCardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        smartphoneDetail,
        loading, error,
        fetchSmartphoneDetail,
        clearSmartphoneDetail,
        deleteSmartphoneById
    } = useSmartphonesStore(state => ({
        smartphoneDetail: state.smartphoneDetail,
        loading: state.loading,
        error: state.error,
        fetchSmartphoneDetail: state.fetchSmartphoneDetail,
        clearSmartphoneDetail: state.clearSmartphoneDetail,
        deleteSmartphoneById: state.deleteSmartphoneById
    }));

    const { user } = useAuth();

    useEffect(() => {
        fetchSmartphoneDetail(id);

        // Очистка состояния при размонтировании компонента
        return () => {
            clearSmartphoneDetail();
        };
    }, [id, fetchSmartphoneDetail, clearSmartphoneDetail]);

    const onDeleteButtonClick = async (id) => {
        try {
            await deleteSmartphoneById(id);
            navigate('/company_products');
        } catch (error) {
            console.error('Error deleting smartphone:', error);
        }
    };

    const onChangeButtonClick = (id) => {
        console.log(id);
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        return <div>Error: {error}</div>;
    };

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
                                    <Button
                                        onClick={() => onChangeButtonClick(smartphoneDetail.id)}
                                    >
                                        Изменить
                                    </Button>
                                    <Button><DeleteForeverTwoToneIcon
                                        sx={{ color: "#c1121f" }}
                                        onClick={() => onDeleteButtonClick(smartphoneDetail.id)}
                                    /></Button>
                                </ButtonGroup>
                            </div>
                        )}
                    </div>
                    <div className="basis-1/8">
                        <ImageList sx={{
                            width: 700,
                            height: 500
                        }} cols={3} rowHeight={200}>
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
};

export default SmartphoneCardDetail;
