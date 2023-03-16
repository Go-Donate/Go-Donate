import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiImage, FiLock, FiMail, FiMapPin, FiUser } from "react-icons/fi";
import { IRegisterFormValues } from "../../providers/UserContext/@Types";
import { UserContext } from "../../providers/UserContext/UserContextInitial";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as S from "./style";
import { Link } from "react-router-dom";
import Charity from "../../assets/Charity-rafiki.svg";
import Logo from "../../assets/Logo.svg"
import Loading from "../Loading";

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),

  email: yup
    .string()
    .required("Email obrigatório")
    .email("O email digitado é invalido"),

  password: yup
    .string()
    .required("Senha obrigatória")
    .matches(/(\d)/, "Deve conter ao menos 1 número")
    .matches(/.{8,}/, "Deve conter no mínimo 8 caracteres"),

  confirmpassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf(
      [yup.ref("password")],
      "Confirmação de senha deve ser igual a senha"
    ),

  city: yup.string().required("Sua cidade"),

  state: yup.string().required("Seu estado"),

  isCompany: yup.string().required("Selecione uma opção"),

  image: yup.string().url().required("Carregue uma imagem"),

  background: yup.string().url().required("Carregue uma Thumb"),
});

const RegisterForm = () => {
  const { userRegister, loading } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<IRegisterFormValues> = async (data) => {
    if (data.isCompany == 'company') {
      const newData = { ...data, isCompany: true }; 
      console.log(newData);
      await userRegister(newData);
    } else {
      const newData = { ...data, isCompany: false };

      console.log(newData);
      await userRegister(newData);
    }
  };

  return (
    <S.MainContainerRegister>
      <section>
        <img src={Logo} />
        <img src={Charity} />
      </section>
      <S.ContainerSideForm>
        <h2>Cadastro</h2>
        <S.FormRegister onSubmit={handleSubmit(handleRegister)}>
          <span>{errors.name?.message}</span>
          <Input
            type="text"
            placeholder="Nome"
            {...register("name")}
            leftIcon={<FiUser />}
          />

          <span>{errors ? errors.email?.message : null}</span>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            leftIcon={<FiMail />}
          />

          <span>{errors.password?.message}</span>
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            leftIcon={<FiLock />}
          />

          <span>{errors.confirmpassword?.message}</span>
          <Input
            type="password"
            placeholder="Confirme sua Senha"
            {...register("confirmpassword")}
            leftIcon={<FiLock />}
          />

          <span>{errors.city?.message}</span>
          <Input
            type="text"
            placeholder="Cidade"
            {...register("city")}
            leftIcon={<FiMapPin />}
          />

          <span>{errors.state?.message}</span>
          <Input
            type="text"
            placeholder="Estado"
            {...register("state")}
            leftIcon={<FiMapPin />}
          />

          <span>{errors.isCompany?.message}</span>
          <select {...register("isCompany")}>
            <option value="">Selecionar</option>
            <option value="user">Usuário</option>
            <option value="company">Empresa</option>
          </select>

          <span>{errors.image?.message}</span>
          <Input
            type="url"
            placeholder="Imagem de Perfil"
            {...register("image")}
            leftIcon={<FiImage />}
          />

          <span>{errors.background?.message}</span>
          <Input
            type="url"
            placeholder="Thumb do Perfil"
            {...register("background")}
            leftIcon={<FiImage />}
          />

          <S.ButtonCadastrar type="submit" disabled={loading}>{loading ? <Loading /> : <span>Cadastrar</span>}</S.ButtonCadastrar>

          <S.LinkButton to="/login">Login</S.LinkButton>
        </S.FormRegister>
      </S.ContainerSideForm>
    </S.MainContainerRegister>
  );
};

export default RegisterForm;
