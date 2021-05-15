import { FaGamepad, FaHashtag } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { HideAndSeek } from "../HideAndSeek";
import { Hash } from "../Hash";
import { Container } from "./styles";

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <button
        className="btn btn-outlint-primary nav-link"
        data-bs-toggle="modal"
        data-bs-target="#hideAndSeek"
      >
        <FaGamepad size={92} />
        <p>Esconde Esconde</p>
      </button>

      <button
        className="btn btn-outlint-primary nav-link"
        data-bs-toggle="modal"
        data-bs-target="#hash"
      >
        <FaHashtag size={92} />
        <p>Jogo da Velha</p>
      </button>

      <Modal id="hideAndSeek" title="Esconde Esconde">
        <HideAndSeek />
      </Modal>

      <Modal id="hash" title="Jogo da Velha">
        <Hash />
      </Modal>
    </Container>
  );
};
