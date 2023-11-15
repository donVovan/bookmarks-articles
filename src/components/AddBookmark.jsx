import {useState, useEffect} from "react";
import data from '../data/bookmark.json'

function AddBookmark() {
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [jsonData, setJsonData] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/test');
        const data = await response.json();
        setJsonData(data);
    }

    useEffect(() => {
        //console.log(jsonData)
    }, [jsonData]);


    function handleAddBookmark() {
        const newBookmark = {link, title};

        const existingBookmarks = data.bookmarks || [];

        localStorage.setItem('bookmarks', JSON.stringify([...existingBookmarks, newBookmark]))

        setLink('');
        setTitle('');
    }


    return (
        <div>
            <form>
                <label>
                    Link: <input
                    type="text"
                    value={link}
                    onChange={event => setLink(event.target.value)}
                />
                </label>
            </form>
            <form>
                <label>
                    Tittle: <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                </label>
            </form>
            <button onClick={handleAddBookmark}>Add Bookmark</button>
        </div>
    )
}

export default AddBookmark;