const Brand = require("./../db/brand");
const User = require("./../db/user");
const Product = require("./../db/product");
const Category = require("./../db/category");
const bcrypt = require("bcrypt");

async function seedData() {
  try {
    // Seeding Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const adminData = {
        name: "Admin",
        email: "admin@test.com",
        password: "12345",
      };

      adminData.password = await bcrypt.hash(adminData.password, 10);

      await User.create({
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        isAdmin: true,
      });

      console.log("Admin user inserted successfully.");
    }

    // Seeding Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany([
        { name: "Electronics" },
        { name: "Fashion" },
      ]);
      console.log("Categories inserted successfully.");
    }

    // Seeding Brands
    const brandCount = await Brand.countDocuments();
    if (brandCount === 0) {
      await Brand.insertMany([
        { name: "Samsung" },
        { name: "Nike" },
      ]);
      console.log("Brands inserted successfully.");
    }

    // Seeding Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const category = await Category.findOne();
      const brand = await Brand.findOne();

      if (!category || !brand) {
        console.error("Category or Brand not found. Cannot insert products.");
        return;
      }

      await Product.insertMany([
        {
          name: "Smartphone",
          shortDescription: "A powerful smartphone with advanced features.",
          description:
            "This smartphone offers a stunning display, high-performance processor, and long-lasting battery life.",
          price: 500,
          discount: 10,
          images: [
            "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/j/a/b/-original-imah83eztbdcsknu.jpeg?q=70&crop=false",
          ],
          categoryId: category._id,
          brandId: brand._id,
          isFeatured: true,
          isNewProduct: true,
        },
        {
          name: "Wireless Headphones",
          shortDescription: "Noise-canceling wireless headphones.",
          description:
            "Experience immersive sound quality with advanced noise-canceling technology and long battery life.",
          price: 900,
          discount: 20,
          images: [
            "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/i/f/o/ipky-mtog055g-kwine-case-original-imah87fwnhrqmg3b.jpeg?q=70&crop=false",
          ],
          categoryId: category._id,
          brandId: brand._id,
          isFeatured: true,
          isNewProduct: true,
        },
        {
          name: "Protective Phone Case",
          shortDescription: "Durable and stylish phone case.",
          description:
            "This case provides excellent protection against drops and scratches while maintaining a sleek design.",
          price: 500,
          discount: 0,
          images: [
            "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/j/l/e/nn-candy-rd-12-5g-5-flipkart-smartbuy-original-imah895yqm2z7quh.jpeg?q=70&crop=false",
          ],
          categoryId: category._id,
          brandId: brand._id,
          isFeatured: true,
          isNewProduct: true,
        },
        {
          name: "Men's Casual Shirt",
          shortDescription: "Comfortable and stylish casual shirt.",
          description:
            "A perfect addition to your wardrobe, made with premium quality fabric for all-day comfort.",
          price: 500,
          discount: 0,
          images: [
            "https://rukminim2.flixcart.com/image/832/832/kdrpksw0-0/shirt/5/n/r/40-441001732med-grey-john-players-original-imafuhzjamfkfret.jpeg?q=70&crop=false",
          ],
          categoryId: category._id,
          brandId: brand._id,
          isFeatured: true,
          isNewProduct: true,
        },
      ]);

      console.log("Products inserted successfully.");
    }
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
}

module.exports = seedData;
