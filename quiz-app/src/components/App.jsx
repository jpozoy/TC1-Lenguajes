import '../styles/App.css'
//Dependencias de router
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Results from '../pages/Results'; 
import History from '../pages/History';

function App() {

  return (
    //Configuración de las rutas
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/juego' element={<Game/>}/>
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
