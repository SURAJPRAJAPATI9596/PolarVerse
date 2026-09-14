import useTheme from './hooks/useTheme';
import AppRoutes from './routes/AppRoutes';
function App() {
  const { dark, setDark } = useTheme();
  return (
    <>
      <AppRoutes dark={dark} setDark={setDark} />
    </>
  );
}

export default App;
