import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Tenant from '@/models/Tenant';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email and password are required.' }), { status: 400 });
  }

  try {
    await connectToDatabase();

    // Find tenant by email
    const tenant = await Tenant.findOne({ email });

    if (!tenant) {
      return new Response(JSON.stringify({ message: 'Invalid email or password.' }), { status: 401 });
    }

    // Use schema's method to compare password
    const isMatch = await tenant.comparePassword(password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid password.' }), { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: tenant._id, email: tenant.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the response
    return new Response(JSON.stringify({ message: 'Login successful.', token }), { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
}
