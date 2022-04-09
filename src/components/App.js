import '../App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Header} from './Header';
import {AddEdit} from './AddEdit';
import {UserList} from './UserList';
import {UsersContext, useUsers} from '../hooks/useUsers';

const App = () => {
  const contextValue = useUsers();

  return (
    <UsersContext.Provider value={contextValue}>
      <div className="ui container" style={{marginTop: '10px'}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" exact element={<UserList/>}/>
            <Route path="/add" exact element={<AddEdit/>}/>
            <Route path="/edit" exact element={<AddEdit/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </UsersContext.Provider>
  )
};
export default App;
