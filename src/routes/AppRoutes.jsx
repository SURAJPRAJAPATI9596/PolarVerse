import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/mainLayout';
import Home from './../features/home/pages/Home';
import Expeditions from '../features/expeditions/pages/Expeditions';
import Reports from './../features/reports/pages/Reports';
import Datasets from './../features/datasets/pages/DataSet';
const AppRoutes = ({ dark, setDark }) => {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout dark={dark} setDark={setDark} />}>
        {/* define all route shere  */}
        <Route path="/" element={<Home dark={dark} />} />
        <Route path="/expeditions" element={<Expeditions dark={dark} />} />
        <Route path="/reports" element={<Reports dark={dark} />} />
        <Route path="/datasets" element={<Datasets dark={dark} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
