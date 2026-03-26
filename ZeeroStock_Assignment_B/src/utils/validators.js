const validateInventory = ({ quantity, price }) => {
  if (quantity < 0) return "Quantity must be >= 0";
  if (price <= 0) return "Price must be > 0";
  return null;
};

module.exports = { validateInventory };