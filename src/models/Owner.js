import mongoose from "mongoose";
import bcrypt from "bcrypt";

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property", // Foreign key from Property schema
      },
    ],
    contracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract", // Foreign key from Contract schema
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Password Hashing Middleware
OwnerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password Comparison Method
OwnerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);
