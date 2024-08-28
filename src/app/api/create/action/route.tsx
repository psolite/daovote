import {createProposal, deriveProposalPDA } from "@/anchor/setup";
import { ActionError, ActionGetResponse, ActionPostRequest, ActionPostResponse, createActionHeaders, createPostResponse, NextActionLink } from "@solana/actions";
import { getCompletedAction } from "../../complete/action/route";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: "Create a Poll",
    icon: 'https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg',
    description: `Transparent and tamper-proof community decision making`,
    label: "Send Memo",
    links: {
      actions: [
        {
          href: req.url,
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
              label: "BONK, WEN, JUP",
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
  };
  console.log("here")
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

    const { proposalPda, proposalId } = await deriveProposalPDA(user)

    console.log("body:", req.body);

    const data: any = reqBody.data
    // if(!data){return {error: "no data found"}}

    const title = data.title
    const description = data.description
    const array = data.options.split(',').map((item: string) => item.trim());
    const options = array
    const duration = data.duration

    const transaction = await createProposal(title, description, options, proposalId, duration, user, proposalPda)

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Done",
        links: {
          next: getCompletedAction(proposalPda.toBase58())
        },
      },

    });

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: `An unknown error occurred ${err}` };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }

};