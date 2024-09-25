import connectToDatabase from '@/lib/mongodb';
import Tenant from '@/models/Tenant';

export async function POST(req) {
  const { name, email, password, address, phone } = await req.json();

  // Validate required fields
  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: 'Email and password are required.' }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Check if the tenant's email is already registered
    const existingTenant = await Tenant.findOne({ email });

    if (existingTenant) {
      return new Response(
        JSON.stringify({ message: 'Email is already registered.' }),
        { status: 409 } // Conflict
      );
    }

    // Create a new tenant
    const newTenant = new Tenant({
      name,
      email,
      password, // Password will be hashed by the pre-save hook
      address,
      phone,
    });

    // Save the new tenant to the database
    await newTenant.save();

    // Exclude the password from the response
    const tenantData = {
      name: newTenant.name,
      email: newTenant.email,
      address: newTenant.address,
      phone: newTenant.phone,
    };

    return new Response(
      JSON.stringify({
        message: 'Tenant registration successful.',
        tenant: tenantData, // Returning tenant data without the password
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during tenant registration:", error);
    return new Response(
      JSON.stringify({ message: 'Server error.' }),
      { status: 500 }
    );
  }
}
