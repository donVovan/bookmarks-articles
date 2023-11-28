import SliderComponent from "./slider/SliderComponent.jsx";
import {MyContext} from "./MyContext";
import {useState} from "react";
import axios from "axios";

function Container() {
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(true)

    async function handleAddBookmark(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/add/', {
                title: title,
                link: link,
                status: status
            })
            console.log('Успешно отправлено на сервер:', response.data)

            setLink('');
            setTitle('');
            setStatus(true)
        } catch (error) {
            console.error('Ошибка при отправке на сервер:', error)
        }
    }

    function renderAddBookmark() {
        return <div>
            <form onSubmit={handleAddBookmark}>
                <label>
                    Link: <input
                    type="text"
                    value={link}
                    onChange={event => setLink(event.target.value)}
                />
                </label>

                <label>
                    Tittle: <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                </label>
                <button type="submit">Add Bookmark</button>
            </form>

        </div>
    }

    const functions = {
        renderAddBookmark: renderAddBookmark
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