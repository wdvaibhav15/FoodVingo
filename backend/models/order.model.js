import mongoose from "mongoose";

const shopOderItemSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})
const shopOrderSchema = new mongoose.Schema({
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subTotal: { type: Number, required: true },
    shopOrderItem: [shopOderItemSchema]

},[{timestamps: true}])
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String,enum:["COD","Online"], required: true },
    deliveryAddress: { text: String, latitude: Number, longitude: Number, required: true },
    totalAmount: { type: Number, required: true },
    shopOrder: [shopOrderSchema]
},[{timestamps: true}]);

const Order = mongoose.model("Order", orderSchema);
export default Order;