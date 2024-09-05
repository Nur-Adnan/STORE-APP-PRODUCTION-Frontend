import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/MainLayout";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.root);
  const [subTotal, setSubTotal] = useState(0);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // api url
  const apiUrl = import.meta.env.VITE_API_URL;

  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity + -1 },
      });
    }
  };

  const deleteCartItem = (record) => {
    dispatch({
      type: "deleteCart",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined onClick={() => increaseQuantity(record)} />
          <b style={{ margin: "15px" }}>{record.quantity}</b>
          <MinusCircleOutlined onClick={() => decreaseQuantity(record)} />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => deleteCartItem(record)} />
      ),
    },
  ];

  // Total bill function
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubTotal(temp);
  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(
        subTotal + Number(((subTotal / 100) * 10).toFixed(2))
      ),
      userId: JSON.parse(localStorage.getItem("pos-user"))._id,
    };

    axios
      .post(`${apiUrl}/bills/charge-bill`, reqObject)
      .then(() => {
        message.success("Bill Charged Successfully");
        navigate("/bills");
      })
      .catch(() => {
        message.error("Something went wrong");
      });
  };

  return (
    <MainLayout>
      <h1 className="cart-item">Cart Page</h1>
      <Table dataSource={cartItems} columns={columns} bordered></Table>
      <div className="">
        <div className="css">
          <h3>
            SUB TOTAL: <b>{subTotal}$/-</b>
          </h3>
        </div>
        <Button type="primary" onClick={() => setBillChargeModal(true)}>
          CHARGE BILL
        </Button>
      </div>
      <Modal
        title="Charge Bill"
        open={billChargeModal}
        footer={false}
        onCancel={() => setBillChargeModal(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              SubTotal : <b>{subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
            </h2>
          </div>

          <div className="">
            <Button htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default CartPage;
