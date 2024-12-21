const products = [
  { name: "product 1", price: 10, id: 3 },
  { name: "product 2", price: 20, id: 31 },
  { name: "product 3", price: 30, id: 6 },
  { name: "pizza", price: 40, id: 9 },
];
export const createProduct = (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json({ data: { products } });
};
export const getAllProducts = (req, res) => {
  res.status(200).json({ data: { products } });
};
export const getSingleProdcut = (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === +id);
  res.status(200).json({ data: { product } });
};
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const filtered=products.filter((product) => product.id !== +id);
  res.status(200).json({ data: { filtered } });
};
