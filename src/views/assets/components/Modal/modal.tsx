import React, { useState, useEffect } from 'react';
import style from './modal.module.scss';
import { Button } from '@mui/material';
import { PaperPlaneTilt } from '@phosphor-icons/react';

interface IModal {
  closeButton?: boolean;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

function Modal({
  open,
  onClose,
  children,
  closeButton,
  className,
}: IModal) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const endRegistration = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className={show ? style.modal : style.modalHidden}>
      <div className={className ? className : style.modalContent}>
        {closeButton && (
          <span className={style.close} onClick={handleClose}>
            &times;
          </span>
        )}
        {children}

        {!closeButton && (
          <div className={style.footer}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<PaperPlaneTilt weight="fill" />}
              onClick={endRegistration}
            >
              Finalizar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
