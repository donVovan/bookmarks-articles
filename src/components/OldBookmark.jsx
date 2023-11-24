import {useContext} from "react";
import {MyContext} from "./MyContext.jsx";

function OldBookmark() {
    const functions = useContext(MyContext)
    return <div>
        {functions.renderDataOld()}
    </div>
}

export default OldBookmark;