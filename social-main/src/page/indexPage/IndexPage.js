import React from "react";
import Index from "../../components/index/Index";

function HomePage(props) {
  const { history } = props;
  return (
    <div>
      <Index history={history} />
    </div>
  );
}

export default HomePage;
