import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Col, Row } from "antd";
import MainLayout from "../components/MainLayout";
import Item from "../components/Item";

const watchImage =
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-digitalmat-gallery-1-202309?wid=728&hei=666&fmt=jpeg&qlt=90&.v=1692603382757";
const macImage =
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-50-compare-models-202310?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1697909996238";
const phoneImage =
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202309_GEO_US?wid=400&hei=260&fmt=png-alpha&.v=1692971740190";

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("watch");
  const dispatch = useDispatch();
  // api url
  const apiUrl = import.meta.env.VITE_API_URL;

  const categories = [
    {
      name: "watch",
      imageURL: watchImage,
    },
    {
      name: "Mac Book",
      imageURL: macImage,
    },
    {
      name: "I Phone",
      imageURL: phoneImage,
    },
  ];

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    Axios.get(`${apiUrl}/items/get-all-items`)
      .then((response) => {
        setItemsData(Array.isArray(response.data) ? response.data : []);
        dispatch({ type: "hideLoading" });
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <MainLayout>
      <div className="category-container">
        {categories.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategory(category.name)}
              className={`category ${
                selectedCategory === category.name && "selected-category"
              }`}
            >
              <img src={category.imageURL} height="60" width="60" />
            </div>
          );
        })}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => {
            return (
              <Col xs={24} lg={6} md={12} sm={6} key={item._id}>
                <Item item={item} key={item._id} />
              </Col>
            );
          })}
      </Row>
    </MainLayout>
  );
};

export default HomePage;
