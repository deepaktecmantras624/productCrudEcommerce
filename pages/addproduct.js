import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
    const [productId, setProductId] = useState(uuidv4());
    const [productData, setProductData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    General: {
      productName: "",
      description: "",
      metaTagTitle: "",
      metaTagDescription: "",
    },
    Data: {
      modelName: "",
      sku: "",
      mpn: "",
      upc: "",
      price: "",
      quantity: "",
      minimumQuantity: "",
      outOfStockStatus: "",
      date: "",
    },
    Specification: {
      lengths: "",
      widths: "",
      heights: "",
      dimensionClass: "",
      weight: "",
      weightClass: "",
      status: "",
      lengths: "",
      widths: "",
      heights: "",
      dimensionClass: "",
    },
    Image:{  thumbnail: "", 

    uploadedImages: [], }
  
  });

  console.log("🚀 ~ file: addproduct.js:39 ~ AddProduct ~ thumbnail:", formData)

  useEffect(() => {
    const storedData = localStorage.getItem("productFormData") 
    if (storedData) {
      setProductData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Load data based on the current product ID
    const currentProduct = productData.find(product => product.id === productId);
    if (currentProduct) {
      setFormData(currentProduct.data);
    }
  }, [productId, productData]);


  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleInputChange = (tab, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        [field]: value,
      },
    }));
  };
  const handleSave = () => {
    console.log("Form data saved:", formData);
const optionId=uuidv4()
 const newOption={
    id:optionId,
    general:formData.General,
    data:formData.Data,
    specification:formData.Specification,
    images:formData.Image
 }
setProductData([...productData, newOption])
    // reset the values

    setFormData({
        General: {
          productName: "",
          description: "",
          metaTagTitle: "",
          metaTagDescription: "",
        },
        Data: {
          modelName: "",
          sku: "",
          mpn: "",
          upc: "",
          price: "",
          quantity: "",
          minimumQuantity: "",
          outOfStockStatus: "",
          date: "",
        },
        Specification: {
          lengths: "",
          widths: "",
          heights: "",
          dimensionClass: "",
          weight: "",
          weightClass: "",
          status: "",
        },
        Image: {
          thumbnail: "",
          uploadedImages: [],
        },
        // Add more tabs and fields as needed
      });

      const optionData=JSON.parse(localStorage.getItem("productFormData")) || []
      localStorage.setItem("productFormData", JSON.stringify([...productData, newOption]));
  };



const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      Image: {
        ...prevData.Image,
        uploadedImages: [...(prevData.Image.uploadedImages || []), ...newImages],
      },
    }));
    const storedImages = JSON.parse(localStorage.getItem("image")) || [];
    localStorage.setItem("image", JSON.stringify([...storedImages, ...newImages]));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    const thumbnailURL = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      Image: {
        ...prevData.Image,
        thumbnail: thumbnailURL,
      },
    }));
  
    localStorage.setItem("thumbnail", JSON.stringify(thumbnailURL));
  };
  const handleRemove = (index) => {
    const updatedImages = [...formData.Image.uploadedImages];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      Image: {
        ...prevData.Image,
        uploadedImages: updatedImages,
      },
    }));
    localStorage.setItem("image", JSON.stringify(updatedImages));
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md text-gray-800">
<Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/productlist"
      >
        Go to Product List
      </Link>

      <div className="flex justify-between items-center mb-4">
        <p className="text-4xl text-blue-700 font-bold">Add Product</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="flex mb-4">
        <div
          className={`cursor-pointer mr-4 py-2 px-4 rounded ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabChange(1)}
        >
          General
        </div>
        <div
          className={`cursor-pointer py-2 px-4 rounded ${
            activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabChange(2)}
        >
          Data
        </div>
        <div
          className={`cursor-pointer py-2 ml-4 px-4 rounded ${
            activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabChange(3)}
        >
          Specification
        </div>
        <div
          className={`cursor-pointer py-2 ml-4 px-4 rounded ${
            activeTab === 4 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabChange(4)}
        >
          Images
        </div>
        {/* Add more tabs as needed */}
      </div>

      <div>
        {activeTab === 1 && (
          <div>
            <label className="block mb-2">Product Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData.General.productName}
              onChange={(e) =>
                handleInputChange("General", "productName", e.target.value)
              }
            />
            <label className="block mb-2">Description:</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.General.description}
              onChange={(e) =>
                handleInputChange("General", "description", e.target.value)
              }
            />
            <label className="block mb-2">Meta Tag Title:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData.General.metaTagTitle}
              onChange={(e) =>
                handleInputChange("General", "metaTagTitle", e.target.value)
              }
            />
            <label className="block mb-2">Meta Tag Description:</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.General.metaTagDescription}
              onChange={(e) =>
                handleInputChange(
                  "General",
                  "metaTagDescription",
                  e.target.value
                )
              }
            />
          </div>
        )}

        {activeTab === 2 && (
          <div>
            {/* Model Section */}
            <div>
              <h1 className="text-3xl underline text-gray-700">Model</h1>
              <label className="block mb-2">Model Name:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.modelName}
                onChange={(e) =>
                  handleInputChange("Data", "modelName", e.target.value)
                }
              />
              <label className="block mb-2">Stock Keeping Unit(SKU):</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.Data.sku}
                onChange={(e) =>
                  handleInputChange("Data", "sku", e.target.value)
                }
              />{" "}
              <label className="block mb-2">
                Manufacture Part Number(MPN):
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.mpn}
                onChange={(e) =>
                  handleInputChange("Data", "mpn", e.target.value)
                }
              />
              <label className="block mb-2">Universal Product Code(UPC):</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.Data.upc}
                onChange={(e) =>
                  handleInputChange("Data", "upc", e.target.value)
                }
              />
            </div>

            {/* Price Section */}
            <div>
              <h1 className="text-3xl underline text-gray-700">Price</h1>

              <label className="block mb-2">Price:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.price}
                onChange={(e) =>
                  handleInputChange("Data", "price", e.target.value)
                }
              />
            </div>
            {/* Stock Section */}
            <div>
              <h1 className="text-3xl underline text-gray-700">Stock</h1>

              <label className="block mb-2">Quantity:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.quantity}
                onChange={(e) =>
                  handleInputChange("Data", "quantity", e.target.value)
                }
              />
              <label className="block mb-2">Minimum Quantity:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.minimumQuantity}
                onChange={(e) =>
                  handleInputChange("Data", "minimumQuantity", e.target.value)
                }
              />
              <label className="block mb-2">Out Of Stock Status:</label>
              <select
                value={formData.Data.outOfStockStatus}
                onChange={(e) =>
                  handleInputChange("Data", "outOfStockStatus", e.target.value)
                }
              >
                <option>---None---</option>
                <option>2-3days</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
                <option>Pre-Order</option>
              </select>
              <label className="block mb-2">Date Available:</label>
              <input
                type="date"
                className="w-full border p-2 rounded mb-4"
                value={formData.Data.date}
                onChange={(e) =>
                  handleInputChange("Data", "date", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {/* Specification Section */}
        {activeTab === 3 && (
          <div>
            <label className="block mb-2">Dimensions(L X W X H):</label>
            <div className="flex">
              {/* length */}
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Specification.lengths}
                placeholder="length"
                onChange={(e) =>
                  handleInputChange("Specification", "lengths", e.target.value)
                }
              />
              {/* width */}
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Specification.widths}
                placeholder="width"
                onChange={(e) =>
                  handleInputChange("Specification", "widths", e.target.value)
                }
              />
              {/* height */}
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.Specification.heights}
                placeholder="height"
                onChange={(e) =>
                  handleInputChange("Specification", "heights", e.target.value)
                }
              />
            </div>

            <label className="block mb-2">Dimension Class:</label>
            <select
              value={formData.Specification.dimensionClass}
              onChange={(e) =>
                handleInputChange(
                  "Specification",
                  "dimensionClass",
                  e.target.value
                )
              }
            >
              <option>---None---</option>
              <option>Centimeter</option>
              <option>Milimeter</option>
              <option>Inch</option>
            </select>

            <label className="block mb-2">Weight:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData.Specification.weight}
              onChange={(e) =>
                handleInputChange("Specification", "weight", e.target.value)
              }
            />
            <label className="block mb-2">Weight Class:</label>
            <select
              value={formData.Specification.weightClass}
              onChange={(e) =>
                handleInputChange(
                  "Specification",
                  "weightClass",
                  e.target.value
                )
              }
            >
              <option>---None---</option>
              <option>Kilogram</option>
              <option>Gram</option>
              <option>Pound</option>
              <option>Ounce</option>
            </select>

            <label className="block mb-2">Status:</label>
            <select
              value={formData.Specification.status}
              onChange={(e) =>
                handleInputChange("Specification", "status", e.target.value)
              }
            >
              <option>---None---</option>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        )}


        {/* Image Section */}
        {activeTab === 4 && (
          <div className="container mx-auto my-8 p-8 bg-gray-100 rounded shadow-lg">
            <h2 className="text-2xl font-bold mt-8">Thumbnail Image</h2>
            <input
              type="file"
              onChange={handleThumbnailUpload}
           
              className="mb-4 border border-gray-300 p-2"
            />
            
              <div className="w-1/4 p-2">
                <img
                src={formData.Image?.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Image Upload and Display
            </h1>
            <input
              type="file"
              onChange={handleUpload}
              
              multiple
              className="mb-4 border border-gray-300 p-2"
            />
            <div className="flex flex-wrap -mx-2">
              {formData.Image && formData.Image.uploadedImages?.map((image, index) => (
                <div key={index} className="relative w-1/4 p-2">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemove(index)}
                    title="Remove Image"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
