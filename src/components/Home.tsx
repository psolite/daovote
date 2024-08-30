"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { web3, BN } from "@coral-xyz/anchor";
import { Buffer } from 'buffer';
import { PublicKey, Transaction } from "@solana/web3.js";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";
import { createProposal, deriveProposalPDA } from "@/anchor/setup";
import CreatePoll from "./CreatePoll";
import ShareCard from "./ShareCard";

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

const CreateHomePoll = () => {
    const { publicKey: walletPublicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [proposal, setProposal] = useState<any>(null);
    const [failed, setFailed] = useState<any>(null);
    const { connectWallet, walletAddress, iframe, signTransaction } = useCanvasWallet();

    let publicKey = walletPublicKey;

    if (walletAddress) {
        publicKey = new PublicKey(walletAddress);
    }


    const create = async (title: string, description: string, options: string, duration: number) => {
        if (!publicKey) return;

        try {
            const { proposalPda, proposalId } = await deriveProposalPDA(publicKey.toString());

            // const option = options.map(option => option.trim()).filter(option => option.length > 0); // Convert to array of strings
            const array = options
                .split(',')
                .map((item: string) => item.trim())
                .filter((item: string) => item.length > 0);
            const optionsArray = array
            console.log(options)
            console.log(optionsArray)
            const tokenarray: string[] = [];
            const amountarray: number[] = [];

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

            console.log('Transaction created:', transaction);
            console.log('Sending transaction...');

            let trxSign;
            if (walletAddress) {
                trxSign = await signTransaction(transaction);
            } else {
                trxSign = await sendTransaction(transaction, connection, { signers: [] });
                const confirmation = await connection.confirmTransaction(trxSign, 'confirmed');
                console.log('Transaction confirmed:', confirmation);
            }

            console.log(`View on explorer: https://solana.fm/tx/${trxSign}?cluster=devnet-alpha`);
            setProposal(proposalId.toString()); // Save proposal ID to state for later use/display

        } catch (error) {
            console.error('Error creating proposal:', error);
            setFailed(error);
        }
    };

    return (
        <>
            <CreatePoll createProposal={create} />
            {
                proposal ?
                    <ShareCard />
                    : ""
            }
        </>
    );
};

export default CreateHomePoll;
