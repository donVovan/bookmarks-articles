import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";

function NewBookmark() {
    const functions = useContext(MyContext);

    return <div>
        <h4>Для удаления из базы отметьте</h4>
        {functions.renderData(true)}
    </div>
}

export default NewBookmark;