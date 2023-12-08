import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";

function NewBookmark() {
    const functions = useContext(MyContext);

    return <div>
        {functions.renderData(true)}
    </div>
}

export default NewBookmark;