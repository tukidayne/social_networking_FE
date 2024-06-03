import React, { useState, useEffect } from "react";
import "./apartment.css";
import _ from "lodash";
import Bill from "../bill/Bill";
import { connect } from "react-redux";
import PostApt from "../postApt/PostApt";
import { Popup } from "diginet-core-ui/components";
import PaymentHistory from "../paymentHistory/PaymentHistory";

function Apartment(props) {
  const { dataBill, dataUser } = props;
  const [contentId, setContentId] = useState(1);
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState([]);

  useEffect(() => {
    let arrTemp = [];
    const dateNow = Date.now();
    dataBill.forEach((item) => {
      if (dateNow - item?.hanThanhToan > 0) {
        setIsShowNoti(true);
        if (item?.loai_phieuThu === "service_fee") {
          arrTemp.push("phiếu thu tiền căn hộ");
        } else if (item?.loai_phieuThu === "water_fee") {
          arrTemp.push("phiếu thu tiền nước");
        } else {
          arrTemp.push("phiếu thu tiền giữ xe");
        }
      }
    });
    setDataNoti(arrTemp);
  }, [dataBill]);

  let value = [
    {
      id: 1,
      name: "Hóa đơn thanh toán",
    },
    {
      id: 2,
      name: "Lịch sử thanh toán",
    },
    {
      id: 3,
      name: "Thông báo",
    },
  ];

  const handleChooseItem = (id) => {
    setContentId(id);
  };

  const showContent = () => {
    switch (contentId) {
      case 1:
        return <Bill />;
      case 2:
        return <PaymentHistory />;
      case 3:
        return <PostApt />;
      default:
        return <Bill />;
    }
  };

  return (
    <div>
      {isShowNoti && (
        <Popup
          fullScreen
          icon="warning"
          onClose={() => setIsShowNoti(false)}
          open
          pressESCToClose
          title={`Thông báo: Hiện bạn đang có <b>${_.size(
            dataNoti
          )}</b> phiếu đã quá hạn thanh toán`}
        />
      )}
      <div className="backgroundApartment">
        <div className="backgroundApartment_form">
          <div className="backgroundApartment_form-left">
            <div className="formApartment_left-top">Thông tin</div>
            <div className="formApartment_left-bottom">
              {value?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="leftApartment_bottom-item"
                    onClick={() => handleChooseItem(item?.id)}
                  >
                    <div
                      className="bottomApartment_item-item"
                      style={
                        contentId === item?.id
                          ? {
                              backgroundColor: "rgb(231, 243, 255)",
                              color: "rgb(24, 138, 245)",
                            }
                          : {
                              backgroundColor: "rgba(228, 230, 235, 0.35)",
                              color: "rgb(5, 5, 5)",
                            }
                      }
                    >
                      {item?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="backgroundApartment_form-right">
            <div className="formApartment_right-wrapper">{showContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataBill: state.Apartment.bill,
    dataUser: state.PersonalOfMe,
  };
};

export default connect(mapStateToProps, null)(Apartment);
