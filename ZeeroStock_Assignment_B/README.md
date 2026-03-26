# 📦 Inventory API – README

## 📌 Database Schema Explanation

This project uses **MongoDB (NoSQL)** with two collections:

### 1. Suppliers Collection

Stores supplier details:

* `name`: Name of the supplier
* `city`: City where the supplier is located

Each document represents a single supplier.

---

### 2. Inventory Collection

Stores product inventory listed by suppliers:

* `supplier_id`: Reference to the supplier (`ObjectId`)
* `product_name`: Name of the product
* `quantity`: Available stock (must be ≥ 0)
* `price`: Price per unit (must be > 0)

---

### Relationship

* One supplier can have **multiple inventory items**
* This is implemented using a **reference (`supplier_id`)** instead of embedding
* Ensures better scalability and avoids duplication

---

## ⚙️ Why NoSQL (MongoDB)?

MongoDB was chosen for the following reasons:

* **Flexible Schema**: Easy to extend inventory fields without migrations
* **Scalability**: Suitable for growing datasets and distributed systems
* **Aggregation Pipeline**: Efficient for complex queries like grouping inventory by supplier
* **Faster Development**: No rigid schema constraints during early development

---

## 🚀 Indexing / Optimization Suggestion

### Index on `supplier_id` in Inventory Collection

```js
inventorySchema.index({ supplier_id: 1 });
```

### Why this helps:

* Speeds up `$lookup` operations between inventory and suppliers
* Improves performance of grouping and aggregation queries
* Optimizes filtering by supplier

---

## ✅ Summary

* Clean separation of suppliers and inventory collections
* Proper validation ensures data integrity
* Indexed queries improve performance for real-world scalability
