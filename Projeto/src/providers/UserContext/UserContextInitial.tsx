import { isAxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loadingg } from "../../components/Loading/style";
import { api } from "../../services/api";
import {
  IDefaultProviderProps,
  ILoginFormValues,
  IRegisterFormValues,
  IUser,
  IUserContext,
} from "./@Types";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      setLoading(true);
      const response = await toast.promise(api.post("register", formData), {
        pending: "Carregando...",
        success: "Cadastro realizado",
        error: "Ops! algo deu errado!",
      });
      console.log(response);
      localStorage.setItem("@TOKEN", response.data.accessToken);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      setLoading(true);
      const response = await toast.promise(api.post("login", formData), {
        pending: "Carregando...",
        success: "Login realizado com sucesso",
      });
      const { isCompany } = response.data.user;
      setUser(response.data.user);

      localStorage.setItem("@TOKEN", response.data.accessToken);
      localStorage.setItem("@UserId", response.data.user.id);

      isCompany ? navigate("/company") : navigate("/user");
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        error.response?.data == "Incorrect password"
          ? toast.error("Senha ou email inválidos")
          : toast.error("Ops! Algo deu errado");
      }
    } finally {
      setLoading(false)
    }
  };

  type AutoLoginFunc = () => void;

  const userAutoLogin: AutoLoginFunc = async () => {
    const token: string | null = localStorage.getItem("@TOKEN");
    const id: string | null = localStorage.getItem("@UserId");
    const userLocation = window.location.pathname;

    if (token) {
      try {
        const response = await api.get(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isCompany) {
          userLocation.includes("company")
            ? navigate(userLocation)
            : navigate("/company");
        }

        if (!response.data.isCompany) {
          userLocation.includes("user")
            ? navigate(userLocation)
            : navigate("/user");
        }

        setUser(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          localStorage.clear();
          navigate("/login");
        }

        console.log(error);
      }
    }
  };

  useEffect(() => {
    userAutoLogin();
  }, []);

  const userLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        userRegister,
        userLogin,
        userLogout,
        navigate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
