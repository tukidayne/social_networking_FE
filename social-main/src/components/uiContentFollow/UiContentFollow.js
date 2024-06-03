import React, { useState } from "react";
import "./uiContentFollow.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Action from "../../redux/actions/Index";
import UiFormUnfollow from "../uiFormUnfollow/UiFormUnfollow";
import GlobalLoading from "../animation/globalLoading/GlobalLoading";
import { CircularProgress, LinearProgress } from "diginet-core-ui/components";

function UiContentFollow(props) {
  const { name, dataFollow, setOpenContentFollow, dataOfMe } = props;
  const [idChoose, setIdChoose] = useState("");
  const [showLoading, setShowLoading] = useState(null);
  const [dataUnFollow, setDataUnFollow] = useState(null);
  const [openUnfollow, setOpenUnfollow] = useState(false);
  const [showLoadingFollow, setShowLoadingFollow] = useState(false);

  const closeForm = () => {
    props.onCloseForm(false);
  };

  const onCloseForm = (e) => {
    setOpenUnfollow(e);
  };

  const handleChangeUser = (value) => {
    setShowLoading(true);
    props.getPersonalByMeRequest(
      setShowLoading,
      value?.username,
      setOpenContentFollow
    );
  };

  const openFormUnfollow = (value) => {
    setDataUnFollow(value);
    setOpenUnfollow(true);
  };

  const handleFollow = (value) => {
    setShowLoadingFollow(true);
    setIdChoose(value?.id_account);
    props.followFriendRequest(
      value?.id_account,
      setShowLoadingFollow,
      dataOfMe?.username,
      dataOfMe?.id
    );
  };

  return (
    <div>
      {showLoading && (
        <LinearProgress
          color="#d82b7d"
          duration={1}
          height={3}
          percent={75}
          showValue
          valuePosition="top"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10000 }}
        />
      )}
      {showLoading && <GlobalLoading />}
      <div className="backgroundContentFollow">
        {openUnfollow && (
          <UiFormUnfollow
            setOpenContentFollow={setOpenContentFollow}
            dataUnFollow={{
              id: dataUnFollow?.id_account,
              name: dataUnFollow?.name,
              username: dataUnFollow?.username,
              imageSrc: dataUnFollow?.imageSrc,
            }}
            onCloseForm={onCloseForm}
          />
        )}
        <div className="backgroundContentFollow_form">
          <div className="backgroundContentFollow_form-top">
            {name}
            <i
              className="fas fa-times"
              id="form_top-icon"
              onClick={() => closeForm()}
            ></i>
          </div>
          <div className="backgroundContentFollow_form-bottom">
            {dataFollow?.map((value, index) => {
              const checkFollowTemp = dataOfMe?.following?.findIndex(
                (item) => item?.id_account === value.id_account
              );
              return (
                <div key={index}>
                  {value?.username && (
                    <div className="form_bottom-all">
                      <div className="form_bottom-left">
                        <div className="bottom_left-avt">
                          <img
                            src={value?.imageSrc}
                            alt=""
                            id="bottom_left-avt"
                            onClick={() => handleChangeUser(value)}
                          />
                        </div>
                        <div className="bottom_left-title">
                          <Link
                            to={{
                              pathname: `/personal/${dataFollow[index]?.username}`,
                              state: value,
                            }}
                            className="link_custom"
                            // onClick={() => props.onCloseForm(false)}
                          >
                            <div
                              className="left_title-top"
                              onClick={() => handleChangeUser(value)}
                            >
                              <p>{value?.username}</p>
                            </div>
                          </Link>

                          <div className="left_title-bottom">
                            <p>{value?.name}</p>
                          </div>
                          {showLoadingFollow && idChoose === value?.id_account && (
                            <CircularProgress
                              color="#f26e41"
                              direction="bottom"
                              percent={100}
                              percentColor="#0095ff"
                              size="extraSmall"
                              strokeWidth={10}
                              style={{
                                position: "absolute",
                                top: 15,
                                right: 0,
                                fontSize: 10,
                                zIndex: 10000,
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="form_bottom-right">
                        {checkFollowTemp !== -1 ? (
                          <p
                            id="bottom_right-delete"
                            onClick={
                              !showLoading
                                ? () => openFormUnfollow(value)
                                : null
                            }
                          >
                            Đang theo dõi
                          </p>
                        ) : (
                          value.id_account !== dataOfMe?.id && (
                            <p
                              id="bottom_right-delete"
                              onClick={
                                !showLoading ? () => handleFollow(value) : null
                              }
                              style={{
                                backgroundColor: "rgb(0, 149, 246)",
                                color: "white",
                                border: "none",
                                fontWeight: "bold",
                              }}
                            >
                              Theo dõi
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.MyPersonal,
    dataOfMe: state.PersonalOfMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalByMeRequest: (
      setShowLoading,
      username,
      setOpenContentFollow
    ) => {
      dispatch(
        Action.getPersonalByMeRequest(
          setShowLoading,
          username,
          setOpenContentFollow
        )
      );
    },
    followFriendRequest: (id, setShowLoading, username, idUser) => {
      dispatch(
        Action.followFriendRequest(id, setShowLoading, username, idUser)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UiContentFollow);
