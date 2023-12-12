import SliderComponent from "./slider/SliderComponent.jsx";
import {MyContext} from "./MyContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";

function Container() {
    const [bookmark, setBookmark] = useState({ // определение состояния bookmark и функции для его обновления
        link: '',
        title: '',
        status: true
    })
    const [jsonData, setJsonData] = useState(null); //определение состояния jsonData (JSON-данные) и функции для его обновления
    const [deletedItems, setDeletedItems] = useState([]); // определение состояния для хранения удаленных элементов

    console.log(bookmark)
    useEffect(() => { // эффект, который срабатывает после первого рендера компонента
        axios.get('http://localhost:3002/test/') // выполнение GET-запроса к серверу для получения данных
            .then(response => { // обработка успешного ответа от сервера
                setJsonData(response.data) // обновление состояния jsonData данными из ответа
            })
            .catch(error => {
                console.error('Ошибка получения данных:', error)
            })
    }, [])// зависимость пустая, поэтому эффект срабатывает только один раз после монтирования компонента

    function handleStatus(index) { // функция для обновления статуса элемента по индексу
        const updatedData = jsonData.map((item, i) => { // обновление данных: создание нового массива с обновленным элементом
            if (i === index) { // если индекс соответствует переданному
                return {...item, status: false}; // возвращаем обновлённый элемент со статусом false
            }
            return item; // иначе возвращаем элемент без изменений
        });
        setJsonData(updatedData); // обновление состояния jsonData новыми данными
        console.log(jsonData)
    }

    function removeItem(index) {
        const deletedItem = jsonData[index]; // сохраняем ссылку на удаленный элемент
        setDeletedItems(prev => [...prev, deletedItem]); // добавляем удаленный элемент в состояние deletedItems
        const updatedData = jsonData.filter((item, i) => i !== index); // фильтрация данных для убирания удаленного элемента
        setJsonData(updatedData); // обновление состояния jsonData новыми данными
    }

    async function handleButtonClickMove() { // асинхронная функция для обработки клика по кнопке
        try {
            const response = await axios.post('http://localhost:3002/data/', jsonData); // отправка POST-запроса с данными на сервер
            console.log('Данные успешно отправлены на сервер:', response.data);
            // Логика обновления UI или другие действия после успешной отправки
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
            // Логика обработки ошибки, если необходимо
        }
    }

    async function handleButtonClickDel() {
        try {
            await Promise.all(deletedItems.map(async (item) => {
                const response = await axios.delete(`http://localhost:3002/delete/${item._id}`); // отправка DELETE-запроса для удаления элемента по ID на сервер
                console.log('Элемент успешно удален с сервера:', response.data);
            }));
            setDeletedItems([]);// очищаем состояние deletedItems после успешного удаления
        } catch (error) {
            console.error('Ошибка при удалении данных на сервере:', error);
            // Логика обработки ошибки, если необходимо
        }
    }

    function renderData(desiredStatus) {
        if (jsonData) {
            return (
                <>
                    <ul>
                        {jsonData.map((item, index) => {
                            if (item.status === desiredStatus) {
                                return (
                                    <li key={item._id}>
                                        <a href={item.link}>{item.title}</a>
                                        {desiredStatus ? (
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() => handleStatus(index)}
                                            />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() => removeItem(index)}
                                            />
                                        )}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                    <button onClick={desiredStatus ? handleButtonClickMove : handleButtonClickDel}>
                        Сохранить изменения
                    </button>
                </>
            );
        }
    }


    async function handleAddBookmark(event) { // асинхронная функция для добавления закладки
        event.preventDefault(); // предотвращение действия по умолчанию при отправке формы
        let newBookmark = {...bookmark};
        if (!newBookmark._id) {
            newBookmark._id = nanoid(4)
        }
        try {
            const response = await axios.post('http://localhost:3002/add/', bookmark); // отправка POST-запроса с данными о закаладке на сервер
            console.log('Данные успешно отправлены на сервер:', response.data);
            const updatedData = jsonData ? [...jsonData, newBookmark] : [newBookmark]; // добавляем новую закладку к существующим данным, или создаем новый массив, если данных ещё нет
            setJsonData(updatedData); // обновление состояния jsonData новыми данными
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
            // Логика обработки ошибки, если необходимо
        }
    }

    function renderAddBookmark() {
        return <div className="addBookmark">
            <form onSubmit={handleAddBookmark}>
                <div>
                    <span>Ссылка:</span> <input
                    className="inp_text"
                    type="text"
                    value={bookmark.link}
                    onChange={event => setBookmark({...bookmark, link: event.target.value})}
                    placeholder="Ссылка"
                />
                    <span>Описание:</span> <input
                    className="inp_text"
                    type="text"
                    value={bookmark.title}
                    onChange={event => setBookmark({...bookmark, title: event.target.value})}
                    placeholder="Описание"
                /></div>
                <div>
                    <button type="submit">Добавить закладку</button>
                </div>
            </form>

        </div>
    }

    const functions = {
        renderAddBookmark: renderAddBookmark,
        renderData: renderData
    }
    return (
        <>
            <MyContext.Provider value={functions}>
                <SliderComponent/>
            </MyContext.Provider>
        </>
    )
}

export default Container;