import styles from "./Form.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const [login, setLogin] = useState({
    username: "",
    pass: "",
    token: ""
  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();
    //localStorage.setItem("token", "bearer 1");
    console.log(login);
    const req = {username: login.username, password: login.pass};
    console.log(req);
    axios.post("https://dhodonto.ctdprojetos.com.br/auth", req)
    .then(res => {
      console.log(res);
      setLogin({...login, token: res.data.token});
      console.log(login);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    })
    .catch(err => console.error(err))
      
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              onChange={(e)=> setLogin({...login, username: e.target.value})}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={(e)=> setLogin({...login, pass: e.target.value})}
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
