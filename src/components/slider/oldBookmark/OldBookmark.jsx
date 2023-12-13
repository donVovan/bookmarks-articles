import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";

function OldBookmark() {
    const functions = useContext(MyContext)
    return <div>
        <h4>Отметьте ссылки для удаления из базы</h4>
        {functions.renderData(false)}
    </div>
}

export default OldBookmark;