import React, { useEffect, useState } from "react";
import "./notificationToast.css";
import { db } from "../../../services/firebase";
import DetailsPost from "../../detailsPost/DetailsPost";

function NotificationToast(props) {
  const { data, idNotification } = props;

  const [dataDetailsPost, setDataDetailsPost] = useState(null);
  const [openDetailsPost, setOpenDetailsPost] = useState(false);

  useEffect(() => {
    const ref = db.ref("/social_network");
    const notiRef = ref.child("notifications");

    const dispatchNotification = async (id) => {
      if (id === null) return;
      await notiRef
        .child(`${idNotification}/notification/${id}/isShow`)
        .set(true);
    };

    const notificationRequest = async () => {
      await notiRef
        .child(`${idNotification}/notification`)
        .on("value", async (snapshot) => {
          if (snapshot.val())
            for (const [key] of Object.entries(snapshot.val())) {
              setTimeout(async () => {
                const test = await dispatchNotification(key);
              }, 5000);
            }
        });
    };
    notificationRequest();
  }, [idNotification]);

  const handleOpenPost = async (data) => {
    setDataDetailsPost(data);
    setOpenDetailsPost(true);
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
          setOpenDetailsPost={setOpenDetailsPost}
        />
      )}
      <div className="backgroundNotiToast">
        {data?.map((data, index) => {
          return (
            <div key={index}>
              {!data?.isShow && (
                <div
                  className="animationToast"
                  style={{
                    animation:
                      "show_toast ease 1s, hide_toast ease 1s 3s forwards",
                  }}
                >
                  <div
                    className="backgroundNotiToast_form"
                    onClick={() => handleOpenPost(data)}
                  >
                    <div className="backgroundNotiToast_top">
                      <i
                        className="fas fa-times"
                        id="backgroundNotiToast_top"
                      ></i>
                      <b>Thông báo mới</b>
                    </div>
                    <div className="backgroundNotiToast_bottom">
                      <div className="backgroundNotiToast_left">
                        <img
                          src={data?.imageSrc}
                          id="backgroundNotiToast_left"
                          alt=""
                        />
                      </div>
                      <div className="backgroundNotiToast_right">
                        <div className="backgroundNotiToast_right-bottom">
                          {data?.username} {data?.message}
                        </div>
                      </div>
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

export default NotificationToast;
