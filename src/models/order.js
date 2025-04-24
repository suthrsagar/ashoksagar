import mongoose from "mongoose";
// src/controllers/order/order.js

const orderSchema = new mongoose.Schema({
  oderId: { type: String, required: true, unique: true },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliverypartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPartner",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  idems: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],

  deliverylocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    addreess: { type: String },
  },
  pickupLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    addreess: { type: String },
  },

  deliverypersonlocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    addreess: { type: String },
  },

  status: {
    type: String,
    enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
    default: "available",
  },
  totalprice: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const sequenceValue = await getNextSequenceValue("orderId");
    this.oderId = 'ORDR${sequenceValue.toString().padStart(5, "0")}';
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
