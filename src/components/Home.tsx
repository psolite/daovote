"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Buffer } from 'buffer';
import { PublicKey } from "@solana/web3.js";
import useCanvasWallet from "@/app/providers/CanvasWalletProvider";
import { createProposal, deriveProposalPDA } from "@/anchor/setup";
import CreatePoll from "./CreatePoll";
import ShareCard from "./ShareCard";

// Set the global Buffer for Solana transactions
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

const CreateHomePoll = () => {
    const { publicKey: walletPublicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [proposal, setProposal] = useState<string | null>(null);
    const [failed, setFailed] = useState<Error | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { walletAddress, signTransaction } = useCanvasWallet();

    // Determine which public key to use
    let publicKey = walletPublicKey;
    if (walletAddress) {
        publicKey = new PublicKey(walletAddress);
    }

    const create = async (title: string, description: string, options: string, duration: number) => {
        if (!publicKey) return;

        try {
            const { proposalPda, proposalId } = await deriveProposalPDA(publicKey.toString());
            const optionsArray = options.split(',')
                .map((item: string) => item.trim())
                .filter((item: string) => item.length > 0);

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
                `View on explorer: https://solana.fm/tx/${trxSign}?cluster=devnet-alpha`
            );

            setProposal(proposalId.toString());
            setModalMessage('Your proposal has been successfully created!');
            setModalOpen(true);

        } catch (error) {
            console.error('Error creating proposal:', error);
            setFailed(error as Error);
        }
    };

    return (
        <>
            <CreatePoll createProposal={create} />
            <ShareCard
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                message={modalMessage}
            />
        </>
    );
};

export default CreateHomePoll;
