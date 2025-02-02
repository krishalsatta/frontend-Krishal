import React, { useEffect, useState } from "react";
import { getProductApi } from "../../Apis/Api";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    getProductApi()
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else if (res.data.success === true) {
          console.log(res.data.products);
          // Update the products state with the fetched data
          setProducts(res.data.products);
        } else {
          toast.error("Unknown response format from the server");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });

  }, []);

  const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  return (
    <>
      <div className="all-product container pt-3">
        <div className="flex justify-between mx-2">
          <h1 className="lg:text-[22px] font-bold text-gray-700">
            All
          </h1>
          {!showAllProducts && (
            <a
              className="lg:text-[20px] text-gray-700 underline hover:text-sky-500 cursor-pointer"
              onClick={() => setShowAllProducts(true)}
            >
              View All
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-col-3 ">
          {displayedProducts.map((product) => {
            return (
              <Link key={product._id} to={`/productDetail/${product._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 overflow-hidden hover:shadow-xl">
                <img className="rounded-t-lg h-[100px] md:h-[150px] lg:h-[200px]  w-full object-cover hover:scale-110" src={product.productImage} alt="" />
                <div className="p-5">
                  <h className="mb-2 text-sm lg:text-2xl md:text-xl font-bold text-gray-900 ">{product.brandName}</h>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">{product.details}</p>
                  <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mr-2 mb-2">
                      {product.price}
                    </span>
      
                </div>
              </Link>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
}

export default AllProduct;
