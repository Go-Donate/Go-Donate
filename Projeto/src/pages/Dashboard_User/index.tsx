import CardPerfil from "../../components/Cards/Perfil";
import { useContext, useEffect } from "react";
import { isAxiosError } from "axios";
import { api } from "../../services/api";
import { CardPostuser } from "../../components/Cards/PostUser";
import Navbar from "../../components/Header";
import EventUserContainer, {
  ListCardsUser,
  SearchContainerUser,
} from "./style";
import { PostContext } from "../../providers/PostContext";
import CardPerfilMobile from "../../components/Cards/Perfil/Mobile";
import NothingHere from "../../components/NothingHere";
import { toast } from "react-toastify";

const PageUser = () => {
  const { fundraising, setFundraising, setDonations } = useContext(PostContext);

  useEffect(() => {
    async function getListPostsService() {
      try {
        const token = localStorage.getItem("@TOKEN");
        const userId = localStorage.getItem("@UserId");

        const response = await api.get(`fundraisings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseDonation = await api.get(
          `users/${userId}?_embed=donation`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // toast.success('Você está participando do evento!')

        setDonations(responseDonation.data.donation);
        setFundraising(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.message);
          toast.warn('Você ja está participando!')
        }

        console.log(error);
      }
    }

    getListPostsService();
  }, []);

  return (
    <>
      <Navbar mode="private" />

      <CardPerfilMobile type="user"/>

      <SearchContainerUser>
        <h1>Principais Campanhas</h1>
      </SearchContainerUser>

      <EventUserContainer>
        <section>
          <ListCardsUser>
            { fundraising.length > 0 ?
              fundraising.map((post) => {
                return <CardPostuser key={post.id} post={post} />;
              }) : <NothingHere />
            }
          </ListCardsUser>
        </section>

        <aside>
          <CardPerfil type="user" />
        </aside>
      </EventUserContainer>
    </>
  );
};

export default PageUser;
