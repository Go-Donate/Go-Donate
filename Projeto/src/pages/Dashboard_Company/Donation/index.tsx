import { useContext, useEffect, useState } from "react";
import { VscAdd, VscEdit } from "react-icons/vsc";
import Navbar from "../../../components/Header";
import DonationModal from "../../../components/Modal/Donation";
import NothingHere from "../../../components/NothingHere";
import { ModalContext } from "../../../providers/ModalContext";
import { PostContext } from "../../../providers/PostContext";
import { api } from "../../../services/api";
import {
  DonateInputSearch,
  DonationCart,
  DonationList,
  MainDonationContainer,
} from "./style";

const Donation = () => {
  const { posts, setPosts, donations } = useContext(PostContext);
  const { showModal, setShowModal, setSelectedCard } = useContext(ModalContext);
  const regExDate = /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/;

  useEffect(() => {
    const loadDonations = async () => {
      const id = localStorage.getItem("@UserId");
      const token = localStorage.getItem("@TOKEN");

      try {
        const res = await api.get(`/users/${id}?_embed=post`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data.post);

        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    loadDonations();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@userToken");

    const getDonations = async () => {
      try {
        const res = await api.get("/donation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        console.log(donations);
      } catch (error) {
        console.log(error);
      }
    };
    getDonations();
  }, []);


  const handleModal = () => {
    showModal == "open" ? setShowModal("false") : setShowModal("open");
  };

  return (
    <>
      {showModal == "open" && <DonationModal />}
      <Navbar mode="private" />
      <MainDonationContainer>
        <DonateInputSearch>
          <h2>Campanhas de doações</h2>
          <div>
            <button
              onClick={() => {
                const cardValue = {
                  title: "Criar novo evento",
                  date: new Date().toJSON(),
                  time: "08:00",
                  city: "",
                  state: "",
                  description: "",
                };

                setSelectedCard(cardValue);

                handleModal();
              }}
            >
              <VscAdd />
              Adicionar evento
            </button>
          </div>
        </DonateInputSearch>

        <DonationList>
          { posts.length > 0 ?
              posts.map((donation) => (
              <DonationCart key={donation.id}>
                <h3>{donation.title}</h3>
                <span>
                  {donation.date.replaceAll("-", "/").match(regExDate)} -{" "}
                  {donation.time}
                </span>
                <p>{donation.description}</p>
                <button
                  onClick={() => {
                    setSelectedCard(donation);
                    handleModal();
                  }}
                >
                  <VscEdit />
                  Alterar Evento
                </button>
              </DonationCart>
              )) : <NothingHere />
        }
        </DonationList>
      </MainDonationContainer>
    </>
  );
};

export default Donation;
