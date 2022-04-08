import '../App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Header} from './Header';
import {UserList} from './UserList';

const App = () => (
  <div className="ui container">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact element={<UserList/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);
export default App;
