import React, { useEffect, useState } from "react";
import routers from "./routers";
import { connect } from "react-redux";
import { db } from "./services/firebase";
import Header from "./components/header/Header";
import * as actions from "./redux/actions/Index";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotificationToast from "./components/animation/notificationToast/NotificationToast";

function App(props) {
  const cookies = new Cookies();
  const idCookies = cookies.get("user");
  const [idNotification, setNotification] = useState("");
  const [arrNotiContent, setArrNotiContent] = useState([]);

  useEffect(() => {
    try {
      const ref = db.ref("/social_network");
      const notiRef = ref.child("notifications");
      const userRef = ref.child("users");

      const getUser = async (id) => {
        let data;
        if (id === null) return data;
        await userRef.child(id).once("value", (snap) => {
          if (snap?.val() === null) {
            return;
          }
          const { imageSrc, username } = snap?.val();
          data = { imageSrc, username };
        });
        return data;
      };

      const notificationRequest = async () => {
        let data = [];
        await notiRef.on("value", async (snapshot) => {
          const arrNotiTemp = [];
          const arrNotiContentTemp = [];
          for (const [key, value] of Object.entries(snapshot.val())) {
            if (value?.key === idCookies) {
              setNotification(key);
              if (value?.notification) arrNotiTemp.push(value?.notification);
            }
          }
          if (arrNotiTemp[0]) {
            for (const [key, value] of Object.entries(arrNotiTemp[0])) {
              let dataUser = await getUser(value?.id_account);
              data = await { ...value, ...dataUser };
              arrNotiContentTemp.push(data);
            }
            setArrNotiContent(arrNotiContentTemp);
          }
        });
      };
      notificationRequest();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showContentComponents = (routers) => {
    let results = null;
    if (routers.length > 0) {
      results = routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return <Switch>{results}</Switch>;
  };

  return (
    <Router>
      <Header data={arrNotiContent} idNotification={idNotification} />
      <NotificationToast
        data={arrNotiContent}
        idNotification={idNotification}
      />
      <div className="clearfix"></div>
      <div
        style={{
          width: "100%",
          minHeight: "1000px",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div className="container">{showContentComponents(routers)}</div>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutRequest: (id) => {
      dispatch(actions.logOutRequest(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
