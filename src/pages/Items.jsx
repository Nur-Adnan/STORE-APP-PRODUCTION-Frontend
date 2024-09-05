import MainLayout from '../components/MainLayout';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  const [addItemModal, setAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  // api url
  const apiUrl = import.meta.env.VITE_API_URL;

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios.get(`${apiUrl}/items/get-all-items`).then((response) => {
      setItemsData(response.data);
      dispatch({ type: "hideLoading" });
    }).catch((error) => {
      dispatch({ type: "hideLoading" });
      console.log(error);
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt='' height='60' width='60' />
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='action-icon'>
          <EditOutlined onClick={() => {
            setEditingItem(record);
            setAddItemModal(true);
          }} />
          <DeleteOutlined onClick={() => deleteItem(record)} />
        </div>
      )
    },
  ];


  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = (values) => {

    dispatch({ type: "showLoading" });
    if (editingItem === null) {
      axios
        .post(`${apiUrl}/items/add-item`, values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddItemModal(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    }
    else {
      axios
        .post(`${apiUrl}/items/edit-item`, { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddItemModal(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    }
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios.post(`${apiUrl}/items/delete-item`, { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item Delete Successfully");
        getAllItems();
      }).catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log(error);
      });
  };


  return (
    <MainLayout>
      <div className='item-section'>
        <h1>All Product List</h1>
        <Button type='primary' onClick={() => setAddItemModal(true)}>Add Item</Button>
      </div>
      {addItemModal && (
        <Modal title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`} open={addItemModal} onCancel={() => {
          setAddItemModal(false);
          setEditingItem(null);
        }} footer={false}>
          <Form layout='vertical' onFinish={onFinish} initialValues={editingItem}>
            <Form.Item name="name" label="Product Name">
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Product Price">
              <Input />
            </Form.Item>

            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Product Category">
              <Select>
                <Select.Option value="I Phone">I PHone</Select.Option>
                <Select.Option value="watch">Watch</Select.Option>
                <Select.Option value="Mac Book">Mac Book</Select.Option>
              </Select>
            </Form.Item>

            <div className='modal-btn'>
              <Button htmlType='submit' type='primary'>Save</Button>  
            </div>
          </Form>

        </Modal>
      )}
      <Table dataSource={itemsData} columns={columns} bordered></Table>
    </MainLayout >
  );
};

export default Items;
