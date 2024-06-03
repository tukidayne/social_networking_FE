/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import "./notification.css";
import _ from "lodash";
import TimeStamp from "../../timeStamp";
import { useHistory } from "react-router-dom";
import DetailsPost from "../detailsPost/DetailsPost";
import InfiniteScroll from "react-infinite-scroll-component";

function Notification(props) {
  const { data } = props;
  let history = useHistory();
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [isCheckMouse, setIsCheckMouse] = useState(true);
  const [openDetailsPost, setOpenDetailsPost] = useState(false);
  const start = useRef(0);
  const end = useRef(10);
  const [dataLimit, setDataLimit] = useState([]);
  const [dataEnd, setDataEnd] = useState(true);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    setDataLength(data.length);
    setDataLimit(
      _.orderBy(data, ["timestamp"], ["desc"]).slice(start.current, end.current)
    );
  }, [data]);

  const openFormDetails = (value) => {
    setOpenDetailsPost(true);
    setDataDetailsPost(value);
    // props.onCloseForm(false);
  };

  const onCloseForm = (e) => {
    props.onCloseForm(false);
    setOpenDetailsPost(e);
  };

  const openPersonal = (value) => {
    history.push(`/personal/${value?.username}`);
  };

  const fetchMoreData = () => {
    if (dataLimit.length === dataLength) setDataEnd(false);
    setTimeout(() => {
      start.current = end.current;
      end.current += 10;
      setDataLimit(
        dataLimit.concat(
          _.orderBy(data, ["timestamp"], ["desc"]).slice(
            start.current,
            end.current
          )
        )
      );
    }, 500);
  };

  return (
    <div>
      {openDetailsPost && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
          setOpenDetailsPost={setOpenDetailsPost}
        />
      )}
      <div
        className="backgroundNotiWrapper"
        onClick={isCheckMouse ? () => onCloseForm() : null}
      >
        <div
          className="backgroundNoti"
          onMouseEnter={() => setIsCheckMouse(false)}
          onMouseLeave={() => setIsCheckMouse(true)}
          style={{ overflow: "auto" }}
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={dataLimit.length}
            next={() => fetchMoreData()}
            hasMore={dataEnd}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {!_.isEmpty(dataLimit) &&
              _.orderBy(dataLimit, ["timestamp"], ["desc"])?.map(
                (value, index) => {
                  return (
                    <div
                      key={index}
                      className="backgroundNoti_form"
                      onClick={
                        value?.type !== "follow"
                          ? () => openFormDetails(value)
                          : () => openPersonal(value)
                      }
                    >
                      <div className="backgroundNoti_form-left">
                        <img
                          src={value?.imageSrc}
                          id="backgroundNoti_form-left"
                          alt=""
                        />
                      </div>
                      <div
                        className="backgroundNoti_form-body"
                        style={
                          value?.type === "follow"
                            ? { width: "60%" }
                            : { width: "83%" }
                        }
                      >
                        <div
                          className="formNoti_body-top"
                          style={
                            !value?.hasSeen ? { fontWeight: "bold" } : null
                          }
                        >
                          {value?.username} {value?.message}
                        </div>
                        <div
                          className="formBody_body-bottom"
                          style={
                            !value?.hasSeen
                              ? {
                                  fontWeight: "bold",
                                  color: "hsl(214deg 89% 57%)",
                                }
                              : null
                          }
                        >
                          {TimeStamp(value?.timestamp)}
                        </div>
                      </div>
                      {value?.type === "follow" && (
                        <div className="backgroundNoti_form-right">
                          <div className="form_right-follow">theo dõi</div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Notification;
