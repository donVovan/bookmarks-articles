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

    console.log(jsonData)

/*    useEffect(() => {
        //let res = typeof jsonData
        //console.log(res)
    }, [jsonData]);*/

    return <div>
        {}
    </div>
}

export default NewBookmark;