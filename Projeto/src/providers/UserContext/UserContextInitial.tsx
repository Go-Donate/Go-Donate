import { isAxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    const idToastLoading = toast.loading("Por favor aguarde!");

    try {
      setLoading(true);
      const response = await api.post("register", formData);

      toast.update(idToastLoading, {
        render: "Cadrasto realizado com sucesso.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      localStorage.setItem("@TOKEN", response.data.accessToken);
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        error.response?.data == "Email already exists"
          ? toast.update(idToastLoading, {
              render: "Esse email já está cadrastado!",
              type: "warning",
              isLoading: false,
              autoClose: 3000,
              closeOnClick: true,
            })
          : toast.update(idToastLoading, {
              render: "Ops! Algo deu errado.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
              closeOnClick: true,
            });
      }
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    const idToastLoading = toast.loading("Por favor aguarde!");

    try {
      setLoading(true);
      const response = await api.post("login", formData);
      const { isCompany } = response.data.user;
      setUser(response.data.user);

      toast.update(idToastLoading, {
        render: "Login realizado com sucesso.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      localStorage.setItem("@TOKEN", response.data.accessToken);
      localStorage.setItem("@UserId", response.data.user.id);

      isCompany ? navigate("/company") : navigate("/user");
    } catch (error) {
      if (isAxiosError(error)) {
        error.response?.data == "Incorrect password" || "Cannot find user"
          ? toast.update(idToastLoading, {
              render: "Senha ou email errado!",
              type: "warning",
              isLoading: false,
              autoClose: 3000,
              closeOnClick: true,
            })
          : toast.update(idToastLoading, {
              render: "Ops! Algo deu errado.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
              closeOnClick: true,
            });
      }
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
    toast.success(`Agradecemos e muito pela suas contribuições ${user?.name}`);
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
