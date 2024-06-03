import React, { useEffect, useState } from "react";
import "./paymentHistory.css";
import _ from "lodash";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import moment from "moment";
import * as actionsApt from "../../../redux/actions/apartment";

function PaymentHistory(props) {
  const { dataHistory, dataUser } = props;
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [isRender, setIsRender] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    isRender && props.paymentHistoryRequest(dataUser?.id);
    setIsRender(false);

    setData(dataHistory);
  }, [props, idCookies, isRender, dataHistory]);

  return (
    <div>
      <div className="backgroundPaymentHistory">
        <div className="backgroundPaymentHistory_title">Lịch sử thanh toán</div>
        {_.orderBy(data, ["ngayThanhToan"], ["desc"])?.map((item, index) => {
          return (
            <div key={index} className="backgroundPaymentHistory_form">
              <p>
                <b>Mã căn hộ</b>: {item?.maCanHo}
              </p>
              <p>
                <b>Loại phiếu thu:</b> {item?.loai_phieuThu}
              </p>
              <p>
                <b>Tổng tiền thanh toán:</b>
                <NumberFormat
                  value={item?.tongTien}
                  thousandSeparator={true}
                  displayType={"text"}
                  suffix={" VND"}
                />
              </p>
              <p>
                <b>Ngày thanh toán: </b>
                {moment(item?.ngayThanhToan).format(
                  "DD [Tháng] MM [lúc] HH:mm"
                )}
              </p>
              <p>
                <b>Trạng thái</b>:{" "}
                {item?.tinhTrang ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataHistory: state.Apartment.history,
    dataUser: state.PersonalOfMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentHistoryRequest: (id) => {
      dispatch(actionsApt.paymentHistoryRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);
