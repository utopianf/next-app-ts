import React, {useEffect, useState} from "react";

import style from "../styles/doctor.module.scss";
// import common from  "../styles/common_parts.module.scss";
import {Hospital} from "../common/hospital";

type Props = {
    // doctor: Doctor;
    handleOpenModal?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
    check?: boolean
    hospital: Hospital;
};

const DoctorInfo: React.FC<Props> = ({handleCheck, check, hospital}) => {
    const [img, setImg] = useState("")

    // useEffect(() => {
    //     setImg(`/image/${doctor.id}.jpg`)
    // }, [doctor.id, check])
    //
    // const handleError = (e) => {
    //     e.currentTarget.onerror = null;
    //     setImg('/image/doctor_img.png')
    // }

    return (
        <>
            <div className={style.doctor_div} key={hospital.id}>
                <div className={style.doctor_div__profile}>
                    <div  className={style.doctor_hospital}>
                       <div>{hospital.name}</div>
                        <div className={style.address}>{hospital.address}</div>
                    </div>
                    { /* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hospital.img_path} alt={"hospital img"}/>
                    <div className={style.doctor_address}>
                        <div>{hospital.prefecture}</div>
                    </div>
                </div>
                <div className={style.doctor_div__lower}>
                    <div className={style.info_group}>
                        <div className={style.hospital_info}>
                            がん手術件数
                            <div>{hospital.surgery||"ー"}</div>
                            <span>{hospital.surgery_date.split(/[~〜～]/).map((e,i) => <>{e}<br/>{i?"":"~"}</>)||""}</span>
                        </div>
                        <div　className={style.hospital_info}>
                            病床数
                            <div>{hospital.bed}</div>
                          <span>{hospital.bed_date}<br/>現在</span>
                        </div>
                        <div className={style.hospital_info}>
                            入院個室数
                            <div>{hospital.private_room||"ー"}</div>
                            <span>
                                {(hospital.lower_private_room_price && hospital.upper_private_room_price) ?<>{hospital.lower_private_room_price}〜{hospital.upper_private_room_price}円<br/>/ 1日あたり</>:""}
                            </span>
                        </div>
                    </div>
                    <details>
                        <summary>
                            対応可能な治療法
                        </summary>
                        <span>{hospital.treatment.join("、")}</span>

                    </details>
                    <div className={style.introduction}>医師紹介（一部紹介）</div>
                    <div className={style.list_doctor}>
                        {hospital.doctors.map((d) => (

                            <div className={style.doctor_prof} key={d.id}>
                                { /* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={d.img_path||"/image/doctor_img.png"} alt={"hospital img"}/>
                                <div className={style.doctor_profile}>
                                    <div className={style.doctor_info}>
                                        <p>{d.department}</p>
                                        <p className={style.doctor_name}>{d.name}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                            <div className={check ? style.btn : style.non_checked_btn}>
                                <input
                                    type={"checkbox"}
                                    id={String(hospital.id)}
                                    onChange={(e) => {
                                        handleCheck(e)
                                    }}
                                    checked={check}
                                />
                                <label htmlFor={String(hospital.id)}>
                                    この病院に受診可能か問い合わせる
                                </label>
                            </div>
                </div>
            </div>
        </>
    );
};

export default DoctorInfo;
