import styles from "./Feedback.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import owl from "./img/owl.png";
import bookstack from "./img/bookstack.png";
import stamp from "./img/stamp.png";
import { useNavigate, useParams } from "react-router-dom";

function Feedback() {
  let param = useParams();
  const book = param.title;
  //   let [contents,setContentes] = useState({});
  const [original, setOriginal] = useState("원본");
  const [correct, setCorrect] = useState("맞춤법 교정해드림");
  const [feedback, setFeedback] = useState("피드백데스");
  

  const BASE_URL = useSelector((state) => state.BASE_URL);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}report/${book}/feedback/`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        // setContentes(data.data.contents);
        setOriginal(data.data.contents.original);
        setCorrect(data.data.contents.correct);
        setFeedback(data.data.contents.feedback);
        setLoading(false);
      });
  }, []);

//   const [report, setReport] = useState(original);
  let [btn, setBtn] = useState(0);
  const navigate = useNavigate();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <div className={styles.titleleft}>
          <div className={styles.titlebox}>
            <div className={styles.title}>내 감상문</div>
          </div>
          <div className={styles.correctbtnbox}>
            <button onClick={() => {btn == 0? setBtn(1) : setBtn(0)}}>{btn == 1 ? "원본 보기" :"맞춤법 교정"}</button>
          </div>
        </div>
        <div className={styles.titleright}>
          <button
            onClick={() => {
              navigate('/home');
              // 마이페이지로 연결
            }}
          >
            돌아가기
          </button>
        </div>
      </div>

      <div className={styles.contents}>
        <div className={styles.report} align="left">
          <div className={styles.note}>{btn == 0 ? original : correct }</div>
        </div>
        <div className={styles.comment}>
          <div className={styles.feedback} >
            <div align="left">{feedback}</div>
            <img src={stamp}></img>
          </div>
          <div className={styles.images}>
            <div className={styles.leftimg}>
              <img src={bookstack}></img>
            </div>
            <div className={styles.rightimg}>
              <img src={owl}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;