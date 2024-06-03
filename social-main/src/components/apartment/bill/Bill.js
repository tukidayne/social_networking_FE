import React, { useState, useEffect } from "react";
import "./bill.css";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import * as actionsApt from "../../../redux/actions/apartment";

function Bill(props) {
  const { dataBill, dataPayment, dataUser } = props;
  const [data, setData] = useState([]);
  let history = useHistory();
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    isRender && props.getBillRequest(dataUser?.id);
    setIsRender(false);
    setData(dataBill);
    !_.isEmpty(dataPayment) && window.location.replace(dataPayment);
  }, [props, isRender, dataBill, dataPayment, history, dataUser?.id]);

  const handleSubmitPayment = (value) => {
    props.createPaymentRequest(value?._id, value?.tongTien);
  };

  return (
    <div>
      <div className="backgroundBill">
        {data?.map((value, index) => {
          const dateNow = Date.now();
          const noiDung = value?.noiDung;

          return (
            <div key={index}>
              {value?.loai_phieuThu === "service_fee" && (
                <div className="backgroundBill_form">
                  <div className="backgroundBill_form-top">
                    Chi phí quản lý căn hộ
                    {dateNow - value?.hanThanhToan > 0 && (
                      <div className="titleExpired">Đã quá hạn</div>
                    )}
                  </div>
                  <div className="backgroundBill_form-bottom">
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Căn hộ</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {value?.maCanHo}
                      </div>
                    </div>
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Ngày lập phiếu</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {moment(value?.ngayLapPhieu).format(
                          "DD [Tháng] MM [lúc] HH:mm"
                        )}
                      </div>
                    </div>
                    <div className="formBill_bottom-bottom">
                      <table
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "white",
                          borderRadius: 10,
                          border: "1px solid #dbdbdb",
                        }}
                      >
                        <tr>
                          <th className="bottomBill_bottom-tableTh">
                            Diện tích
                          </th>
                          <th className="bottomBill_bottom-tableTh">DVT</th>
                          <th className="bottomBill_bottom-tableTh">Đơn giá</th>
                          <th className="bottomBill_bottom-tableTh">
                            Thành tiền
                          </th>
                        </tr>
                        <tbody>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung.dienTich}
                            </td>
                            <td className="bottomBill_bottom-tableTd">m2</td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={value?.tongTien / noiDung.dienTich}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={value?.tongTien}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="totalPrice">
                      Tổng tiền:{" "}
                      <NumberFormat
                        value={value?.tongTien}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix={" VND"}
                      />
                    </div>
                  </div>
                  <div className="totalPay">
                    <p
                      id="totalPay"
                      onClick={() => handleSubmitPayment(value)}
                      // href="http://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_Command=pay&vnp_CreateDate=20210712060703&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh%20toan%20don%20hang%20thoi%20gian%3A%202021-07-10%2017%3A07%3A46&vnp_OrderType=billpayment&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Fapartment&vnp_TmnCode=1SNJ89L8&vnp_TxnRef=060703&vnp_Version=2&vnp_SecureHashType=SHA256&vnp_SecureHash=f84fd46034c4dab0031ab63c75077f55d4bbdb3a9559537bb59c8e8e629197dc"
                    >
                      {" "}
                      Thanh toán
                    </p>
                  </div>
                </div>
              )}
              {/* ------------------------------------------------------- */}
              {value?.loai_phieuThu === "water_fee" && (
                <div className="backgroundBill_form">
                  <div className="backgroundBill_form-top">
                    Chi tiết phiếu thu tiền nước
                    {dateNow - value?.hanThanhToan > 0 && (
                      <div className="titleExpired">Đã quá hạn</div>
                    )}
                  </div>
                  <div className="backgroundBill_form-bottom">
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Căn hộ</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {value?.maCanHo}
                      </div>
                    </div>
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Ngày lập phiếu</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {moment(value?.ngayLapPhieu).format(
                          "DD [Tháng] MM [lúc] HH:mm"
                        )}
                      </div>
                    </div>
                    <div className="formBill_bottom-bottom">
                      <table
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "white",
                          borderRadius: 10,
                          border: "1px solid #dbdbdb",
                        }}
                      >
                        <tr>
                          <th className="bottomBill_bottom-tableTh">
                            Chỉ số mới
                          </th>
                          <th className="bottomBill_bottom-tableTh">
                            Chỉ số cũ
                          </th>
                          <th className="bottomBill_bottom-tableTh">
                            Tiêu thụ
                          </th>
                        </tr>
                        <tbody>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.chiSoMoi}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.chiSoCu}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.tieuThu}
                            </td>
                          </tr>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Định mức 1
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.dinhMuc1}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienDinhMuc1}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Định mức 2
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.dinhMuc2}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienDinhMuc2}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Định mức 3
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.dinhMuc3}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienDinhMuc3}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="totalPrice">
                      Tổng tiền:{" "}
                      <NumberFormat
                        value={value?.tongTien}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix={" VND"}
                      />
                    </div>
                  </div>
                  <div className="totalPay">
                    <p id="totalPay" onClick={() => handleSubmitPayment(value)}>
                      {" "}
                      Thanh toán
                    </p>
                  </div>
                </div>
              )}{" "}
              {/* ------------------------------------------------------- */}
              {value?.loai_phieuThu === "parking_fee" && (
                <div className="backgroundBill_form">
                  <div className="backgroundBill_form-top">
                    Chi tiết phiếu thu tiền giữ xe
                    {dateNow - value?.hanThanhToan > 0 && (
                      <div className="titleExpired">Đã quá hạn</div>
                    )}
                  </div>
                  <div className="backgroundBill_form-bottom">
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Căn hộ</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {value?.maCanHo}
                      </div>
                    </div>
                    <div className="formBill_bottom-top">
                      <div className="bottomBill_top-left"> Ngày lập phiếu</div>
                      <div className="bottomBill_top-right">
                        {" "}
                        {moment(value?.ngayLapPhieu).format(
                          "DD [Tháng] MM [lúc] HH:mm"
                        )}
                      </div>
                    </div>
                    <div className="formBill_bottom-bottom">
                      <table
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "white",
                          borderRadius: 10,
                          border: "1px solid #dbdbdb",
                        }}
                      >
                        <tr>
                          <th className="bottomBill_bottom-tableTh">Loại xe</th>
                          <th className="bottomBill_bottom-tableTh">
                            Số lượng
                          </th>
                          <th className="bottomBill_bottom-tableTh">Đơn giá</th>
                          <th className="bottomBill_bottom-tableTh">
                            Thành tiền
                          </th>
                        </tr>
                        <tbody>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Xe ô tô
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.oto}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienOto}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienOto * noiDung?.oto}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Xe máy
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.xeMay}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienXeMay}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienXeMay * noiDung?.xeMay}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bottomBill_bottom-tableTd">
                              Xe đạp
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              {noiDung?.xeDap}
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienXeDap}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                            <td className="bottomBill_bottom-tableTd">
                              <NumberFormat
                                value={noiDung?.tienOto * noiDung?.xeDap}
                                thousandSeparator={true}
                                displayType={"text"}
                                suffix={" VND"}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="totalPrice">
                      Tổng tiền:{" "}
                      <NumberFormat
                        value={value?.tongTien}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix={" VND"}
                      />
                    </div>
                    <div className="totalPay">
                      <p
                        id="totalPay"
                        onClick={() => handleSubmitPayment(value)}
                      >
                        {" "}
                        Thanh toán
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataBill: state.Apartment.bill,
    dataPayment: state.CreatePayment,
    dataUser: state.PersonalOfMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillRequest: (id) => {
      dispatch(actionsApt.getBillRequest(id));
    },
    createPaymentRequest: (id, tongTien) => {
      dispatch(actionsApt.createPaymentRequest(id, tongTien));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
