import { AnchorProvider, Program, BN, web3 } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { DaoVoting, IDL } from "./idl";

const rpc = process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl('devnet')

const connection = new Connection(rpc, 'confirmed')

const readOnlyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async <T extends Transaction | VersionedTransaction>(tx: T) => tx,
    signAllTransactions: async <T extends Transaction | VersionedTransaction>(txs: T[]) => txs,
}

const provider = new AnchorProvider(connection, readOnlyWallet);

const program = new Program<DaoVoting>(IDL, provider);

export const deriveProposalPDA = async (publicKey: PublicKey) => {
    const proposalId = new BN(Date.now());

    const proposalIdBuffer = proposalId.toArrayLike(Buffer, 'le', 8);
    const [proposalPda, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("proposal"), publicKey.toBuffer(), proposalIdBuffer],
        program.programId
    );
    return { proposalPda, proposalId }
}

export const deriveVotersPda = async (publicKey: PublicKey, proposal: string) => {
    const proposalPublicKey = new PublicKey(proposal)

    const [voterPDA, _bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("voter"), publicKey.toBuffer(), proposalPublicKey.toBuffer()],
        program.programId
    );
    return {voterPDA}
}

export const createProposal = async (
    title: string,
    description: string,
    options: string[],
    duration: number,
    proposalId: BN,
    proposalPda: PublicKey,
    user: PublicKey

) => {
    const durationBN = new BN(duration * 3600)
    const token: string[] = []
    const token_amount: BN[] = []


    // Call the createProposal function
    const tx = await (program.methods as any).createProposal(
        title,
        description,
        options,
        token,
        durationBN,
        token_amount,
        proposalId
    ).accountsStrict({
        proposal: proposalPda,
        user,
        treasury: user,
        systemProgram: web3.SystemProgram.programId,
    })
        .transaction()

    const { blockhash } = await connection.getLatestBlockhash({ commitment: "confirmed" });
    tx.recentBlockhash = blockhash
    tx.feePayer = user

    const serializeTx = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false
    }).toString('base64')

    return serializeTx

}


export const AllProposal = async () => {
    const allProposal = await (program.account as any).proposal.all();

    const proposals = allProposal.map((proposal: any) => {

        const optionsWithVoteCounts = proposal.account.options.map((option: any, index: number) => {
            const voteCount = proposal.account.voteCounts[index];
            return `${option.toString()}: ${voteCount.toString()}`;
        });
        const tokenWithamount = proposal.account.token.map((token: any, index: number) => {
            const amount = proposal.account.voteCounts[index];
            return `${token.toString()}: ${amount.toString()}`;
        });
        const now = Date.now()
        let Isactive = true;

        const createdAtInMillis = proposal.account.createdAt * 1000;
        const durationInMillis = proposal.account.duration * 1000;

        // Calculate the closing time by adding duration to the creation time
        const closingTime = createdAtInMillis + durationInMillis;

        if (now >= +closingTime) {
            Isactive = false
        }

        return {
            id: proposal.publicKey,
            title: proposal.account.title.toString(),
            description: proposal.account.description.toString(),
            optionsWithVoteCounts,
            createdAt: proposal.account.createdAt.toString(),
            duration: proposal.account.duration.toString(),
            tokenWithamount,
            link: `${process.env.NEXT_PUBLIC_URL}/vote/${proposal.publicKey}`,
            status: Isactive
        }
    });
    return proposals
}

export const findOneProposal = async (proposalPDA: string) => {
    return await (program.account as any).proposal.fetch(proposalPDA);
}

export const HasVoted = async (proposalPDA: string, user: string) => {
    const voters = await (program.account as any).voter.all();
    const userHasVoted = voters.some((voter: any) =>
        voter.account.user.equals(new PublicKey(user)) &&
        voter.account.proposal.equals(new PublicKey(proposalPDA as string))
    );
    return userHasVoted
}

export const vote = async (proposalPublicKey: string, publicKey: string, optionIndex: number) => {
    console.log(publicKey, proposalPublicKey)
    const user = new PublicKey(publicKey)
    const proposalPDA = new PublicKey(proposalPublicKey)
    const { voterPDA } = await deriveVotersPda(user, proposalPDA.toString())

    try {
        const tx = await (program.methods as any).vote(optionIndex)
            .accountsStrict({
                proposal: proposalPDA,
                voter: voterPDA,
                user: user,
                systemProgram: web3.SystemProgram.programId,
            })
            .transaction();

        // Fetch the recent blockhash and set the fee payer
        const { blockhash } = await connection.getLatestBlockhash({ commitment: "finalized" });
        tx.recentBlockhash = blockhash;
        tx.feePayer = user;

        console.log('Sending transaction...', tx);

        // Serialize the transaction
        const serializedTx = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        }).toString('base64');
        console.log('Serialized Transaction:', serializedTx);

        return serializedTx
    } catch (error) {
        console.error("Transaction creation failed", error);
        throw new Error("Transaction creation failed");
    }
}