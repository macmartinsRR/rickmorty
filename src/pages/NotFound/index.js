import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
