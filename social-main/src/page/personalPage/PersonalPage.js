import React from "react";
import Personal from "../../components/personal/Personal";

function PersonalPage(props) {
  const { history } = props;
  return (
    <div>
      <Personal history={history} />
    </div>
  );
}

export default PersonalPage;
