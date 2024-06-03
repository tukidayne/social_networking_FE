import React, { useState } from "react";
import "./suggested.css";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions/Index";
import { CircularProgress } from "diginet-core-ui/components";
import CardLoading from "../animation/cardLoading/CardLoading";

function Suggested(props) {
  const { dataSuggested, dataUser } = props;
  const [idChoose, setIdChoose] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  console.log(dataUser);

  const handleFollow = (e) => {
    console.log(e);
    setShowLoading(true);
    setIdChoose(e.id);
    props.followFriendRequest(
      e.id,
      setShowLoading,
      dataUser?.username,
      dataUser?.id
    );
  };

  return (
    <div>
      {_.isEmpty(dataSuggested) && <CardLoading actionTypes="suggested" />}
      {!_.isEmpty(dataSuggested) &&
        dataSuggested.map((value, index) => {
          return (
            <div className="right-bottom-bottom" key={index}>
              <div className="avt-sugges">
                <img src={value.imageSrc} alt="" id="avt-sugges" />
              </div>
              <div className="name-sugges">
                <Link
                  to={{
                    pathname: `/personal/${value?.username}`,
                    state: value,
                  }}
                  id="name-sugges"
                >
                  <p>{value.username}</p>
                </Link>
              </div>
              <div className="follow-sugges">
                <p id="follow-sugges" onClick={() => handleFollow(value)}>
                  Theo dõi
                </p>
                {showLoading && idChoose === value?.id && (
                  <CircularProgress
                    color="#f26e41"
                    direction="bottom"
                    percent={100}
                    percentColor="#0095ff"
                    size="extraSmall"
                    strokeWidth={10}
                    style={{
                      position: "absolute",
                      top: -4,
                      right: 10,
                      fontSize: 10,
                      zIndex: 10000,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSuggested: state.Home,
    dataPersonal: state.MyPersonal,
    dataUser: state.PersonalOfMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    suggestedAccountRequest: (id) => {
      dispatch(actions.suggestedAccountRequest(id));
    },
    followFriendRequest: (id, setShowLoading, username, idUser) => {
      dispatch(
        actions.followFriendRequest(id, setShowLoading, username, idUser)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
