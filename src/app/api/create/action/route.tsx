import { createProposal, deriveProposalPDA } from "@/anchor/setup";
import { ActionError, ActionGetResponse, ActionPostRequest, ActionPostResponse, createActionHeaders, createPostResponse, NextActionLink } from "@solana/actions";
import { getCompletedAction } from "./completed";
// import { BlinksightsClient } from "blinksights-sdk";

// const client = new BlinksightsClient('4101b7f30457e845e835ef7fe57d998bad200eaf9073eea6d881ca8e57d51df4');
const headers = createActionHeaders();

export const GET = (req: Request) => {
  const payload: ActionGetResponse = (req.url, {
    title: "Create a Poll",
    icon: `${process.env.NEXT_PUBLIC_URL}/image/dao5.jpg`,
    description: `Transparent and tamper-proof community decision making`,
    label: "Send Memo",
    links: {
      actions: [
        {
          href: `${process.env.NEXT_PUBLIC_URL}`,
          label: "Create",
          parameters: [
            {
              name: "title",
              label: "What is the best meme",
              type: "text",
              required: true
            },
            {
              name: "description",
              label: "What is the best meme coin in solana",
              type: "textarea",
              required: true
            },
            {
              patternDescription: "use (,) to add options",
              name: "options",
              label: "Options eg: BONK, WEN, JUP",
              type: "textarea",
              required: true
            },
            {
              name: "duration",
              label: "Duration in hours?",
              type: "number",
              required: true
            },
          ],
        },
      ],
    },
  });
  // console.log("here")
  return Response.json(payload, {
    headers,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const reqBody: ActionPostRequest = await req.json()
    const user = reqBody.account
    // client.trackActionV2(user, req.url);
    // client.trackActionV1(req.headers, user, req.url);

    const { proposalPda, proposalId } = await deriveProposalPDA(user)
    // console.log("body:", req.body);

    const data: any = reqBody.data
    // if(!data){return {error: "no data found"}}

    const title = data.title
    const description = data.description
    const array = data.options
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
    const options = array
    const duration = data.duration
    const tokenarray: string[] = []
    const amountarray: number[] = []

    const transaction = await createProposal(title, description, options, tokenarray, proposalId, duration, user, proposalPda, amountarray)
    const imageurl = new URL("/image/dao5.jpg", new URL(req.url).origin).toString();
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Done",
        links: {
          next: getCompletedAction(proposalPda.toBase58(), imageurl)
        },
      },

    });
    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    // console.log(err);
    let actionError: ActionError = { message: `An unknown error occurred ${err}` };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }

};