import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";


function AddBookmark() {

    const functions = useContext(MyContext);

    return (
        <>
            {functions.renderAddBookmark()}
        </>
    )
}

export default AddBookmark;