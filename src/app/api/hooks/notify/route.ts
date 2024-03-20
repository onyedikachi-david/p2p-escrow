// {
//   "chain": "stacks",
//   "uuid": "1",
//   "name": "Lorem ipsum",
//   "version": 1,
//   "networks": {
//     "testnet": {
//       "if_this": {
//         "scope": "print_event",
//         "contract_identifier": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.monkey-sip09",
//         "contains": "exchange"
//       },
//       "then_that": {
//         "http_post": {
//           "url": "http://localhost:3000/api/v1/hooks/notify",
//           "authorization_header": "Bearer cn389ncoiwuencr"
//         }
//       },
//       "start_block": 10200,
//       "expire_after_occurrence": 5
//     }
//   }
// }

// export async function POST(request: Request) {
//     // will be called by chain hooks IFTTT, with request-d in body param.

//     // add the request to a db
// it will call the read-only function to get merchant-id-count

// then it will call get-merchant-details for each from 0..merchant-id-count

// it will then send an email notification to the merchants with request-id
// }

import { db } from "./db"; // Import your database interface

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
