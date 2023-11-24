import {useContext} from "react";
import {MyContext} from "./MyContext.jsx";

function NewBookmark() {
    const functions = useContext(MyContext);


    // console.log(jsonData)

    /*    useEffect(() => {
            //let res = typeof jsonData
            //console.log(res)
        }, [jsonData]);*/

    return <div>
        {functions.renderDataNew()}
    </div>
}

export default NewBookmark;