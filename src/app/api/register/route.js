import connectToDatabase from '@/lib/mongodb';
import Owner from '@/models/Owner'; // Use Owner model for registration

export async function POST(req) {
  const { name, email, password, address, phone } = await req.json();

  console.log("Received registration details for: " + name + " " + email);

  // Check if required fields are present
  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: 'Name, email, and password are required.' }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // Check if the email is already registered
    const existingOwner = await Owner.findOne({ email });

    if (existingOwner) {
      return new Response(
        JSON.stringify({ message: 'Email is already registered.' }),
        { status: 400 }
      );
    }

    // Create new owner, relying on the schema's pre-save hook to hash the password
    const newOwner = new Owner({
      name,
      email,
      password,
      address,
      phone,
    });

    await newOwner.save();

    return new Response(
      JSON.stringify({ message: 'Registration successful.' }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(
      JSON.stringify({ message: 'Server error.' }),
      { status: 500 }
    );
  }
}
