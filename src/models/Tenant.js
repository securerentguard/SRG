import mongoose from "mongoose";
import bcrypt from "bcrypt";

const TenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true, // Email must be unique, but not required
    },
    phone: {
      type: String,
    },
    contracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract", // Reference to Contract schema
      },
    ],
    notifications: [
      {
        message: { type: String },   // Notification message
        date: { type: Date, default: Date.now }, // Notification creation date
        read: { type: Boolean, default: false }, // Mark notification as read/unread
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Password Hashing Middleware
TenantSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password Comparison Method
TenantSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);
