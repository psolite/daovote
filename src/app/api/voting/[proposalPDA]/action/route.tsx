import { findOneProposal, HasVoted, vote } from "@/anchor/setup";
import { ActionError, ActionGetResponse, ActionPostRequest, ActionPostResponse, createActionHeaders, createPostResponse, NextActionLink } from "@solana/actions";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const proposalPDA = url.pathname.split('/')[3];

    const proposal = await findOneProposal(proposalPDA as string);
    const now = Date.now()
    let closed = false;

    // Convert proposal.createdAt from seconds to milliseconds
    const createdAtInMillis = proposal.createdAt * 1000;
    const durationInMillis = proposal.duration * 1000;

    // Calculate the closing time by adding duration to the creation time
    const closingTime = createdAtInMillis + durationInMillis;

    if (now >= +closingTime) {
        console.log("in")
        closed = true
    }
    // console.log(closed, now, +(proposal.createdAt + proposal.duration), closingTime)

    const mappedOptions = proposal.options.map((option, index) => ({
        href: `${req.url}?optionIndex=${index}&proposalPDA=${proposalPDA}`,
        label: option,

    }));

    //   console.log(proposal.options,proposal.options.length, "66666666666666666666666666666666666666666")
    const payload: ActionGetResponse = {
        title: proposal.title,
        icon: new URL("/solana_devs.jpg", new URL(req.url).origin).toString(),
        description: proposal.description,
        disabled: closed,
        label: "Send Memo",
        links: {
            actions: mappedOptions
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
        const url = new URL(req.url);
        const optionIndex = url.searchParams.get('optionIndex');
        const proposalPDA = url.searchParams.get('proposalPDA');
        // console.log(optionIndex, req, "88888888888888888888888888888888888888888888888888")
        const reqBody: ActionPostRequest = await req.json()
        const user = reqBody.account

        if (!proposalPDA || !optionIndex) { return }

        const userHasVoted = await HasVoted(proposalPDA, user)

        if (userHasVoted) {
            let actionError: ActionError = { message: `You Have Voted` };

            return Response.json(actionError, {
                status: 400,
                headers,
            });
        }
        const transaction = await vote(proposalPDA, user, +optionIndex)

        const payload: ActionPostResponse = {
            transaction,
            message: "Vote Recorded"
        }

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