import SliderComponent from "./SliderComponent.jsx";
import {useEffect, useState} from "react";
import {MyContext} from "./MyContext.jsx";

function Container() {
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/test/');
        const data = await response.json();
        setJsonData(data);
    }

    function renderData() {
        if (jsonData) {
            return <ul>
                {jsonData.map(item => (
                    <li key={item._id}>
                        <a href={item.link}>{item.tittle}</a>{item.status}
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