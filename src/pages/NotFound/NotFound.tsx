import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page page-workspace">
      <p className="page-kicker">404</p>
      <h1>Page not found</h1>
      <p>La ruta que intentaste abrir no existe.</p>
      <Link className="page-action" to="/">
        Back home
      </Link>
    </main>
  );
}

export default NotFound;
