import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Owner from "@/models/Owner";
import Contract from "@/models/Contract"; // Make sure to import your Contract model

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract Bearer token from Authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    const ownerId = decoded.id;

    // Fetch owner by ID and populate contracts
    const owner = await Owner.findById(ownerId).populate("contracts");

    if (!owner) {
      return new Response(JSON.stringify({ message: "Owner not found" }), { status: 404 });
    }

    // Return the contracts associated with the owner
    return new Response(JSON.stringify(owner.contracts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
