import { Outlet } from 'react-router-dom';
import Footer from './../layout/Footer';
import Header from './../layout/Header';
const MainLayout = ({ dark, setDark }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* <Navbar dark={dark} setDark={setDark} user={user} />
      <Sidebar user={user} open={open} toggleMenu={toggleMenu} dark={dark} setDark={setDark} /> */}
      <Header dark={dark} setDark={setDark} />
      <main className="flex-1  relative overflow-y-hidden!">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
