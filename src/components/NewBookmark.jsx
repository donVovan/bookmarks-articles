import {useEffect, useState} from "react";

function NewBookmark() {
    const [jsonData, setJsonData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:3002/test');
        const data = await response.json();
        setJsonData(data);
    }

    function renderData() {
        return <ul>
            {jsonData.map(item => (
                <li key={item._id}>
                    <a href={item.link}>{item.tittle}</a>
                </li>
            ))}
        </ul>
    }

   // console.log(jsonData)

/*    useEffect(() => {
        //let res = typeof jsonData
        //console.log(res)
    }, [jsonData]);*/

    return <div>
        {renderData()}
    </div>
}

export default NewBookmark;