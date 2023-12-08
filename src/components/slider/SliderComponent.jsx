import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import NewBookmark from "./newBookmark/NewBookmark.jsx";
import OldBookmark from "./oldBookmark/OldBookmark.jsx";
import AddBookmark from "./addBookmark/AddBookmark.jsx";

register();

function SliderComponent(){
    const swiperElRef = useRef(null);

    useEffect(() => {
        // listen for Swiper events using addEventListener
        swiperElRef.current.addEventListener('swiperprogress', (e) => {
            const [swiper, progress] = e.detail;
            console.log(progress);
        });

        swiperElRef.current.addEventListener('swiperslidechange', (e) => {
            console.log('slide changed');
        });
    }, []);

    return (
        <swiper-container
            ref={swiperElRef}
            slides-per-view="1"
            navigation="true"
            //pagination="true"
        >
            <swiper-slide>{<AddBookmark/>}</swiper-slide>
            <swiper-slide>{<NewBookmark/>}</swiper-slide>
            <swiper-slide>{<OldBookmark/>}</swiper-slide>



        </swiper-container>
    );
}

export default SliderComponent;