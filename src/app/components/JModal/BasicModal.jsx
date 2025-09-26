import { Modal, Button } from "react-bootstrap";

const BasicModal = ({ title, bodyText, show, handleClose, handleAccept, isStaticModal, 
                    isInforModal, isRedColor, language, closeText, acceptText, ...props }) => {;
    return (
        <Modal show={show} onHide={handleClose} backprop={isStaticModal ? "static" : ""} {...props}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: isRedColor ? "red" : "black" }}>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {closeText ? closeText : "Close"}
                </Button>
                {isInforModal ? null : (
                    <Button variant="primary" onClick={handleAccept}>
                        {acceptText ? acceptText : "Accept"}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default BasicModal;
