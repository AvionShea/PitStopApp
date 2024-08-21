import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            deliveries.order_id,
            deliveries.fuel_grade,
            deliveries.fuel_price,
            deliveries.gallons_pumped,
            deliveries.destination_address,
            deliveries.destination_latitude,
            deliveries.destination_longitude,
            deliveries.customer_car_make,
            deliveries.customer_car_model,
            deliveries.customer_car_color,
            deliveries.customer_license_plate,
            deliveries.actual_order_delivery_time,
            deliveries.delivery_price,
            deliveries.payment_status,
            deliveries.customer_card_used,
            deliveries.action_status,
            deliveries.created_at,
            'employee', json_build_object(
                'employee_id', employees.employee_id,
                'first_name', employees.first_name,
                'last_name', employees.last_name,
                'profile_image_url', employees.profile_image_url,
                'vehicle_image_url', employees.vehicle_image_url,
                'company_vehicle_id', employees.company_vehicle_id,
                'company_license_plate', employees.company_license_plate
                'location', employees.location
                'latitude', employees.latitude
                'longitude', employees.longitude
            ) AS employee 
        FROM 
            deliveries
        INNER JOIN
            employees ON deliveries.employee_id = employees.employee_id
        WHERE 
            deliveries.user_id = ${id}
        ORDER BY 
            deliveries.created_at DESC;
        `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent deliveries:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
