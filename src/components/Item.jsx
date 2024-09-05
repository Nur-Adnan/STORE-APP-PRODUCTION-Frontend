import { Button } from "antd";
import { useDispatch } from 'react-redux';
import "../resources/item.css";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  function addToCart() {
    dispatch({ type: "addToCart", payload: { ...item, quantity: 1 } });
  }
  return (
    <div className='item'>
      <h4>{item.name}</h4>
      <img src={item.image} alt="" width='150' height='150' />
      <h4><b>Price :</b>   {item.price} $/-</h4>
      <Button className="item-btn" onClick={() => addToCart()}>Add To Cart</Button>
    </div>
  );
};

export default Item;
