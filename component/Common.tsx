import React from "react";
// @ts-ignore
import layout from "../styles/common_parts.module.scss";
import Head from "next/head";
// @ts-ignore
import style from "../styles/message.module.scss"


export const Header = ({title}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel={"icon"} type={"image/png"} href={"/image/favicon.png"}/>
            </Head>
            <header className={style.header}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={"/image/header.png"}
                    alt={"application logo"}
                    className={style.top_logo}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={"/image/desktop_header.png"} alt={"application logo"} className={style.pc_top_logo}/>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={"/image/ipad_header.png"} alt={"application logo"} className={style.ipad_top_logo}/>
            </header>
        </>
    );
};

export const Footer = () => {
    return (
        <footer className={layout.footer3}>
            <nav>
                <a href="https://www.reasonwhy.jp/" target={"_blank"} rel="noreferrer">
                    運営会社
                </a>
                <span> | </span>
                <a href="https://www.reasonwhy.jp/privacy-policy/" target={"_blank"} rel="noreferrer">
                    プライバシーポリシー
                </a>
                <span> | </span>
                <a href={"/policy"} target={"_blank"} rel="noreferrer">
                    利用規約
                </a>
                <span> | </span>
                <a href={"/law"} target={"_blank"} rel="noreferrer">
                    情報の取り扱い
                </a>
                <span> | </span>
                <a href={"https://www.reasonwhy.jp/inquiry/"} target={"_blank"} rel="noreferrer">
                    お問い合わせ先
                </a>
            </nav>
            <div>© ReasonWhy Inc. All Rights Reserved.</div>
        </footer>
    );
};

export const RadioButtonList = ({label, values, name, className, subClassName, onChange}) => {
    return (
        <div className={className}>
            <label>{label}</label>
            <div>
                {values.map((value, i) =>
                    <label key={`radio-button-${name}-${i}`}>
                        <div className={subClassName}>
                            <input type={"radio"} name={name} value={value} onChange={onChange}/>
                            {value}
                        </div>
                    </label>
                )}
            </div>
        </div>
    )
}




