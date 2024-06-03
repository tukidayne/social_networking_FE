import React from "react";
import Chat from "../../components/chat/Chat";

function ChatPage(props) {
  const { history } = props;

  return (
    <div>
      <Chat history={history} />
    </div>
  );
}

export default ChatPage;
