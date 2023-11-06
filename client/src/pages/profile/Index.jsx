import { Tabs } from "antd";
import { useState } from "react";
import AddProduct from "./AddProduct";
import General from "./General";
import Products from "./Products";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Sell Products",
      children: <AddProduct setActiveTabKey={setActiveTabKey} />,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={(key) => setActiveTabKey(key)}
      items={items}
      tabPosition="left"
      size="large"
      // activeKey="2"
    />
  );
};

export default Index;
