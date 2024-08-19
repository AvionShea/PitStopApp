import { data } from '@/constants';
import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {

try{
    const sql = neon(`${process.env.DATABASE_URL}`);

    const {firstName, lastName, email, phoneNumber, clerkId} = await request.json();

    if(!firstName || !lastName || !email || !phoneNumber || !clerkId){
        return Response.json( 
            { error: "Missing required fields" },
            { status: 400 },
        );
    }

    const response = await sql `
    INSERT INTO users (
    first_name,
    last_name,
    email,
    phone_number,
    clerk_id
    )
    
    VALUES (
    ${firstName},
    ${lastName},
    ${email},
    ${phoneNumber},
    ${clerkId}
    );`;

    return new Response(JSON.stringify({data: response}), {
        status: 201,
    });  
    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    };
};