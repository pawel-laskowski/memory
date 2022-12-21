import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

type ModalPropsType = {
  onClose: () => void;
  children: JSX.Element;
};

type BackdropPropsType = {
  onClose: () => void;
};

type ModalOverlayPropsType = {
  children: React.ReactElement;
};

const Backdrop = (props: BackdropPropsType) => {
  return (
    <div
      className="backdrop"
      onClick={props.onClose}
      data-testid="backdrop"
    ></div>
  );
};

const ModalOverlay = (props: ModalOverlayPropsType) => {
  return <div className="modal">{props.children}</div>;
};

export const Modal = (props: ModalPropsType) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
};
