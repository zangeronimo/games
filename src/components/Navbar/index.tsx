import { Link } from "react-router-dom";
import { FaDAndD } from "react-icons/fa";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <FaDAndD size={64} /> Dragon's Games
        </Link>
      </div>
    </nav>
  );
};
