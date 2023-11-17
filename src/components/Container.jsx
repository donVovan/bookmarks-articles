import SliderComponent from "./SliderComponent.jsx";
import {useEffect, useState} from "react";
import {MyContext} from "./MyContext.jsx";

function Container() {
    const [jsonData, setJsonData] = useState(null);
    const [checked, setChecked] = useState(false);

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

    function renderData() {
        if (jsonData) {
            return <ul>
                {jsonData.map(item => (
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
        </>
    )
}

export default Container;