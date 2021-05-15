import { Link } from "react-router-dom";
import { Container } from "./styles";

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <Link to="/hide-and-seek">Esconde Esconde</Link>
    </Container>
  );
};
