import React from "react";
import Apartment from "../../components/apartment/apartmentForm/Apartment";

function ApartmentPage(props) {
  const { history } = props;

  return (
    <div>
      <Apartment history={history} />
    </div>
  );
}

export default ApartmentPage;
