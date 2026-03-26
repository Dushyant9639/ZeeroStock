const Inventory = require("../models/Inventory");
const Supplier = require("../models/Supplier");
const { validateInventory } = require("../utils/validators");

// POST /inventory
exports.createInventory = async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    const error = validateInventory({ quantity, price });
    if (error) return res.status(400).json({ error });

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: "Invalid supplier_id" });
    }

    const item = new Inventory({
      supplier_id,
      product_name,
      quantity,
      price
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /inventory
exports.getInventory = async (req, res) => {
  try {
    const data = await Inventory.find().populate("supplier_id").lean();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /inventory/grouped
exports.getGroupedInventory = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplier_id",
          foreignField: "_id",
          as: "supplier"
        }
      },
      { $unwind: "$supplier" },
      {
        $group: {
          _id: "$supplier._id",
          supplier_name: { $first: "$supplier.name" },
          city: { $first: "$supplier.city" },
          total_inventory_value: {
            $sum: { $multiply: ["$quantity", "$price"] }
          },
          items: {
            $push: {
              product_name: "$product_name",
              quantity: "$quantity",
              price: "$price"
            }
          }
        }
      },
      { $sort: { total_inventory_value: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};