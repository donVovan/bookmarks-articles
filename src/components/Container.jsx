import SliderComponent from "./SliderComponent.jsx";
import {useEffect, useState} from "react";
import {MyContext} from "./MyContext.jsx";

function Container() {
    const [jsonData, setJsonData] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [serverResponse, setServerResponse] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/test/');
        const data = await response.json();
        setJsonData(data);
    }

    function handleStatus(index) {
        setJsonData(prevData => {
            const newData = [...prevData];
            newData[index].isChecked = !newData[index].isChecked;
            setCheckedItems(prevCheckedItems => ({
                ...prevCheckedItems,
                [newData[index]._id]: newData[index].isChecked
            }));
            return newData;
        })
    }


    async function handleButtonClick() {
        const dataToSend = {
            checkedItems
        }
        const response = await fetch('http://localhost:3002/data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        // здесь можно добавить обработку ответа, если необходимо
        const data = await response.json();
        setServerResponse(data.sum);
    }


    function renderData() {
        if (jsonData) {
            return (
                <ul>
                    {jsonData.map((item, index) => (
                        item.status === true && (
                        <li key={item._id}>
                            <a href={item.link}>{item.tittle}</a>
                            <input type="checkbox" checked={item.checked} onChange={() => handleStatus(index)}/> убрать
                            в архив
                        </li>
                        )
                    ))}
                </ul>
            )
        }

    }

    const functions = {
        renderData: renderData
    }

    return (
        <>
            <MyContext.Provider value={functions}>
                <SliderComponent/>
            </MyContext.Provider>
            <div>
                <button onClick={handleButtonClick}>Отправить на сервер</button>
            </div>
        </>
    )
}

export default Container;