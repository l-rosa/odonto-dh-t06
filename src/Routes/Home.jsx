import { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";

const Home = () => {

  const [dentists, setDentists] = useState([]);
  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    getAllDentists();
  }, []);

  async function getAllDentists(){
    try {
      const response = await axios.get("https://dhodonto.ctdprojetos.com.br/dentista?")
      .then(res => {
        setDentists(res.data)
        //console.log(dentists[0].nome);
      })
      .catch(err => console.error(err));
    } catch (error) {
      alert("Erro ao tentar buscar Dentistas");
    }
  }

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentists.length == 0 ? <h1>Buscando Dentistas...</h1> : 
          dentists.map((dentist) =>(
            <Card nome={dentist.nome} sobrenome={dentist.sobrenome} matricula={dentist.matricula}/>
          ))
        }
      </div>
    </>
  );
};

export default Home;
