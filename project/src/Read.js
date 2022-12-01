/*eslint-disable */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Read.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import bookloading from "./img/bookloading2.gif";

function Read() {
  let param = useParams();
  let title = param.title;
  let curchapter = Number(param.chapter);
  let curpage = Number(param.page);

  const BASE_URL = useSelector((state) => state.BASE_URL);

  let navigate = useNavigate();

  let [LeftTexts, setLeftTexts] = useState([]);
  let [RightTexts, setRightTexts] = useState([]);
  let [totalpages, setTotalpages] = useState(0);
  let [totalchapters, setTotalchapters] = useState(0);
  let [highlightIndexLeft, setHighlightLeft] = useState([]);
  let [highlightIndexRight, setHighlightRight] = useState([]);
  let [isHighlight, setIsHighlight] = useState(false);
  let [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        console.log(data.data);
        setLeftTexts(data.data.page);
        setTotalpages(data.data.pages);
        setTotalchapters(data.data.chapters);
      })
      .catch((error) => {
        navigate(`/writing/${title}`);
      });

    axios
      .get(`${BASE_URL}book/${title}/${curchapter}/?page=${curpage + 1}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        setRightTexts(data.data.page);
      });

    axios
      .get(`${BASE_URL}book/${title}/${curchapter}/highlight?page=${curpage}`, {
        headers: {
          Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
        },
      })
      .then((data) => {
        console.log(data.data);
        setHighlightLeft(data.data.index);
      });

    axios
      .get(
        `${BASE_URL}book/${title}/${curchapter}/highlight?page=${curpage + 1}`,
        {
          headers: {
            Authorization: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
          },
        }
      )
      .then((data) => {
        // console.log(data.data);
        setHighlightRight(data.data.index);
        setLoading(false);
      });
    return;
  }, [param]);

  if (isLoading) 
  {
    setTimeout(2000,[]);
    return <div><img src={bookloading}/> </div>;
  }

  const bookcontents = LeftTexts + RightTexts;
  // const lefttotalline = LeftTexts.split(".").length;

  // let temp = [];
  // for (let i = 0; i < highlightIndexRight.length; i++) {
  //   if (i == 0) {
  //     temp = [];
  //   }
  //   temp.push(highlightIndexRight[i] + lefttotalline);
  // }

  // const highlightIndex = [...highlightIndexLeft, ...temp];

  return (
    <div>
      <div id="readingwrapper">
        <div id="readingcontainer">
          <section className="open-book">
            <header>
              <h6>&nbsp;</h6>
              <h6>{title}</h6>
            </header>

            <article>{bookcontents}</article>

            <footer>
              <ol id="page-numbers">
                <li>{`${curchapter}-${curpage}`}</li>
                <li>{`${curchapter}-${curpage + 1}`}</li>
              </ol>
            </footer>
          </section>
        </div>
      </div>
      <DictionaryModal show={show} setShow={setShow} data={"사전"} />
      <DropdownButton id={styles.dropdownItemButton} title="엉박사 찬스">
        <Dropdown.Item
          as="button"
          onClick={() => {
            let selectedObj = window.getSelection();
            let selected = selectedObj.getRangeAt(0).toString();
            setShow(true);
            console.log(selected);
          }}
        >
          사전 찾기
        </Dropdown.Item>

        <Dropdown.Item
          as="button"
          onClick={() => {
            if (isHighlight) {
              setIsHighlight(false);
            } else {
              setIsHighlight(true);
            }
          }}
        >
          하이라이트
        </Dropdown.Item>
        <Dropdown.Item as="button">요약 보기</Dropdown.Item>
      </DropdownButton>
      <Button id={styles.leftButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="6x"
          onClick={() => {
            if (curpage != 1) {
              setLoading(true);
              navigate(`/reading/${title}/${curchapter}/${curpage - 2}`);
            } else {
              if (curchapter != 1) {
                setLoading(true);
                if (curpage == 1) {
                  axios
                    .get(
                      `${BASE_URL}book/${title}/${curchapter}/?page=${
                        curpage - 1
                      }`,
                      {
                        headers: {
                          Authorization:
                            "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",
                        },
                      }
                    )
                    .then((data) => {
                      navigate(
                        `/reading/${title}/${curchapter - 1}/${data.data.pages}`
                      );
                    });
                } else {
                  navigate(`/reading/${title}/${curchapter - 1}/1`);
                }
              } else {
                console.log("처음!");
              }
            }
          }}
        />
      </Button>
      <Button id={styles.rightButton}>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="6x"
          onClick={() => {
            if (curpage + 2 <= totalpages) {
              setLoading(true);
              navigate(`/reading/${title}/${curchapter}/${curpage + 2}`);
            } else {
              if (curchapter != totalchapters) {
                setLoading(true);
                // navigate(`/reading/${title}/${curchapter + 1}/${1}`);
                navigate(`/quiz/${title}/${curchapter}`);
              } else {
                console.log("다 읽음!");
                navigate(`/quiz/${title}/${curchapter}`);
              }
            }
          }}
        />
      </Button>
    </div>
  );
}

function DictionaryModal({ show, setShow, data }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName={styles.mymodal}
      >
        <Modal.Body style={{ background: "#FFF7E9" }}>
          <div className={styles.dictdiv}>
            <li className={styles.dictli}>
              노트<ul className={styles.dictul}>이 노트는</ul>
            </li>

            <hr />
            <li className={styles.dictli}>노트</li>
            <hr />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Read;
