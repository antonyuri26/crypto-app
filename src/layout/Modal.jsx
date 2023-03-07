import ReactDom from "react-dom";
import { useContext } from "react";
import ThemeContext from "../store/theme-ctx";
import { lightTheme } from "../util/theme";

import styled from "styled-components";

const DivBackdrop = styled.div`
  // position: 'fixed',
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const DivModal = styled.div`
  // display: flex;
  // justify-content: center;
  position: fixed;
  top: 10vh;
  left: 35%;
  width: 25%;
  background-color: rgb(66, 66, 66);
  // padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
`;

const Backdrop = (props) => {
  return (
    <DivBackdrop
      onClick={props.onClose}
      style={{ position: "fixed" }}
    ></DivBackdrop>
  );
};

const ModalOverlay = (props) => {
  const ctx = useContext(ThemeContext);

  return (
    <DivModal
      style={{
        backgroundColor:
          ctx.theme === lightTheme ? "rgb(200, 200, 200)" : "rgb(66, 66, 66)",
      }}
    >
      {/* // <div
    //   className={classes.modal}
    //   style={{
    //     backgroundColor:
    //       ctx.theme === lightTheme ? "rgb(200, 200, 200)" : "rgb(66, 66, 66)",
    //   }}
    // > */}
      <div>{props.children}</div>
    </DivModal>
  );
};

const modalPlaceholderElement = document.getElementById("modal-placeholder");

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        modalPlaceholderElement
      )}

      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalPlaceholderElement
      )}
    </>
  );
};

export default Modal;
