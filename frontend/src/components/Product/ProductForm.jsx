import { useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Only allow letters, spaces, and basic punctuation
    if (/^[a-zA-Z\s.,'\-]*$/.test(value)) {
      setProductName(value);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('You can upload maximum 5 images');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviewImages = newImages.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(newPreviewImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviewImages);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (categories.includes(value)) {
      setCategories(categories.filter(cat => cat !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!productName.trim()) {
      alert('Please enter a valid product name');
      return;
    }
    
    if (categories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    const newProduct = {
      name: productName,
      categories,
      description,
      images: previewImages,
    };

    onSubmit(newProduct);
    resetForm();
  };

  const resetForm = () => {
    setProductName('');
    setCategories([]);
    setDescription('');
    setImages([]);
    setPreviewImages([]);
  };

  const categoryOptions = [
    "Cakes",
    "Cupcakes",
    "Cookies",
    "Chocolates",
    "Ice Cream",
    "Other"
  ];

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={productName}
          onChange={handleNameChange}
          className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="e.g., Chocolate Cupcake"
          required
          pattern="[a-zA-Z\s.,'\-]+"
          title="Only letters, spaces, and basic punctuation allowed"
        />
        <p className="mt-1 text-sm text-gray-500">
          Only letters, spaces, and basic punctuation (.,'-) allowed
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">
          Categories <span className="text-orange-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${option}`}
                value={option}
                checked={categories.includes(option)}
                onChange={handleCategoryChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
              />
              <label 
                htmlFor={`category-${option}`} 
                className="ml-2 block text-sm text-amber-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {categories.length > 0 && (
          <div className="mt-2 text-sm text-amber-600">
            Selected: {categories.join(', ')}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">
          Description <span className="text-orange-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          rows="3"
          placeholder="Describe your sweet product..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-orange-700 mb-1">
          Product Images (Max 5)
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="w-8 h-8 text-amber-500" />
              <p className="text-sm text-amber-500 mt-2">
                Click to upload images
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {previewImages.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;