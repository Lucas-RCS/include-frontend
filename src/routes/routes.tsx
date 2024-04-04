import { MemoryRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Login from '../views/pages/Login/Login';
import Main from '../views/pages/Main/Main';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main' element={<Main />} />
      </Switch>
    </Router>
  );
}
