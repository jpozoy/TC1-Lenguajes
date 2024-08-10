import { useEffect, useState } from 'react'
import '../styles/App.css'
//Se importa axios para peticiones
import axios from "axios"
//Dependencias de router
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';

function App() {
  //Para poder renderizar el contenido se crear un array useStae
  const [array, setArray] = useState([]);

  //En esta parte se explica como hacer el fetchAPI

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api")
    setArray(response.data.fruits)
    console.log(response.data.fruits)
  }

  useEffect(() => {
    fetchAPI();
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/juego' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
