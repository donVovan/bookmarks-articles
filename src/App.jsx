import './App.css'
import Container from "./components/Container.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {


    return (
        <>
            <div className="content">
            <Header/>
            <Container/>
            </div>
            <Footer/>
        </>
    )
}

export default App
