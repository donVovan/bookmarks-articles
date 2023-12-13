import {useContext} from "react";
import {MyContext} from "../../MyContext.jsx";


function AddBookmark() {

    const functions = useContext(MyContext);

    return (
        <>
            <h4>Добавьте ссылку и описание</h4>
            {functions.renderAddBookmark()}
        </>
    )
}

export default AddBookmark;