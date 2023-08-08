import {BrowserRouter, Route,Routes} from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='*' element={<h1>404 - Page does not exist</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
