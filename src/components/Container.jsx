import SliderComponent from "./slider/SliderComponent.jsx";
import {MyContext} from "./MyContext";
import {useEffect, useState} from "react";
import axios from "axios";

function Container() {
    const [bookmark, setBookmark] = useState({ // определение состояния bookmark и функции для его обновления
        link:'',
        title:'',
        status: true
    })
    const [jsonData, setJsonData] = useState(null); //определение состояния jsonData (JSON-данные) и функции для его обновления

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
            if (i === index){ // если индекс соответствует переданному
                return {...item, status: false}; // возвращаем обновлённый элемент со статусом false
            }
            return item; // иначе возвращаем элемент без изменений
        });
        setJsonData(updatedData); // обновление состояния jsonData новыми данными
        console.log(jsonData)
    }

    async function handleButtonClick() { // асинхронная функция для обработки клика по кнопке
        try {
            const response = await axios.post('http://localhost:3002/data/', jsonData); // отправка POST-запроса с данными на сервер
            console.log('Данные успешно отправлены на сервер:', response.data);
            // Логика обновления UI или другие действия после успешной отправки
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
            // Логика обработки ошибки, если необходимо
        }
    }


    function renderDataNew() { // функция для отображения новых закладок
        if (jsonData){
            return (
                <>
                <ul>
                    {jsonData.map((item, index) => ( //маппинг данных для отображения в виде списка
                        item.status && ( // если статус равен true
                            //создаем элемент списка с уникальным ключом
                            <li key={item._id}>
                                <a href={item.link}>{item.title}</a>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleStatus(index)} // обработчик изменения состояния при клике на чекбокс
                                />
                            </li>
                        )
                        )
                    )}
                </ul>
                    <button onClick={handleButtonClick}>Сохранить изменения</button>
                </>
            )
        }
    }



    async function handleAddBookmark(event) { // асинхронная функция для добавления закладки
        event.preventDefault(); // предотвращение действия по умолчанию при отправке формы

        axios.post('http://localhost:3002/add/', bookmark) // отправка POST-запроса с данными о закладке на сервер
            .then(response => { // обработка успешного ответа от сервера
                console.log('Данные успешно отправлены на сервер:', response.data);
                // Опционально: обновление состояния или выполнение других действий после отправки
            })
            .catch(error => {
                console.error('Ошибка при отправке данных на сервер:', error)
            })
    }

    function renderAddBookmark() {
        return <div>
            <form onSubmit={handleAddBookmark}>

                    Link: <input
                    type="text"
                    value={bookmark.link}
                    onChange={event => setBookmark({...bookmark, link: event.target.value})}
                    placeholder="Ссылка"
                />

                    title: <input
                    type="text"
                    value={bookmark.title}
                    onChange={event => setBookmark({...bookmark, title: event.target.value})}
                    placeholder="Описание"
                />

                <button type="submit">Add Bookmark</button>
            </form>

        </div>
    }

    const functions = {
        renderAddBookmark: renderAddBookmark,
        renderDataNew: renderDataNew
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