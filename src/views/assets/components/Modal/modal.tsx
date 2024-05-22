import React, { useState, useEffect } from 'react';
import style from './modal.module.scss';
import { Button } from '@mui/material';
import { PaperPlaneTilt } from '@phosphor-icons/react';

interface IModal {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  btnText?: string;
  iconBtn?: React.ReactNode;
}

function Modal({
  open,
  onClose,
  children,
  className,
  btnText,
  iconBtn,
}: IModal) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <div className={show ? style.modal : style.modalHidden}>
      <div className={className ? className : style.modalContent}>
        {children}
        <div className={style.footer}>
          <Button
            color="primary"
            variant="contained"
            endIcon={iconBtn ? iconBtn : <PaperPlaneTilt weight="fill" />}
            onClick={handleClose}
          >
            {btnText ? btnText : 'Enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
