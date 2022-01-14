import styled from 'styled-components';

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  width: 400px;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 32px;
`;

const Modal = ({ onClick, children }) => {
  return (
    <ModalOuter onClick={onClick}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </ModalInner>
    </ModalOuter>
  );
};

export default Modal;
