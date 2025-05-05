import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layouts/Layouts';
import Dashboard from './Pages/Dashboard/Dashboard';
import Leaves from './Pages/Leaves/Leaves';
import Attendance from './Pages/Attendance/Attendance';
import Notice from './Pages/Notice/Notice';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='leaves' element={<Leaves />} />
          <Route path='notice' element={<Notice />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
