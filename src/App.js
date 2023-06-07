import Mainpage from './pages/Mainpage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
