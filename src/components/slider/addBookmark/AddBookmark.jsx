import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";


function AddBookmark() {

    const functions = useContext(MyContext);

    return (
        <>
            <h4>Для переноса в архив отметьте</h4>
            {functions.renderAddBookmark()}
        </>
    )
}

export default AddBookmark;