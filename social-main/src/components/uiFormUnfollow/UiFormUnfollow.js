import React, { useState, useEffect } from "react";
import "./uiFormUnfollow.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Index";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";

function UiFormUnfollow(props) {
  const { dataUser, dataUnFollow, setOpenContentFollow } = props;
  const [showLoading, setShowLoading] = useState(false);
  const [dataChoose, setDataChoose] = useState(null);
  const [openFormUnfollow, setOpenFormUnfollow] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    dataUnFollow ? setDataChoose(dataUnFollow) : setDataChoose(dataUser);
  }, [dataUnFollow, dataUser]);

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const handleRemoveUser = () => {
    const id = dataChoose.id;
    setShowLoading(true);
    props.removeFriendRequest(
      id,
      setShowLoading,
      setOpenFormUnfollow,
      setOpenContentFollow,
      dataUser?.username
    );
  };

  return (
    <div>
      {showLoading && <GlobalLoading />}
      <div
        className="backgroundFormUnfollow"
        style={openFormUnfollow ? { display: "block" } : { display: "none" }}
      >
        <div className="backgroundFormUnfollow_form">
          <div className="backgroundFormUnfollow_form-top">
            <div className="formUnfollow_top-top">
              <img src={dataChoose?.imageSrc} id="imgUnfollow_top" alt="" />
            </div>
            <div className="formUnfollow_top-bottom">
              Bỏ theo dõi @{dataChoose?.username}?
            </div>
          </div>
          <div
            className="backgroundFormUnfollow_form-body"
            onClick={() => handleRemoveUser()}
          >
            Bỏ theo dõi
          </div>
          <div
            className="backgroundFormUnfollow_form-bottom"
            onClick={() => closeForm()}
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.MyPersonal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFriendRequest: (
      id,
      setShowLoading,
      setOpenFormUnfollow,
      setOpenContentFollow,
      username
    ) => {
      dispatch(
        actions.removeFriendRequest(
          id,
          setShowLoading,
          setOpenFormUnfollow,
          setOpenContentFollow,
          username
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiFormUnfollow);
