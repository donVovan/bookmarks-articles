import {useState} from "react";
import axios from 'axios';

function AddBookmark() {
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(true)

    //const [jsonData, setJsonData] = useState('');

    async function handleAddBookmark(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/add/', {
                link: link,
                title: title,
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


    /*async function handleAddBookmark() {

        const newDataSend = {
            link, title, status
        }
        const response = await fetch('http://localhost:3002/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDataSend)
        });


    }

    console.log(link)
    console.log(title)*/

    return (
        <div>
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
    )
}

export default AddBookmark;