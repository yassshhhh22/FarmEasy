import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    terms: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Delivery date must be in the future",
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
contractSchema.index({ buyer: 1, status: 1 });
contractSchema.index({ farmer: 1, status: 1 });
contractSchema.index({ status: 1 });

export default mongoose.model("Contract", contractSchema);
