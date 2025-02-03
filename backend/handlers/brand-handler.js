const Brand = require("../db/brand"); // Fixed path formatting

// Get all brands
async function getBrands() {
  try {
    const brands = await Brand.find();
    return brands.map((brand) => brand.toObject());
  } catch (error) {
    throw new Error("Error fetching brands: " + error.message);
  }
}

// Get a single brand by ID
async function getBrand(id) {
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    return brand.toObject();
  } catch (error) {
    throw new Error("Error fetching brand: " + error.message);
  }
}

// Add a new brand
async function addBrand(model) {
  try {
    // Check if brand with the same name already exists
    const existingBrand = await Brand.findOne({ name: model.name });
    if (existingBrand) {
      throw new Error("Brand with this name already exists");
    }

    const brand = new Brand({ name: model.name });
    await brand.save();
    return brand.toObject();
  } catch (error) {
    throw new Error("Error adding brand: " + error.message);
  }
}

// Update an existing brand
async function updateBrand(id, model) {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, model, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedBrand) {
      throw new Error("Brand not found");
    }

    return updatedBrand.toObject();
  } catch (error) {
    throw new Error("Error updating brand: " + error.message);
  }
}

// Delete a brand
async function deleteBrand(id) {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      throw new Error("Brand not found");
    }
    return { message: "Brand deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting brand: " + error.message);
  }
}

module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand };
