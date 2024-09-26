// import jwt from 'jsonwebtoken';
// import connectToDatabase from '@/lib/mongodb';
// import Contract from '@/models/Contract';
// import Tenant from '@/models/Tenant';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// export async function POST(req) {
//   // Extract token from headers
//   const token = req.headers.get('Authorization')?.split(' ')[1];

//   if (!token) {
//     return new Response(JSON.stringify({ message: 'Authorization token is required.' }), { status: 401 });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (!decoded) {
//       return new Response(JSON.stringify({ message: 'Invalid token.' }), { status: 401 });
//     }

//     // Extract data from request body
//     const {
//       propertyId,
//       tenants,
//       totalRent,
//       rentDate,
//       paymentMethod,
//       securityDeposit,
//       duration,
//       insuranceAmount,
//     } = await req.json();

//     // Check for required fields
//     if (!propertyId || !tenants || tenants.length === 0 || totalRent === undefined) {
//       return new Response(JSON.stringify({ message: 'Property ID, tenants, and total rent are required.' }), { status: 400 });
//     }

//     await connectToDatabase();

//     // Initialize arrays for tenants and tempTenants
//     const tenantIds = [];
//     const tempTenantEmails = [];

//     // Check if each tenant exists in the Tenant database
//     for (const tenant of tenants) {
//       const foundTenant = await Tenant.findOne({ email: tenant.email });
      
//       if (foundTenant) {
//         // If tenant is found, add to tenantIds array
//         tenantIds.push(foundTenant._id);
//       } else {
//         // If tenant is not found, add to tempTenants array (emails)
//         tempTenantEmails.push(tenant.email);
//       }
//     }

//     // Create a new contract
//     const newContract = await Contract.create({
//       name: `Contract for ${propertyId}`,
//       propertyId,
//       ownerId: decoded.id, // Use owner ID from the decoded token
//       tenants: tenantIds.map(id => ({ tenantId: id, rentContribution: totalRent / tenantIds.length })),
//       tempTenants: tempTenantEmails, // Store emails of tenants not found
//       totalRent,
//       rentDate,
//       paymentMethod,
//       securityDeposit,
//       duration,
//       insuranceAmount,
//     });

//     return new Response(JSON.stringify({ message: 'Contract created successfully.', contract: newContract }), { status: 201 });
//   } catch (error) {
//     console.error('Create contract error:', error);
//     return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
//   }
// }
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Contract from '@/models/Contract';
import Owner from '@/models/Owner'; // Import Owner model
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
      name, // Get the name from the request body
    } = await req.json();

    // Check for required fields
    if (!propertyId || !tenants || tenants.length === 0 || totalRent === undefined || !name) {
      return new Response(JSON.stringify({ message: 'Property ID, tenants, total rent, and name are required.' }), { status: 400 });
    }

    await connectToDatabase();

    // Initialize arrays for tenants and tempTenants
    const tenantIds = [];
    const tempTenantEmails = [];

    // Check if each tenant exists in the Tenant database
    for (const tenant of tenants) {
      const foundTenant = await Tenant.findOne({ email: tenant.email });

      if (foundTenant) {
        // If tenant is found, add to tenantIds array
        tenantIds.push(foundTenant._id);
      } else {
        // If tenant is not found, add to tempTenants array (emails)
        tempTenantEmails.push(tenant.email);
      }
    }

    // Create a new contract with the provided name
    const newContract = await Contract.create({
      name, // Use the provided name directly
      propertyId,
      ownerId: decoded.id, // Use owner ID from the decoded token
      tenants: tenantIds.map(id => ({ tenantId: id, rentContribution: totalRent / tenantIds.length })),
      tempTenants: tempTenantEmails, // Store emails of tenants not found
      totalRent,
      rentDate,
      paymentMethod,
      securityDeposit,
      duration,
      insuranceAmount,
    });

    // Update the owner to include the new contract ID
    await Owner.findByIdAndUpdate(decoded.id, {
      $push: { contracts: newContract._id }, // Push the new contract ID into the contracts array
    });

    return new Response(JSON.stringify({ message: 'Contract created successfully.', contract: newContract }), { status: 201 });
  } catch (error) {
    console.error('Create contract error:', error);
    return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
}
