import { MemoryRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Login from '../views/pages/Login/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Switch>
    </Router>
  );
}
