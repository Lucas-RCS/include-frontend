import { MemoryRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Main from '../views/pages/Main/Main';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Main />} />
      </Switch>
    </Router>
  );
}
