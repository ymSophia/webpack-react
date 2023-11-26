import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  return <div>{id}</div>;
};

export default Product;
