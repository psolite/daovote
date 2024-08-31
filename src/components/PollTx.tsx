
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
    sendTransaction: (transaction: Transaction, connection: Connection, { signers: [] }) => Promise<string>,
    walletAddress: string | null,
    signTransaction: (transaction: Transaction) => Promise<string | null>;
}

export const PollTx = async (hooks: Hooks, data: CreateHomePoll) => {
    const { connection, pubKey, sendTransaction, signTransaction, walletAddress } = hooks
    const { title, description, options, duration } = data
    console.log("here")
    // Determine which public key to use
    let publicKey = pubKey;
    if (walletAddress) {
        publicKey = new PublicKey(walletAddress);
    }
    if (!publicKey) return;
    console.log("here")
    try {
        const { proposalPda, proposalId } = await deriveProposalPDA(publicKey.toString());
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
            tokenarray,
            proposalId,
            duration,
            publicKey.toString(),
            proposalPda,
            amountarray
        );

        let trxSign;
        if (walletAddress) {
            trxSign = await signTransaction(transaction);
        } else {
            trxSign = await sendTransaction(transaction, connection, { signers: [] });
            await connection.confirmTransaction(trxSign, 'confirmed');
            const confirmation = await connection.confirmTransaction(trxSign, 'confirmed');
            console.log('Transaction confirmed:', confirmation);
        }


        console.log(
            `View on explorer: https://solana.fm/tx/${trxSign}?cluster`
        );
        const proposalString = proposalPda.toString()
        return { status: true, proposalString, trxSign }

    } catch (error) {
        console.error('Error creating proposal:', error);
        // return {error}
        return { status: false, message: `${error}` };
    }
};

