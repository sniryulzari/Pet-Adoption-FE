import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoginForm from "../components/LoginForm";

const LoginModal = (props) => {
  const { loginShow, handleLoginClose, handleShow, setIsLogin, setfirstName, setlastName } = props;

  return (
    <div>
      <Modal show={loginShow} >
        <LoginForm handleLoginClose={handleLoginClose} handleShow={handleShow} setIsLogin={setIsLogin} setfirstName={setfirstName} setlastName={setlastName}/>
      </Modal>
    </div>
  );
};

export default LoginModal;
