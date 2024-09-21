import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // Foreign key referencing Property schema
      required: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner", // Foreign key referencing Owner schema
      required: false,
    },
    tenants: [
      {
        tenantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tenant", // Foreign key referencing Tenant schema
          required: false,
        },
        rentContribution: {
          type: Number,
          required: false,
        },
      },
    ],
    totalRent: {
      type: Number,
      required: false,
    },
    rentDate: {
      type: Date,
      required: false,
    },
    paymentMethod: {
      type: String,
      enum: ["bank transfer", "platform managed payment"],
      required: false,
    },
    securityDeposit: {
      type: Number,
      required: false,
    },
    duration: {
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
    insuranceAmount: {
      type: Number,
      default: 10, // Default insurance amount
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending", // Default to pending
      required: false,
    },
    createdByOwnerAt: {
      type: Date,
      default: Date.now, // Timestamp when created by owner
    },
    acceptedByTenantsAt: {
      type: Date,
      required: false, // Timestamp when accepted by tenants
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Export the model
export default mongoose.models.Contract ||
  mongoose.model("Contract", ContractSchema);
