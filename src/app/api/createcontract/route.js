import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Contract from '@/models/Contract';
import Owner from '@/models/Owner';
import Tenant from '@/models/Tenant';

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
      propertyId,
      tenants,
      totalRent,
      rentDate,
      paymentMethod,
      securityDeposit,
      duration,
      insuranceAmount,
    } = await req.json();

    // Check for required fields
    if (!propertyId || !tenants || tenants.length === 0 || totalRent === undefined) {
      return new Response(JSON.stringify({ message: 'Property ID, tenants, and total rent are required.' }), { status: 400 });
    }

    await connectToDatabase();

    // Validate tenants
    const tenantIds = [];
    for (const tenant of tenants) {
      const foundTenant = await Tenant.findOne({ email: tenant.email });
      if (!foundTenant) {
        return new Response(JSON.stringify({ message: `Tenant not found for email: ${tenant.email}` }), { status: 404 });
      }
      tenantIds.push(foundTenant._id);
    }

    // Create a new contract
    const newContract = await Contract.create({
      name: `Contract for ${propertyId}`,
      propertyId,
      ownerId: decoded.id, // Use owner ID from the decoded token
      tenants: tenantIds.map(id => ({ tenantId: id, rentContribution: totalRent / tenantIds.length })),
      totalRent,
      rentDate,
      paymentMethod,
      securityDeposit,
      duration,
      insuranceAmount,
    });

    return new Response(JSON.stringify({ message: 'Contract created successfully.', contract: newContract }), { status: 201 });
  } catch (error) {
    console.error('Create contract error:', error);
    return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
}
