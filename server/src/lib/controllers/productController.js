const prisma = require("../lib/prisma");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      image,
      stock,
      categoryId,
      featured,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        image,
        stock,
        categoryId,
        featured: Boolean(featured),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
