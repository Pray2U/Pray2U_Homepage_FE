import Mainpage from './pages/Mainpage'
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import Notice from './pages/Notice';
import CreateNotice from './pages/CreateNotice';
import ShowNotice from './pages/ShowNotice';
import EditNotice from './pages/EditNotice';
import TilPage from './pages/Tilpage';
import CreateTil from './pages/CreateTil';
import Eventpage from './pages/Eventpage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/notice/list' element={<Notice/>}/>
          <Route path='/notice/create' element={<CreateNotice/>}/>
          <Route path='/notice/detail/:id' element={<ShowNotice/>}/>
          <Route path='/notice/edit/' element={<EditNotice/>}/>
          <Route path='/til/' element={<TilPage/>}/>
          <Route path='/til/create' element={<CreateTil/>}/>
          <Route path='/til/edit/:id' element={<CreateTil/>}/>
          <Route path='event' element={<Eventpage/>}/>
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;