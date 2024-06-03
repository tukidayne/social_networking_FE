import React, { useState, useEffect } from "react";
import "./postApt.css";
import _ from "lodash";
import TimeStamp from "../../../timeStamp";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import * as actionApt from "../../../redux/actions/apartment";
import CardLoading from "../../animation/cardLoading/CardLoading";
import logo from "../../../uploads/animation/logoXanh.png";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

function PostApt(props) {
  const { dataPostApt } = props;
  const [isRender, setIsRender] = useState(true);
  const [dataNewsPost, setDataNewsPost] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    isRender && props.getPostApartmentRequest();
    setIsRender(false);
    setDataNewsPost(dataPostApt);
  }, [props, isRender, dataPostApt]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(240, 242, 245)",
      }}
    >
      <div className="backgroundItem">
        {showLoading && <CardLoading actionTypes="post" />}
        {!showLoading &&
          dataNewsPost?.map((item, index) => {
            return (
              <div
                key={index}
                className="backgroundItem_form"
                style={{ paddingBottom: 10 }}
              >
                <div className="backgroundItem_form-top">
                  <div className="formItem_top-left">
                    <img src={logo} id="formItem_top-left" alt="" />
                  </div>
                  <div className="formItem_top-body">{item?.username}</div>
                  <div className="formItem_top-right">
                    <i
                      className="fas fa-ellipsis-h"
                      id="formItem_top-right"
                    ></i>
                  </div>
                </div>
                <div className="backgroundItem_form-body">
                  <Slide
                    autoplay={false}
                    style={{ width: "100%", height: "100%" }}
                    transitionDuration={300}
                    arrows={item?.hinhAnh?.length === 1 ? false : true}
                  >
                    {!_.isEmpty(item?.hinhAnh) &&
                      item?.hinhAnh?.map((image, index) => {
                        return (
                          <img
                            key={index}
                            src={image}
                            id="backgroundItem_form-body"
                            alt=""
                          />
                        );
                      })}
                  </Slide>
                </div>
                <div className="backgroundItem_form-bottom">
                  <div className="formItem_bottom-top">
                    <div
                      className="bottomItem_top-top"
                      style={{ minHeight: "30px" }}
                    >
                      {moment(item?.ngayDang).format(
                        "DD [Tháng] MM [lúc] HH:mm"
                      )}
                    </div>
                    <div className="bottomItem_top-body">
                      <p id="bottomItem_top-body">
                        <b>{item?.username}</b>
                        {ReactHtmlParser(item?.noiDung)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataPostApt: state.Apartment.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostApartmentRequest: () => {
      dispatch(actionApt.getPostApartmentRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostApt);
