import AppRouter from "./router/AppRouter";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRouter />
    </>
  );
}

export default App;