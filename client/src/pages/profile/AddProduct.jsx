import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

import {
  sellProduct,
  getOldProduct,
  updateProduct,
} from "../../apicalls/product";

const AddProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();

  const [sellerId, setSellerId] = useState(null);

  const categoriesOptions = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Clothing",
      label: "Clothing",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Beauty",
      label: "Beauty",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Automotive",
      label: "Automotive",
    },
    {
      value: "Jewelry",
      label: "Jewelry",
    },
    {
      value: "Toys",
      label: "Toys",
    },
  ];

  const checkboxOptions = [
    {
      value: "Accessories",
      label: "Accessories",
    },
    {
      value: "Warranty",
      label: "Warranty",
    },
    {
      value: "Voucher",
      label: "Voucher",
    },
  ];

  const onFinishHandler = async (values) => {
    try {
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        response = await updateProduct(values);
      } else {
        response = await sellProduct(values);
      }

      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSuccess) {
        message.success("Edit mode on!");
        const { name, description, price, category, usedFor, details, seller } =
          response.productDoc;
        setSellerId(seller);
        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_used_for: usedFor,
          product_details: details,
        };
        // console.log(modifiedProduct);
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(
    (_) => {
      if (editMode) {
        getOldProductData();
      } else {
        form.resetFields();
      }
    },
    [editMode]
  );

  return (
    <section>
      <h1 className="text-center p-2 text-3xl font-semibold">
        {editMode ? "Update Your Product Here!" : "What do you want to Sell?"}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please Enter your Product Name",
            },
          ]}
        >
          <Input
            placeholder="Product Name..."
            className=" hover:font-bold"
          ></Input>
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please Enter your Product Description",
            },
          ]}
        >
          <TextArea
            className="hover:font-bold"
            rows={10}
            placeholder="Product Description"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Product Price"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please Enter your Product Price",
                },
              ]}
            >
              <Input
                type="number"
                className="hover:font-bold"
                placeholder="Product Price"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Product Category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please Choose a product category",
                },
              ]}
            >
              <Select defaultValue={""} options={categoriesOptions}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Used for"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please mention the used period of the product",
                },
              ]}
            >
              <Input type="text" placeholder="Product Used Time" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="product_details" label="Check if you have">
          <Checkbox.Group
            options={checkboxOptions}
            defaultValue={[""]}
          ></Checkbox.Group>
        </Form.Item>

        <button className="flex font-medium text-lg text-center justify-center p-1 gap-1 rounded-md items-center bg-violet-400 w-full">
          <SquaresPlusIcon width={21} />
          {
            editMode ? "Update Product"  : "Sell Product"
         }
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
