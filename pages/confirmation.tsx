import React, {useState} from "react";
import style from "styles/doctor.module.scss";
import common from "../styles/common_parts.module.scss";
import Law from "./law";
import Policy from "./policy";
import {useRouter} from "next/router";
import {Footer, Header} from "../component/Common";


type Form = {
    understand: boolean;
    agreement1: boolean;
    agreement2: boolean;
};

const Confirmation: React.FC = () => {

    const router = useRouter();
    const [check, setCheck] = useState<Form>({
        understand: false,
        agreement1: false,
        agreement2: false
    });

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck({...check, [e.target.name]: e.target.checked});
    };

    const canTransition = (): boolean => Object.values(check).every((v) => v);

    return (
        <div className={style.confirm}>
            <Header title={"confirmation"}/>
            <div className={style.overlay}>
                <div className={style.modal_title}>注意事項・確認</div>
                <div className={style.text}>
                    医師から必ず返信があるものではございません。
                    <br/>
                    一部の医師から、返信を頂ける場合があります。
                </div>
                <div className={style.check}>
                    <div className={style.check_confirm}>
                        <input
                            type={"checkbox"}
                            onChange={(e) => handleCheck(e)}
                            checked={check.understand}
                            name={"understand"}
                            id={"understand"}
                            required={true}
                        />
                        <label htmlFor={"understand"}>注意事項を理解しました</label>
                    </div>
                </div>

                <div className={style.rule}>
                    <Law/>
                </div>

                <br/>
                <div className={style.check}>
                    <div className={style.check_confirm}>
                        <input
                            type={"checkbox"}
                            onChange={(e) => handleCheck(e)}
                            checked={check.agreement1}
                            name={"agreement1"}
                            id={"agreement1"}
                            required={true}
                        />
                        <label htmlFor={"agreement1"}>情報の取扱いについて同意します</label>
                    </div>
                </div>
                <br/>

                <div className={style.rule}>
                    <Policy/>
                </div>

                <div className={style.check}>
                    <div className={style.check_confirm }>
                        <input
                            type={"checkbox"}
                            onChange={(e) => handleCheck(e)}
                            checked={check.agreement2}
                            name={"agreement2"}
                            id={"agreement2"}
                            required={true}
                        />
                        <label htmlFor={"agreement2"}>利用規約に同意します</label>
                    </div>
                </div>
            </div>
            <div className={style.footer_btn}>
                <button
                    className={canTransition() ? style.modal_button : style.disable_btn}
                    onClick={() => router.push("/message")}
                    disabled={!canTransition()}
                >
                    すべての項目に同意して次へ
                </button>
                <div className={style.cancel} onClick={() => router.back()}>
                    戻る
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Confirmation;
