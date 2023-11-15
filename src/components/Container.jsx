import {MyContext} from "./MyContext.jsx";
import SliderComponent from "./SliderComponent.jsx";

function Container() {
    return (
        <>
            <MyContext.Provider>
                <SliderComponent/>
            </MyContext.Provider>
        </>
    )
}

export default Container;