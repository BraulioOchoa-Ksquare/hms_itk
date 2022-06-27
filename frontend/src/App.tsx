import './App.css';
import {AppRoute} from './routes/AppRoute'
import { SideBar } from './components/SideBar';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppRoute/>
      <Outlet/>
    </div>
  );
}

export default App;
