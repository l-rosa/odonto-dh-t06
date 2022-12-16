import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import axios from "axios";

const ScheduleForm = () => {
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    getAllDentists();
    getAllPatients();
    console.log(patients);
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

  async function getAllPatients(){
    try {
      const response = await axios.get("https://dhodonto.ctdprojetos.com.br/paciente?")
      .then(res => {
        setPatients(res.data.body)

        patients.forEach(p =>delete p.dataDeCadastro)
      })
      .catch(err => console.error(err));
    } catch (error) {
      alert("Erro ao tentar buscar Pacientes");
    }
  }

  async function postConsulta(p,d,a){
    //const id = window.location.pathname.split("/")[2];
    const token= localStorage.getItem("token");
    const header = {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    }
    const header2 = {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }

    const postData = JSON.stringify({
      paciente: {
        matricula: p,
      },
      dentista: {
        matricula: d,
      },
      dataHoraAgendamento: a,
    });

    const postData2 = {
      paciente: {
        matricula: p
      },
      dentista: {
        matricula: d
      },
      dataHoraAgendamento: a
    };

    try{
      const response = await axios.post(`https://dhodonto.ctdprojetos.com.br/consulta`, postData, header2)
      .then( res => {
        console.log(res);
      });      
    } catch (error) {
      alert("Erro ao cadastrar Consulta");
    }
  }

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    event.preventDefault();
    console.log(patients);
    console.log(dentists);

    console.log(event.target.dentist.value);
    console.log(event.target.patient.value);
    console.log(event.target.appointmentDate.value);

    postConsulta(
      event.target.patient.value,
      event.target.dentist.value,
      event.target.appointmentDate.value
    )

  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {/*Aqui deve ser feito um map para listar todos os dentistas*/
                dentists.map((dentist) =>
                <option key={dentist.matricula} value={dentist.matricula}>
                  {dentist.nome}
                </option>)}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient">
                {/*Aqui deve ser feito um map para listar todos os pacientes*/
                patients.map((patient) =>
                <option key={patient.matricula} value={patient.matricula}>
                  {patient.nome}
                </option>)}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
