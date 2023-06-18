import Mainpage from './pages/Mainpage'
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import Notice from './pages/Notice';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/notice' element={<Notice/>}/>
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;