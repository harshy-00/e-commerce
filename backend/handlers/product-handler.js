const Product = require("../db/product"); // Fixed path formatting

// Add a new product
async function addProduct(model) {
  try {
    const product = new Product({ ...model });
    await product.save();
    return product.toObject();
  } catch (error) {
    throw new Error("Error adding product: " + error.message);
  }
}

// Update an existing product
async function updateProduct(id, model) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, model, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct.toObject();
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
}

// Delete a product
async function deleteProduct(id) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
}

// Get all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      throw new Error("No products found");
    }
    return products.map((product) => product.toObject());
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

// Get a product by ID
async function getProduct(id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product.toObject();
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
}

// Get new products
async function getNewProducts() {
  try {
    const newProducts = await Product.find({ isNewProduct: true });
    if (newProducts.length === 0) {
      throw new Error("No new products found");
    }
    return newProducts.map((product) => product.toObject());
  } catch (error) {
    throw new Error("Error fetching new products: " + error.message);
  }
}

// Get featured products
async function getFeaturedProducts() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    if (featuredProducts.length === 0) {
      throw new Error("No featured products found");
    }
    return featuredProducts.map((product) => product.toObject());
  } catch (error) {
    throw new Error("Error fetching featured products: " + error.message);
  }
}

// Get products for listing with filters, pagination, and sorting
async function getProductForListing(
  searchTerm,
  categoryId,
  page = 1,
  pageSize = 10,
  sortBy = "price",
  sortOrder = -1,
  brandId
) {
  try {
    let queryFilter = {};

    // Apply search term filter
    if (searchTerm) {
      queryFilter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { shortDescription: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Apply category and brand filters
    if (categoryId) queryFilter.categoryId = categoryId;
    if (brandId) queryFilter.brandId = brandId;

    // Get filtered and sorted products with pagination
    const products = await Product.find(queryFilter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (products.length === 0) {
      throw new Error("No products found for the given filters");
    }

    return products.map((product) => product.toObject());
  } catch (error) {
    throw new Error("Error fetching products for listing: " + error.message);
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
