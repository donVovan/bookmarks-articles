import SliderComponent from "./slider/SliderComponent.jsx";
import {useEffect, useState} from "react";
import {MyContext} from "./MyContext.jsx";

function _Container() {
    const [jsonData, setJsonData] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [serverResponse, setServerResponse] = useState(null);
    /*const [newListItems, setNewListItems] = useState([
        {
            _id: '655618eb286e546624a0380f',
            tittle:"Тестовый скрипт для проверки NodeJS хостинга",
            link: "https://code.mu/ru/javascript/nodejs/book/hosting/basis/test-script/",
            status: false
        },
        {
            _id: '655618eb286e546624a03810',
            tittle:"Тестовые коллекции для следующих уроков",
            link: "https://code.mu/ru/javascript/nodejs/book/mongo/basis/test-collections/",
            status: false
        },
        {
            _id: '655618eb286e546624a03811',
            tittle:"Параметры маршрутов в Express",
            link: "https://code.mu/ru/javascript/nodejs/book/express/routing/params/",
            status: false
        },
        {
            _id: '655618eb286e546624a03812',
            tittle:"Установка соединения к MongoDB",
            link: "https://code.mu/ru/javascript/nodejs/book/mongo/basis/connection-establishing/",
            status: false
        },
        {
            _id: '655618eb286e546624a03813',
            tittle:"Статичные файлы домена через Nginx на VPS сервере",
            link: "https://code.mu/ru/javascript/nodejs/book/hosting/domains/static-files/",
            status: false
        },
        {
            _id: '655618eb286e546624a03814',
            tittle:"География стран",
            link: "http://geo.vladimirblinov.ru/",
            status: false
        }
    ]);*/
    const [newListItems, setNewListItems] = useState([])
    const [oldListItems, setOldListItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/test/');
        const data = await response.json();
        setJsonData(data);
        setNewListItems(data);
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

    function handleMoveToOld() {
        const updatedNewListItems = newListItems.filter(item => !item.checked);
        const checkedItems = newListItems.filter(item => item.checked);
        setNewListItems(updatedNewListItems);
        setOldListItems([...oldListItems, ...checkedItems]);
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
        //setJsonData(data);
        setServerResponse(data);
    }


    function renderDataNew() {
        if (jsonData) {
            console.log(newListItems)
            return (
                <ul>
                    {jsonData.map((item, index) => (
                        item.status && (
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

    function renderDataOld() {
        if (jsonData) {
            return (
                <ul>
                    {jsonData.map((item, index) => (
                        item.status === false && (
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
        renderDataNew: renderDataNew,
        renderDataOld: renderDataOld

    }

    return (
        <>
            <MyContext.Provider value={functions}>
                <SliderComponent/>
            </MyContext.Provider>
            {/*<div>
                <button onClick={handleButtonClick}>Отправить на сервер</button>
            </div>*/}
        </>
    )
}

export default _Container;