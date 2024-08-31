import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      order_id,
      fuel_grade,
      fuel_price,
      gallons_pumped,
      destination_address,
      destination_latitude,
      destination_longitude,
      car_make,
      car_model,
      car_color,
      customer_license_plate,
      actual_order_delivery_time,
      delivery_price,
      payment_status,
      card_used,
      action_status,
      employee_id,
      user_id,
    } = body;

    if (
      !order_id ||
      !fuel_grade ||
      !fuel_price ||
      !gallons_pumped ||
      !destination_address ||
      !destination_latitude ||
      !destination_longitude ||
      !car_make ||
      !car_model ||
      !car_color ||
      !customer_license_plate ||
      !actual_order_delivery_time ||
      !delivery_price ||
      !card_used ||
      !action_status ||
      !employee_id ||
      !payment_status ||
      !user_id
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
        INSERT INTO deliveries ( 
        order_id,
        fuel_grade,
        fuel_price,
        gallons_pumped,
        destination_address,
        destination_latitude,
        destination_longitude,
        car_make,
        car_model,
        car_color,
        customer_license_plate,
        actual_order_delivery_time,
        delivery_price,
        payment_status,
        card_used,
        action_status,
        employee_id,
        user_id,
        ) VALUES (
          ${order_id},
          ${fuel_grade},
          ${fuel_price},
          ${gallons_pumped},
          ${destination_latitude},
          ${destination_longitude},
          ${destination_address},
          ${car_make},
          ${car_model},
          ${car_color},
          ${customer_license_plate}
          ${actual_order_delivery_time},
          ${delivery_price},
          ${payment_status},
          ${card_used},
          ${action_status},
          ${employee_id},
          ${user_id}
        )
        RETURNING *;
        `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data into recent_deliveries:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
