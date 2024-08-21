import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM employees`;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
