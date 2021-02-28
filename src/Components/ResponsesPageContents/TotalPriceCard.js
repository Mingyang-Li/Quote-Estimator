import React, { useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";

const TotalPriceCard = () => {
  const { totalPrice } = useContext(GlobalContext);
  return (
    <>
      <h1>TotalPriceCard</h1>
      <h2>Total price: {totalPrice}</h2>
    </>
  );
};

export default TotalPriceCard;
