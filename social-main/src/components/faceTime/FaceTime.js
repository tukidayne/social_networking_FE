/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import "./faceTime.css";
import { api } from "./Api";
// import { StringeeClient, StringeeVideo } from "stringee-chat-js-sdk";

function FaceTime(props) {
  const { dataCall } = props;
  const [roomToken, setRoomToken] = useState("");
  const [roomId, setRoomId] = useState("");
  const clientTemp = useRef(undefined);
  const roomTokenTemp = useRef(undefined);
  const roomTemp = useRef(undefined);
  const userTokenTemp = useRef("");

  useEffect(() => {
    const mounted = async () => {
      try {
        await api.setRestToken();
      } catch (error) {
        console.log(error);
      }
    };
    mounted();
  }, []);

  const authen = async () => {
    return new Promise(async (resolve) => {
      const userToken = await api.getUserToken(dataCall?.id);
      userTokenTemp.current = userToken;

      if (!clientTemp.current) {
        const client = new StringeeClient();
        client.on("authen", (results) => {
          console.log("on authen: ", results);
          resolve(results);
        });

        clientTemp.current = client;
      }

      clientTemp.current.connect(userToken);
    });
  };

  const publishVideo = async () => {
    const localTrack = await StringeeVideo.createLocalVideoTrack(
      clientTemp.current,
      {
        video: true,
        audio: true,
        videoDimensions: { width: 640, height: 360 },
      }
    );

    const videoElements = localTrack.attach();
    document.querySelector("#videosHehe")?.appendChild(videoElements);

    const roomData = await StringeeVideo.joinRoom(
      clientTemp.current,
      roomTokenTemp.current
    );
    const room = roomData.room;

    if (!roomTemp.current) {
      roomTemp.current = room;
      room.clearAllOnMethos();
      room.on("addtrack", async (event) => {
        const trackInfo = event.info.track;

        if (trackInfo.serverId === localTrack.serverId) return;

        await subscribeTrack(trackInfo);
      });

      room.on("removetrack", async (event) => {
        if (!event.track) return;
        const elements = event.track.detach();
        elements.forEach((element) => element.remove());
      });

      console.log(roomData);

      roomData?.listTrackInfo?.forEach(async (trackInfo) => {
        await subscribeTrack(trackInfo);
      });
    }

    await room.publish(localTrack);
    console.log("room publish successful");
  };

  const subscribeTrack = async (trackInfo) => {
    if (trackInfo) {
      const track = await roomTemp.current?.subscribe(trackInfo?.serverId);
      track?.on("ready", async () => {
        const ele = track.attach();
        document.querySelector("#videosHehe").appendChild(ele);
      });
    }
  };

  const createRoom = async () => {
    const room = await api.createRoom();
    const roomToken = await api.getRoomToken(room.roomId);

    setRoomId(room.roomId);
    setRoomToken(roomToken);
    roomTokenTemp.current = roomToken;
    await authen();
    await publishVideo();
  };

  const joinRoom = async () => {
    const roomId = prompt("Dán room vào đây");
    if (!roomId) return;

    const roomToken = await api.getRoomToken(roomId);
    setRoomId(roomId);
    setRoomToken(roomToken);
    roomTokenTemp.current = roomToken;

    await authen();
    await publishVideo();
  };

  return (
    <div>
      <div className="backgroundFaceTime">
        <h1>{roomId}</h1>
        <h1>{roomToken}</h1>
        <button onClick={() => createRoom()}>Create room</button>
        <button onClick={() => joinRoom()}>Join room</button>
        <div id="videosHehe"></div>
      </div>
    </div>
  );
}

export default FaceTime;
