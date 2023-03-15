import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";
import { ILoginFormValues } from "../../providers/UserContext/@Types";
import { UserContext } from "../../providers/UserContext/UserContextInitial";
import Input from "../Input";
import * as S from "./style";
import RegisterImg from "../../assets/imgregister.svg";
import Logo from "../../assets/Logo.svg";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const { register, handleSubmit } = useForm<ILoginFormValues>();

  return (
    <S.MainContainerLogin>
      <section>
        <img src={RegisterImg} />
      </section>

      <S.ContainerSideForm>
        <img src={Logo} />
        <h2>Login</h2>
        <S.FormLogin onSubmit={handleSubmit(userLogin)}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            leftIcon={<FiMail />}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            leftIcon={<FiLock />}
          />

          <S.ButtonLogin type="submit">Login</S.ButtonLogin>

          <S.LinkCreateAccount to="/register">Cadastro</S.LinkCreateAccount>
        </S.FormLogin>
      </S.ContainerSideForm>
    </S.MainContainerLogin>
  );
};

export default LoginForm;
