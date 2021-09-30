import style from "../styles/message.module.scss"
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown} from "@fortawesome/free-solid-svg-icons"
import {useRouter} from "next/router";
import layout from "../styles/common_parts.module.scss"
import axios from "axios";
import {Footer, Header, RadioButtonList} from "component/Common";
import {ErrorModal} from "../component/Modal";
import {hospital} from "../common/hospital";

type Form = {
  name: string;
  email: string;
  gender: string;
  person: string;
  cancer: string;
  stage: string;
  currentState: string;
  secondSelect: string;
  request: string;
  outPatient: string;
  message: string;
};


type HTTPBody = {
    hospitals: Array<{ name: string, email: string }>,
    patient: Form,
    host: string,
}

const Hospital = hospital;

const Message = () => {
    const API_URL = process.env.API_URL
    const router = useRouter();
    const [form, setForm] = useState<Form>({
        name: "",
        email: "",
        gender: "",
        person: "",
        cancer: "",
        stage: "",
        currentState: "",
        secondSelect: "",
        request: "",
        outPatient: "",
        message: ""
    });
    const [isModalOpen, setModalOpen] = useState(false)
    const [hospitals, setHospital] = useState([])
    const [host, setHost] = useState("")

    useEffect(() => {
        setHost(window.location.hostname);
        let jsonHospital: number[] = JSON.parse(localStorage.getItem("hospitalId"));

        jsonHospital.map((j) => {
            let hospitalById = [...Hospital].filter((h) => h.id === j);
            hospitalById.map((h) => {
                setHospital((hospitals) => [...hospitals, {name: h.name, email: h.email}]);
            })
        })
    }, [])


    const isFormNotValid = () => {
        let {email, gender, person, cancer, stage, currentState, secondSelect, request, outPatient} = {...form}
        return [email, gender, person, cancer, stage, request, outPatient].some((v)=>v==="") || !(((["2", "5"].includes(currentState)) && secondSelect) || ["1", "3", "4", "6", "7", "8"].includes(currentState))
    }

    const handleSendMessage = async () => {
        if(isFormNotValid()) {
            setModalOpen(true)
            return;
        }
        const body: HTTPBody = {hospitals, patient: {...form}, host}
        await axios.post(API_URL, body).then((res) => {
            router.push("/finished")
        })
        localStorage.clear();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setForm({...form, [key]: value})
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }

    const IconForSelectBox = () => {
        return (<div className={style.icon}>
                <FontAwesomeIcon icon={faCaretDown}/>
            </div>)
    }

    return (
        <div className={layout.layout}>
            <Header title={"message"}/>
            <main className={style.message_main}>
                <div className={style.message}>
                    <p>メッセージを入力する
                        <br/>
                        <span>*は入力必須です。</span>
                    </p>
                    <div className={style.form}>
                        <div>名前（任意、ニックネーム可）</div>
                        <input type={"text"} value={form.name} name={"name"} onChange={handleChange} autoComplete={"off"} required={true}/>
                    </div>
                    <div className={style.form}>
                        <label>メールアドレス</label>
                        <input type={"email"} value={form.email} name={"email"} onChange={handleChange} autoComplete={"off"} required={true}/>
                    </div>
                    <RadioButtonList label={"性別"} className={style.display_radio} subClassName={style.radio_frame} name={"gender"}
                                     values={["男性", "女性", "その他"]} onChange={handleChange}/>
                    <RadioButtonList label={"ご本人様ですか？"} className={style.display_radio} subClassName={style.radio_frame} name={"person"}
                                     values={["本人", "家族", "その他"]} onChange={handleChange}/>
                    <div className={style.form}>
                        <label>がん種</label>
                        <div className={style.select_style}>
                            <select name={"cancer"} onChange={handleChange} defaultValue={""}>
                                <option value={""} disabled>選択してください</option>
                                <option value="前立腺がん">前立腺がん</option>
                                <option value="乳がん">乳がん</option>
                                <option value="肺がん">肺がん</option>
                                <option value="大腸がん">大腸がん</option>
                                <option value="胃がん">胃がん</option>
                                <option value="肝臓がん">肝臓がん</option>
                            </select>
                            <IconForSelectBox/>
                        </div>
                    </div>
                    <div className={style.form}>
                        <label>ステージ</label>
                        <div className={style.select_style}>
                            <select name={"stage"} onChange={handleChange} defaultValue={""}>
                                <option value={""} disabled>選択してください</option>
                                <option value={"ステージ0"}>ステージ0</option>
                                <option value={"ステージ1"}>ステージ1</option>
                                <option value={"ステージ2"}>ステージ2</option>
                                <option value={"ステージ3"}>ステージ3</option>
                                <option value={"ステージ4"}>ステージ4</option>
                            </select>
                            <IconForSelectBox/>
                        </div>
                    </div>
                    <div className={style.form}>
                        <label>現状</label>
                        <div className={style.select_style}>
                            <select name={"currentState"} onChange={handleChange} defaultValue={""}>
                                <option value={""} disabled>選択してください</option>
                                <option value={"1"}>①術前診断前（結果待ち）</option>
                                <option value={"2"}>②術前診断後（治療開始待ち）</option>
                                <option value={"3"}>③治療中</option>
                                <option value={"4"}>④術後診断前</option>
                                <option value={"5"}>⑤術後診断後</option>
                                <option value={"6"}>⑥無治療経過観察中</option>
                                <option value={"7"}>⑦再発・転移疑い</option>
                                <option value={"8"}>⑧緩和ケア中</option>
                            </select>
                            <IconForSelectBox/>
                        </div>
                        {(form.currentState === "2" || form.currentState === "5") && (
                            <div className={style.select_style}>
                                <select name={"secondSelect"} onChange={handleChange} defaultValue={""}>
                                    <option value={""} disabled>選択してください</option>
                                    <option value={"手術"}>提示された治療法：手術</option>
                                    <option value={"薬物療法"}>提示された治療法：薬物療法</option>
                                    <option value={"放射線療法"}>提示された治療法：放射線療法</option>
                                    <option value={"先進医療"}>提示された治療法：先進医療</option>
                                    <option value={"その他"}>提示された治療法：その他</option>
                                </select>
                                <IconForSelectBox/>
                            </div>
                        )}
                    </div>
                    <div className={style.form}>
                        <label>現在のご要望</label>
                        <div className={style.select_style}>
                            <select  name={"request"} onChange={handleChange} defaultValue={""}>
                                <option value={""} disabled>選択してください</option>
                                <option value={"主治医を変えたい"}>主治医を変えたい</option>
                                <option value={"治療法を変えたい"}>治療法を変えたい</option>
                                <option value={"病院を変えたい"}>病院を変えたい</option>
                                <option value={"やりたい治療の可否を知りたい"}>やりたい治療の可否を知りたい</option>
                                <option value={"現在の治療法の妥当性を知りたい"}>現在の治療法の妥当性を知りたい</option>
                                <option value={"他の選択肢の有無を知りたい"}>他の選択肢の有無を知りたい</option>
                                <option value={"セカンドオピニオンを希望"}>セカンドオピニオンを希望</option>
                                <option value={"その他"}>その他</option>
                            </select>
                            <IconForSelectBox/>
                        </div>
                    </div>
                    <RadioButtonList label={"受診を希望しますか？"} className={style.form} subClassName={style.radio} name={"outPatient"}
                                     values={["受診を希望する", "検討中", "検討していない"]} onChange={handleChange}/>
                    <div className={style.text_form}>
                        <label>メッセージ（任意）<span style={{fontWeight: 100}}>※</span>100文字以内</label>
                        <textarea maxLength={100} rows={5} value={form.message} name={"message"} onChange={handleChange}/>
                        <span className={style.length}>{`${form.message.length}/100`}</span>
                    </div>
                </div>
                <div className={style.div_btn}>
                    <button type={"submit"} className={style.button} onClick={() => handleSendMessage()}>メッセージを送る
                    </button>
                </div>
            </main>
            <ErrorModal isOpen={isModalOpen} handleClose={handleModalClose}/>
            <Footer/>
    </div>
)};

export default Message;
