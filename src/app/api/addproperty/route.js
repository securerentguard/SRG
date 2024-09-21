import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/models/Property';
import Owner from '@/models/Owner';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req) {
  // Extract token from headers
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'Authorization token is required.' }), { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    

    if (!decoded) {
      return new Response(JSON.stringify({ message: 'Invalid token.' }), { status: 401 });
    }

    // Extract data from request body
    const {
      name,
      address,
      street,
      city,
      state,
      postalCode,
      propertyType,
      features,
      amenities,
      images,
      propertyManagement,
      mortgageInfo,
      notes,
    } = await req.json();

    // Check for required fields
    if (!name || !address || !propertyType) {
      return new Response(JSON.stringify({ message: 'Name, address, and property type are required.' }), { status: 400 });
    }

    await connectToDatabase();

    // Create new property using the Mongoose model
    const newProperty = await Property.create({
      name,
      address,
      street,
      city,
      state,
      postalCode,
      propertyType,
      features,
      amenities,
      images,
      propertyManagement,
      mortgageInfo,
      notes,
    });

    // Find the owner by the decoded token (owner's ID is in the token)
    const owner = await Owner.findById(decoded.id);

    if (!owner) {
      return new Response(JSON.stringify({ message: 'Owner not found.' }), { status: 404 });
    }

    // Add the property ID to the owner's properties array
    owner.properties.push(newProperty._id);

    // Save the updated owner
    await owner.save();

    return new Response(JSON.stringify({ message: 'Property added successfully.', property: newProperty }), { status: 201 });
  } catch (error) {
    console.error('Add property error:', error);
    return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
}
