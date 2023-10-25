import { Tabs } from "antd";
import AddProduct from "./AddProduct";
import Products from "./Products";

const Index = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Products",
      children: <AddProduct/>,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "Profile",
      children: "Content of Tab Pane 3",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={items} tabPosition="left"/>;
};

export default Index;
