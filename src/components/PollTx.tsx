
import { Buffer } from 'buffer';
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { createProposal, deriveProposalPDA } from "@/anchor/setup";


// // Set the global Buffer for Solana transactions
// if (typeof window !== 'undefined') {
//     window.Buffer = Buffer;
// }

interface CreateHomePoll {
    title: string,
    description: string,
    options: string,
    // token: string[],
    duration: number,
    // token_amount: number[]
}
interface Hooks {
    connection: Connection,
    pubKey: PublicKey | null,
}

export const PollTx = async (hooks: Hooks, data: CreateHomePoll) => {
    const { connection, pubKey,  } = hooks
    const { title, description, options, duration } = data
    console.log("here")
    
    if (!pubKey) return;
    console.log("here")
    try {
        const { proposalPda, proposalId } = await deriveProposalPDA(pubKey);
        const optionsArray = options.split(',')
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);
        console.log(options, "7777777777777777777777777777777777777777777777777")
        const tokenarray: string[] = [];
        const amountarray: number[] = [];
        console.log(options)
        const transaction = await createProposal(
            title,
            description,
            optionsArray,
            duration,
            proposalId,
            proposalPda,
            pubKey,
        );
        const proposalString = proposalPda.toString()
        return {transaction, proposalString}

    } catch (error) {
        console.error('Error creating proposal:', error);
        // return {error}
        return { status: false, message: `${error}` };
    }
};

