import { useRef, useEffect } from "react";

/**
 * Компонент изображения с ленивой загрузкой и асинхронным декодированием.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.src - URL изображения.
 * @param {string} props.className - Класс CSS для изображения.
 * @param {string} props.alt - Альтернативный текст для изображения.
 * @param {boolean} props.isCritical - Флаг для критичных изображений.
 * @returns {JSX.Element} Элемент JSX.
 */
const Image = ({ src, className, alt, isCritical }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const startTime = performance?.now(); // Время начала загрузки изображения

        const loadImage = async () => {
            try {
                if (imgRef.current) {
                    imgRef.current.loading = isCritical ? "eager" : "lazy"; // Ленивая или мгновенная загрузка изображения
                    imgRef.current.decoding = "async"; // Асинхронное декодирование
                    await imgRef?.current?.decode(); // Декодируем изображение асинхронно
                }
            } catch (error) {
                console.error("Error decoding image:", error);
            } finally {
                const endTime = performance?.now(); // Время окончания загрузки изображения
                console.log(`Image loading time: ${endTime - startTime} ms`);
            }
        };

        loadImage();
    }, [src, isCritical]); // Обновляем загрузку при изменении src или isCritical

    return (
        <img
            className={className}
            ref={imgRef}
            src={src}
            alt={alt}
            loading={isCritical ? "eager" : "lazy"}
            decoding="async"
            width="100%"
            height="auto"
        />
    );
};

export default Image;
