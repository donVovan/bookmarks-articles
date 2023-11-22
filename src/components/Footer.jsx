import {useEffect} from "react";

function Footer() {
    useEffect(() => {
        fetchReq()
    }, [])

    async function fetchReq() {
        let button = document.querySelector('button')
        button.addEventListener('click', function () {
            let promise = fetch('/handler/', {
                method: 'post',
                body: 'num1=1&num2=2',
                headers: {
                    'Conten-Type': 'application/x-www-form-urlencoded',
                },
            });
        });
    }

    return (
        <div>
            <button>Запрос</button>
        </div>
    )
}

export default Footer;