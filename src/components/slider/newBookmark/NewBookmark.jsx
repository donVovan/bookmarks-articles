import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";

function NewBookmark() {
    const functions = useContext(MyContext);

    return <div>
        <h4>Отметьте ссылки для переноса в архив</h4>
        {functions.renderData(true)}
    </div>
}

export default NewBookmark;