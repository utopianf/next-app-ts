import React from "react";
import style from "styles/doctor.module.scss";

type ErrorProps = {
    isOpen: boolean;
    handleClose: () => void;
}

export const ErrorModal: React.FC<ErrorProps> = ({isOpen, handleClose}) => {
    return (
        <>
            {isOpen && (
                <div className={style.error_overlay}>
                    <div className={style.error_content}>
                        <p className={style.error_text}>
                            名前とメッセージ以外は必須項目です。
                        </p>
                        <div className={style.close} onClick={handleClose}>
                            閉じる
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}