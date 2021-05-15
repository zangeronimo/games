import { FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/auth";

import { Container } from "./styles";

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        alert("E-mail e Senha obrigatório");
      } else {
        await signIn({ email, password });

        history.push("/dashboard");
      }
    },
    [email, password, signIn, history]
  );

  return (
    <Container>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
};
