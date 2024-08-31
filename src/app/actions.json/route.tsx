
import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async (req: Request) => {
  const payload: ActionsJson = {
    rules: [
      // Map all root level routes to an action
      {
        pathPattern: "/",
        apiPath: `http://localhost:3000/api/create/action`,
      },
      {
        pathPattern: "/vote/*",
        apiPath: `http://localhost:3000/api/vote/*/action`,
      },
     
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;