import { findOneProposal, HasVoted, vote } from "@/anchor/setup";
import { ActionError, ActionGetResponse, ActionPostRequest, ActionPostResponse, createActionHeaders, createPostResponse, NextActionLink } from "@solana/actions";
import { BlinksightsClient } from "blinksights-sdk";

const client = new BlinksightsClient('4101b7f30457e845e835ef7fe57d998bad200eaf9073eea6d881ca8e57d51df4');
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
    const timeDifference = +closingTime - now


    const totalSeconds = Math.floor(timeDifference / 1000);

    // Convert seconds to days, hours, and minutes
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Output the results
    const formattedTime = `${days > 0 ? `${days} days${hours > 0 || minutes > 0 ? ', ' : ''}` : ''}${hours > 0 ? `${hours} hours${minutes > 0 ? ', ' : ''}` : ''}${minutes > 0 ? `${minutes} minutes` : ''}`;

    console.log(formattedTime);
    let timeleft
    timeleft = `Closing in ${formattedTime}`;
    if (timeDifference < 0) {
        timeleft = "Closed"
    }
    if (now >= +closingTime) {
        console.log("in")
        closed = true
    }
    // console.log(closed, now, +(proposal.createdAt + proposal.duration), closingTime)

    const mappedOptions = proposal.options.map((option, index) => ({
        href: `${req.url}?optionIndex=${index}`,
        label: option,

    }));

    //   console.log(proposal.options,proposal.options.length, "66666666666666666666666666666666666666666")
    const payload: ActionGetResponse = await client.createActionGetResponseV1(req.url, {
        title: proposal.title,
        icon: `${process.env.NEXT_PUBLIC_URL}/image/dao4.jpg`,
        description: `${proposal.description}\n${timeleft}`,
        disabled: closed,
        label: "Send Memo",
        links: {
            actions: mappedOptions
        },
    });
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
        const proposalPDA =  url.pathname.split('/')[3];
        // console.log(optionIndex, req, "88888888888888888888888888888888888888888888888888")
        const reqBody: ActionPostRequest = await req.json()
        const user = reqBody.account
        client.trackActionV2(user, req.url);
        client.trackActionV1(req.headers, user, req.url);

        if (!proposalPDA || !optionIndex) { return }

        const userHasVoted = await HasVoted(proposalPDA, user)

        if (userHasVoted) {
            let actionError: ActionError = { message: `You Vote has been Recorded` };

            return Response.json(actionError, {
                status: 400,
                headers,
            });
        }
        const transaction = await vote(proposalPDA, user, +optionIndex)

        
        const payload: ActionPostResponse = await createPostResponse({
            fields: {
              transaction,
              message: "You Vote has been Recorded"
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