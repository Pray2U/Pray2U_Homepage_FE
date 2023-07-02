import Mainpage from './pages/Mainpage'
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import Notice from './pages/Notice';
import CreateNotice from './pages/CreateNotice';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowNotice from './pages/ShowNotice';
import EditNotice from './pages/EditNotice';



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
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;