import { message } from "antd";
import moment from "moment";

import { deleteProduct } from "../../apicalls/product";
const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts
}) => {
  const editHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
  };

  const deleteHandler = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
      if (response.isSuccess) {
      
        message.success(response.message);
        getProducts();
      
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-center text-3xl m-3 font-semibold">Product List</p>
        {products.length > 0 ? (
          <div>
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sale Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {products.map((product) => (
                    <tr
                      className="bg-white border-b  dark:border-gray-700"
                      key={product._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        {moment(product.createdAt).format("LLLL")}
                      </td>
                      <td className="px-6 py-4">
                        {product.status === "pending" ? (
                          <span className="bg-yellow-400 p-1 rounded text-xs font-bold text-white">
                            {product.status}
                          </span>
                        ) : (
                          <span className="bg-green-400 p-1 rounded text-xs font-bold text-white">
                            {product.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="font-medium text-blue-600  hover:underline mr-2"
                          onClick={() => {
                            editHandler(product._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium text-red-600  hover:underline"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center font-bold text-3xl mt-7">
            No Product added Yet!
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
