import React from "react";
import style from "../styles/finished.module.scss";
import {Header, Footer} from "component/Common";

const Finished: React.FC = () => {
  return (
    <div className={style.container}>
      <Header title={"thank you"} />
      <div>
        <div className={style.title}>メッセージ送信完了</div>

        <div className={style.sub_text}>
          ご利用ありがとうございます。
          <br />
          メッセージをお預かりしました。
          <br />
          返信をお約束するものではありませんが、一部の医師から返信を受け取れる場合がございます。
          <br />
          お待ちいただければ幸いです。
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Finished;
