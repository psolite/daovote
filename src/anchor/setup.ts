// src/setup.ts

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { BN, Program, web3 } from '@coral-xyz/anchor';
import { DaoVoting, IDL } from './idl';
import { error } from 'console';

const network = clusterApiUrl('devnet');
const connection = new Connection(network, 'confirmed');
const programID = new PublicKey('tygJWUu63WsaoHRanbLKo89TdgK6Z4p2QShrPtgHFfp');

export const program = new Program<DaoVoting>(IDL, programID, {
    connection
});


export const deriveProposalPDA = async (publicKey: string) => {

    //  PDA using the wallet's public key 
    // const { proposalPda, bump, proposalId } = await program.methods
    //     .getProposalPda()
    //     .accounts({
    //         user: publicKey,
    //     })
    //     .call();

    // console.log("here now")
    // console.log(proposalPda, bump, proposalId)
    const proposalId = new BN(Date.now());
    const user = new PublicKey(publicKey)

    const proposalIdBuffer = proposalId.toArrayLike(Buffer, 'le', 8);
    const [proposalPda, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("proposal"), user.toBuffer(), proposalIdBuffer],
        program.programId
    );
    return { proposalPda, bump, proposalId };
};

export const deriveVoterPDA = async (publicKey: PublicKey, proposal: PublicKey) => {
    const [voterPDA, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("voter"), publicKey.toBuffer(), proposal.toBuffer()],
        program.programId
    );
    return { voterPDA, bump }
}

export const createProposal = async (title: string, description: string, options: string[], proposalId: BN, duration: number, user: string, proposalPda: PublicKey) => {
    const durationBN = new BN(duration * 60 * 60);
    const point = 10;
    const treasury = new PublicKey("E7XFPNa2YfPQ9FhaTqsPyAmH9QJtTs6PTu9YZSaLQv5p");
    const userPubKey = new PublicKey(user);
    try {
        const tx = await program.methods.createProposal(title, description, options, proposalId, durationBN, point)
            .accounts({
                proposal: proposalPda,
                user: userPubKey,
                treasury: treasury,
                systemProgram: web3.SystemProgram.programId
            })
            .transaction();

        // Fetch the recent blockhash and set the fee payer
        const { blockhash } = await connection.getLatestBlockhash({ commitment: "finalized" });
        tx.recentBlockhash = blockhash;
        tx.feePayer = userPubKey;

        console.log(tx);
        console.log("Transaction created successfully. Sending to wallet for approval.");

        // Serialize the transaction
        const serializedTx = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        }).toString('base64');
        console.log('Serialized Transaction:', serializedTx);
console.log(await program.account.proposal.all())
        return serializedTx
    } catch (error) {
        console.error("Transaction creation failed", error);
        throw new Error("Transaction creation failed");
    }
};

export const vote = async (proposalPublicKey: PublicKey, user: PublicKey, optionIndex: number) => {

    const { voterPDA } = await deriveVoterPDA(user, proposalPublicKey)
    try {
        const tx = await program.methods.vote(optionIndex)
            .accounts({
                proposal: proposalPublicKey,
                voter: voterPDA,
                user: user,
                systemProgram: web3.SystemProgram.programId,
            })
            .transaction();

        // Set the recent blockhash and fee payer
        tx.recentBlockhash = (await connection.getLatestBlockhash({ commitment: "finalized" })).blockhash;
        tx.feePayer = user;

        console.log('Sending transaction...');

        // Serialize the transaction
        const serializedTx = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        }).toString('base64');
        console.log('Serialized Transaction:', serializedTx);

        return serializedTx
    } catch {
        return Response.json({
            status: 400,
            error: "tx error"
        })
    }
}

export const cProposal = async () => {
    const allProposal = await program.account.proposal.all();

    const proposals = allProposal.map((proposal) => {

        const optionsWithVoteCounts = proposal.account.options.map((option, index) => {
            const voteCount = proposal.account.voteCounts[index];
            return `${option.toString()}: ${voteCount.toString()}`;
        });

        return {
            title: proposal.account.title.toString(),
            description: proposal.account.description.toString(),
            optionsWithVoteCounts,
            createdAt: proposal.account.createdAt.toString(),
            duration: proposal.account.duration.toString(),
            point: proposal.account.point
        }
    });
    console.log(proposals)
}
