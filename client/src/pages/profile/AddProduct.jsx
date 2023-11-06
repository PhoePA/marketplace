import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { sellProduct } from "../../apicalls/product";

const AddProduct = ({ setActiveTabKey }) => {
  const [form] = Form.useForm();
  const categoriesOptions = [
    {
      value: "electronics",
      label: "Electronics",
    },
    {
      value: "clothing",
      label: "Clothing",
    },
    {
      value: "furniture",
      label: "Furniture",
    },
    {
      value: "books",
      label: "Books",
    },
    {
      value: "beauty",
      label: "Beauty",
    },
    {
      value: "sports",
      label: "Sports",
    },
    {
      value: "automotive",
      label: "Automotive",
    },
    {
      value: "jewelry",
      label: "Jewelry",
    },
    {
      value: "toys",
      label: "Toys",
    },
  ];

  const checkboxOptions = [
    {
      value: "accessories",
      label: "Accessories",
    },
    {
      value: "warranty",
      label: "Warranty",
    },
    {
      value: "voucher",
      label: "Voucher",
    },
  ];

  const onFinishHandler = async (values) => {
    try {
      const response = await sellProduct(values);
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-center p-2 text-3xl font-semibold">
        What do you want to Sell?
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler}>
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
          Sell
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
