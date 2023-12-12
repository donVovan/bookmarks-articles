function Header() {
    return <header className="header">
        <div className="header__inner">
            Проект представляет собой пример работы React. Это сервис, в котором пользователь может хранить закладки на
            статьи. Проект реализован с подключением к MongoDB, развернут на облачном сервере Timeweb (Ubuntu 22).
            Дополнительно самостоятельно установлены: Node, Nginx, MongoDB.
        </div>
    </header>
}

export default Header;