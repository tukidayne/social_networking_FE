import React, { useEffect, useState } from "react";
import CallApi from "../../../utils/apiCaller";
import "./vnpayReturn.css";
import NumberFormat from "react-number-format";
import moment from "moment";
import { useHistory } from "react-router-dom";

function VnpayReturn(props) {
  const url = window.location.href.slice(35);
  const [dataSuccess, setDataSuccess] = useState(false);
  const [data, setData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getReturnVnPay = async () => {
      try {
        const response = await CallApi("GET", `/vnpay_return?${url}`, null);
        if (response?.data?.code === "00") {
          setData(response?.data);
          setDataSuccess(true);
        } else {
          setDataSuccess(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReturnVnPay();
  }, [props, url, history]);

  return (
    <div>
      <div className="backgroundVnpayReturn">
        <div className="backgroundVnpayReturn_form">
          <div className="backgroundVnpayReturn_form-top">
            <div className="formVnpayReturn_top-top">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="formVnpayReturn_top-bottom">
              Thanh toán thành công
            </div>
          </div>
          <div className="backgroundVnpayReturn_form-body">
            <div className="formVnpayReturn_body-item">
              <p>Loại giao dịch: </p> <p>{data.paymentType}</p>
            </div>
            <div className="formVnpayReturn_body-item">
              <p>Ngân hàng: </p> <p>{data.bank}</p>
            </div>
            <div className="formVnpayReturn_body-item">
              <p>Số tiền: </p>{" "}
              <p>
                <NumberFormat
                  value={data.amount}
                  thousandSeparator={true}
                  displayType={"text"}
                  suffix={" VND"}
                />
              </p>
            </div>
            <div className="formVnpayReturn_body-item">
              <p>Ngày giao dịch: </p>{" "}
              <p>{moment(data.payDate).format("DD [Tháng] MM [lúc] HH:mm")}</p>
            </div>
            <div className="formVnpayReturn_body-item">
              <p>Mã giao dịch: </p> <p>{data.transactionId}</p>
            </div>
          </div>
          <div className="backgroundVnpayReturn_form-bottom">
            <button
              id="backgroundVnpayReturn_form-bottom"
              onClick={() => history.push("/")}
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VnpayReturn;
