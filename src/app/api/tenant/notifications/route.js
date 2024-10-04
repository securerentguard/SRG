import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Tenant from '@/models/Tenant';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader) {
    return new Response(JSON.stringify({ message: 'Authorization header missing.' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];  // Expecting 'Bearer <token>'
  
  if (!token) {
    return new Response(JSON.stringify({ message: 'Token missing.' }), { status: 401 });
  }

  try {
    // Verify JWT Token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Connect to the database
    await connectToDatabase();

    // Find the tenant by decoded ID from token
    const tenant = await Tenant.findById(decoded.id).select('notifications');
    
    if (!tenant) {
      return new Response(JSON.stringify({ message: 'Tenant not found.' }), { status: 404 });
    }

    // Return notifications
    return new Response(JSON.stringify({ notifications: tenant.notifications }), { status: 200 });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return new Response(JSON.stringify({ message: 'Token expired.' }), { status: 401 });
    } else if (error.name === 'JsonWebTokenError') {
      return new Response(JSON.stringify({ message: 'Invalid token.' }), { status: 401 });
    }

    console.error('Error fetching notifications:', error);
    return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
}
