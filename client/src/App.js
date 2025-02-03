import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LogPage from './pages/LogPage';

function App() {

  return (
   <>
      <Routes>
        <Route path='/log' element={<LogPage />} />
      </Routes>
   </>
  );
}

export default App;
