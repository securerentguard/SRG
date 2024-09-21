import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "condo", "duplex"],
      required: false,
    },
    features: {
      units: {
        type: Number,
        required: false,
      },
      bedrooms: {
        type: Number,
        required: false,
      },
      bathrooms: {
        type: Number,
        required: false,
      },
      squareFootage: {
        type: Number,
        required: false,
      },
    },
    amenities: {
      pool: {
        type: Boolean,
        default: false,
      },
      gym: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      laundry: {
        type: Boolean,
        default: false,
      },
    },
    images: {
      type: [String], // Array of image URLs or file paths
      required: false,
    },
    propertyManagement: {
      manager: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
    mortgageInfo: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
