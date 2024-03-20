import { db } from "../notify/db";

export async function POST(request: Request) {
  // will be called by chain hooks IFTTT, with request-d in body param.

  try {
    // Parse the request body as JSON
    const requestData = await request.json();

    // Add the request data to the database
    await db.add("requests", requestData); // Adjust this line based on your actual database method

    // Respond with a success message
    return new Response(
      JSON.stringify({ success: true, message: "Request added successfully." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding request to the database:", error);

    // Respond with an error message
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add request." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
