import React, {useState} from 'react';
import style from '../../../../styles/doctor.module.scss'
import DoctorInfo from 'component/DoctorInfo'
import {Footer, Header} from "component/Common";
import {useRouter} from "next/router";
import {hospital} from "common/hospital";
import {getRegionAndCancerType} from "../../../../lib/common";


const Steps = [{step: "STEP１", way: "問い合わせたい病院をチェック"}, {step: "STEP２", way: "フォームで簡単メッセージ入力"}, {step: "STEP３", way: "無料でメッセージ送信"}]

const Tokyo: React.FC = () => {
    const router = useRouter();
    const [pageRegion, cancerType] = getRegionAndCancerType(router)
    const Hospitals = hospital.filter((e) => e.cancer.includes(cancerType));
    const HospitalCheckAllTrue = Hospitals.reduce((obj, d) => ({...obj, [d.id]: true}), {});
    const HospitalCheckAllFalse = Hospitals.reduce((obj, d) => ({...obj, [d.id]: false}), {});
    const [isCheckedForHospital, setIsCheckedForHospital] = useState({...HospitalCheckAllTrue})

    const handleCheckAllHospital = (e) => {
        setIsCheckedForHospital(e.target.checked ? {...HospitalCheckAllTrue} : {...HospitalCheckAllFalse})
    }

    // handleAddHospitalToListとhandleRemoveHospitalFromListはここにまとめたが、そもそもの仕組みの改善の余地はある
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        let updatedIsCheckForHospital = {...isCheckedForHospital, [id]: e.target.checked}
        setIsCheckedForHospital(updatedIsCheckForHospital)
    }

    const goToConfirmation = () => {
        const checkedHospitals = [...Hospitals].filter((d) => isCheckedForHospital[d.id])
        let hospitalId = [];
        checkedHospitals.map((c) => {
            hospitalId.push(c.id)
        })
        localStorage.setItem("hospitalId", JSON.stringify(hospitalId));
        router.push("/confirmation");
    };

    return (
        <div className={style.doctor}>
            <Header title={`${pageRegion}の${cancerType}専門の医者、病院が見つかる - Findmeスペシャリストドクターズ（スペドク）`}/>
            <div className={style.head_group}>
                <div className={style.title1}>
                    複数の病院に一括で受診可能か確認できる
                </div>

                <div className={style.step_group}>
                    {Steps.map((s) => (
                        <div className={style.step} key={s.step}>
                            <div>{s.step}</div>
                            {s.way}
                        </div>
                    ))}
                    <div className={style.final_step}>
                        医療機関から返信
                    </div>
                </div>

                <div className={style.hospital_num}>
                    <span>{pageRegion} </span>で<span> {cancerType} </span>を診療可能な病院
                </div>
            </div>
            <div className={style.doctor_main}>
                <div className={style.list}>
                    {Hospitals.map((v, i) => <DoctorInfo key={i} hospital={v} handleCheck={(e) => handleCheck(e, v.id)}
                                                       check={isCheckedForHospital[v.id]}/>)}
                </div>
            </div>

            <div className={style.footer}>
                <div className={style.footer__checkbox}>
                    <div className={style.check_all}>
                        <input type={"checkbox"} id={"all"} onChange={handleCheckAllHospital} defaultChecked={true}/>
                        <label htmlFor={"all"}>
                            全ての病院にまとめて送る
                        </label>
                    </div>
                </div>
                <div className={style.button_center}>
                    <button className={style.button}
                            onClick={goToConfirmation}
                            disabled={Object.values(isCheckedForHospital).every((v) => v === false)}>受信可能か確認する（無料）
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Tokyo;
