import { ActionError, ActionPostResponse, createActionHeaders, NextActionLink } from "@solana/actions"

const headers = createActionHeaders();

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });


export const POST = async (req: Request) => {
    console.log("here")
    const reqUrl = new URL(req.url);
    const url= reqUrl.searchParams.get('url');
    if (!url) {
        let actionError: ActionError = { message: `An unknown error occurred` };
        return Response.json(actionError, {
            status: 400,
            headers,
        });
    };
    console.log(url)
    const payload: ActionPostResponse = {
        type: "external-link",
        externalLink: url,
    }
    return Response.json(payload, {
        headers,
    });
}
