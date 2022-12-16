import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import axios from "axios";
//import api from "../../services/api";

const DetailCard = () => {

  const [carddentist, setCardDentist] = useState({
    nome: "",
    sobrenome: "",
    usuario: ""
  })

  const id2 = window.location.pathname.split("/")[2];

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    getDentist();
  }, []);

  async function getDentist(){
    try {
      const token= localStorage.getItem("token");
      const id= localStorage.getItem("id");
      const header = {
        headers: { Authorization: `Bearer ${token}`}
      }
      console.log(id2);
      const response = await axios.get(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${id2}`)
      .then( res => {
        console.log(res);
        setCardDentist({...carddentist, nome: res.data.nome, sobrenome: res.data.sobrenome, usuario: res.data.usuario.username});
        //setCardDentist({...carddentist, usuario: res.data.usuario.username});
        console.log(carddentist);
      });      
    } catch (error) {
      alert("Erro ao tentar buscar Dentista");
    }
  }

  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {carddentist.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {carddentist.nome}</li>
              <li className="list-group-item">
                Sobrenome: {carddentist.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {carddentist.usuario}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
