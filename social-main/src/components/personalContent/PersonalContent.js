import React, { useState } from "react";
import "./personalContent.css";
import _ from "lodash";
import { pure } from "recompose";
import { connect } from "react-redux";
import DetailsPost from "../detailsPost/DetailsPost";
import * as actions from "../../redux/actions/Index";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function PersonalContent(props) {
  const { dataPost } = props;
  const [openDetailsPost, setOpenDetailsPost] = useState(false);
  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [valueToast, setValueToast] = useState({
    text: null,
  });

  const handleChoosePost = (data) => {
    setOpenDetailsPost(true);
    setDataDetailsPost(data);
  };

  const onCloseForm = (e) => {
    setOpenDetailsPost(e);
  };

  return (
    <div>
      {openDetailsPost && (
        <DetailsPost
          dataDetailsPost={dataDetailsPost}
          onCloseForm={onCloseForm}
          typePost="postById"
          setOpenDetailsPost={setOpenDetailsPost}
          setOpenToast={setOpenToast}
          setValueToast={setValueToast}
        />
      )}
      <div
        style={{
          width: 150,
          position: "fixed",
          bottom: 70,
          left: 50,
          zIndex: 99,
        }}
      >
        {openToast && <SnackbarContent message={valueToast?.text} />}
      </div>
      {/* {showLoading && <GlobalLoading />} */}
      <div className="bodyContainer_bottom">
        {_.orderBy(dataPost, ["timestamp"], ["desc"])?.map((item, index) => {
          return (
            <div key={index}>
              <div className="bodyContainer_bottom-item">
                <img
                  src={item?.imageSrc[0]}
                  alt=""
                  id="bottom_item-img"
                  onClick={() => handleChoosePost(item)}
                />
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
    dataPost: state.PostById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostRequestById: (setShowLoading, id) => {
      dispatch(actions.getPostRequestById(setShowLoading, id));
    },
  };
};

export default pure(
  connect(mapStateToProps, mapDispatchToProps)(PersonalContent)
);
