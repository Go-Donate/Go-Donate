import { useContext } from "react";
import { toast } from "react-toastify";
import { PostContext } from "../../../providers/PostContext";
import { UserContext } from "../../../providers/UserContext/UserContextInitial";
import { api } from "../../../services/api";
import ButtonMain from "../../../styles/buttonMain";
import StyleCardUser from "./style";
import { iCardPostsUser } from "./types";

export const CardPostuser = ({ post }: iCardPostsUser) => {
  const { donations, setDonations } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const addFundraisingUser = async () => {
    const alreadyParticipated = donations.some(
      (donation) => donation.fundraisingId === post.id
    );

    if (alreadyParticipated) {
      toast.warning("Você já está participando deste evento")
      return "";
    }

    const data = {
      userId: user?.id,
      fundraisingId: post.id,
      role: "Atribuir",
      participated: false,
      post: {
        ...post,
      },
      user: {
        ...user,
      },
    };

    const token = localStorage.getItem("@TOKEN");

    const response = await api.post("donation", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Evento adicionado as suas participações");
    setDonations([...donations, response.data]);
      
  };

  return (
    <>
      <StyleCardUser>
        <div>
          <img src={post.image} />
        </div>

        <div className="content">
          <h2>{post.name}</h2>
          <p>
            {post.city} {post.state}
          </p>
          <span>{post.date}</span>
        </div>

        <div>
          <p>{post.description}</p>
        </div>

        <ButtonMain
          onClick={addFundraisingUser}
          color="white"
          background="primary-color"
        >
          Participar do evento
        </ButtonMain>
      </StyleCardUser>
    </>
  );
};
