import SliderComponent from "./SliderComponent.jsx";
import {useEffect, useState} from "react";
import {MyContext} from "./MyContext.jsx";

function Container() {
    const [jsonData, setJsonData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [inputValues, setInputValues] = useState({value1: 0, value2: 0, value3: 0});
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
          return newData;
        })
    }

    function handleInputChange(event, inputName) {
        setInputValues(prevValues => ({
            ...prevValues,
            [inputName]: event.target.value
        }));
    }


    async function handleButtonClick() {
        const response = await fetch('http://localhost:3002/calc/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputValues),
        });
        // здесь можно добавить обработку ответа, если необходимо
        const data = await response.json();
        setServerResponse(data.sum);
    }


    function renderData() {
        if (jsonData) {
            return <ul>
                {jsonData.map((item, index) => (
                    <li key={item._id}>
                        <a href={item.link}>{item.tittle}</a>
                        <input type="checkbox" checked={item.checked} onChange={()=>handleStatus(index)}/> убрать в архив
                    </li>
                ))}
            </ul>
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
                <input type="number" value={inputValues.value1} onChange={(e) => handleInputChange(e, 'value1')} />
                <input type="number" value={inputValues.value2} onChange={(e) => handleInputChange(e, 'value2')} />
                <input type="number" value={inputValues.value3} onChange={(e) => handleInputChange(e, 'value3')} />
                <button onClick={handleButtonClick}>Отправить на сервер</button>
                <div>Ответ сервера: {serverResponse !== null ? serverResponse : ''}</div>
            </div>
        </>
    )
}

export default Container;