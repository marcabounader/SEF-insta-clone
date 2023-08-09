import {BrowserRouter, Route,Routes} from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>  
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='*' element={<h1>404 - Page does not exist</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
