import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SignupForm from "../components/SignupForm";

const SignupModal = (props) => {
  const { show, handleClose, handleLoginShow } = props;

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <SignupForm handleClose={handleClose} handleLoginShow={handleLoginShow}/>
      </Modal>
    </div>
  );
};

export default SignupModal;
