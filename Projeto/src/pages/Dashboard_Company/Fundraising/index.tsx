import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { BsSearch } from "react-icons/bs";

import { api } from "../../../services/api";
import { iPosts } from "../types";
import Navbar from "../../../components/Header";
import ButtonSmall from "../../../styles/buttonSmall";
import Main from "./style";
import CardFundraising from "../../../components/Cards/PostCompany/Fundraising";

const PageFundraising = () => {
  const [posts, setPosts] = useState([] as iPosts[]);

  useEffect(() => {
    async function getListPosts() {
      try {
        const response = await api.get<iPosts[]>("/post");
        setPosts(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.message);
        }

        console.log(error);
      }
    }

    getListPosts();
  }, []);

  return (
    <>
      <Navbar mode="private" />
      <Main>
        <div>
          <h1>Campanhas de arrecadações</h1>

          <div>
            <div>
              <input type="text" placeholder="Pesquisar participante" />
              <BsSearch />
            </div>
            <ButtonSmall>Adcionar evento</ButtonSmall>
          </div>
        </div>

        <section>
          <ul>
            {posts.map((post) => (
              <CardFundraising key={post.id} post={post} />
            ))}
          </ul>
        </section>
      </Main>
    </>
  );
};

export default PageFundraising;