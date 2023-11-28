import SliderComponent from "./slider/SliderComponent.jsx";
import {MyContext} from "./MyContext";
import {useEffect, useState} from "react";
import axios from "axios";

function Container() {
    const [bookmark, setBookmark] = useState({
        link:'',
        title:'',
        status: true
    })
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3002/test/')
            .then(response => {
                setJsonData(response.data)
            })
            .catch(error => {
                console.error('Ошибка получения данных:', error)
            })
    }, [])


    function renderDataNew() {
        if (jsonData){
            return (
                <ul>
                    {jsonData.map((item) => (
                        item.status === true && (
                            <li key={item._id}>
                                <a href={item.link}>{item.title}</a>
                            </li>
                        )
                    ))}
                </ul>
            )
        }
    }



    async function handleAddBookmark(event) {
        event.preventDefault();

        axios.post('http://localhost:3002/add/', bookmark)
            .then(response => {
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