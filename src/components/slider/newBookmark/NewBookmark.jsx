import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";

function NewBookmark() {
    const functions = useContext(MyContext);

    return <div>
        {functions.renderDataNew()}
    </div>
}

export default NewBookmark;