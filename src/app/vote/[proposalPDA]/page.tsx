"use client"

import { useEffect, useState } from "react";
import { findOneProposal, HasVoted } from "@/anchor/setup";
import { useParams } from "next/navigation";
import Vote from "@/components/Vote";

export default function Voting() {
    const { proposalPDA } = useParams();
    const [timeLeft, setTimeLeft] = useState<{ id: string; description: string; value: number; }[]>();
    const [closed, setClosed] = useState<boolean>(false);
    const [proposal, setProposal] = useState<any>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
         const fetchProposalData = async () => {
            try {
                if (!proposalPDA) return;

                setLoading(true); // Set loading to true before starting fetch
                console.log("Fetching proposal for:", proposalPDA);

                // Fetch proposal data
                const proposalData = await findOneProposal(proposalPDA as string);

                console.log("Fetched proposal:", proposalData);
                setProposal(proposalData);

                const now = Date.now();
                const createdAtInMillis = proposalData.createdAt * 1000;
                const durationInMillis = proposalData.duration * 1000;

                // Calculate the closing time by adding duration to the creation time
                const closingTime = createdAtInMillis + durationInMillis;
                const timeDifference = closingTime - now;

                // Convert milliseconds to days, hours, and minutes
                const totalSeconds = Math.floor(timeDifference / 1000);
                const days = Math.floor(totalSeconds / (3600 * 24));
                const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);

                let countdown = [
                    { id: "countdown1", description: "DAYS", value: days },
                    { id: "countdown2", description: "HOURS", value: hours },
                    { id: "countdown3", description: "MIN", value: minutes },
                ];
                if (timeDifference <= 0) {
                    setClosed(true);
                    countdown = [
                        { id: "countdown1", description: "DAYS", value: 0 },
                        { id: "countdown2", description: "HOURS", value: 0 },
                        { id: "countdown3", description: "MIN", value: 0 },
                    ];
                }
                setTimeLeft(countdown);


            } catch (error) {
                console.error("Error fetching proposal:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching completes
            }
        }

        fetchProposalData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!proposal) {
        return <div>No proposal data available.</div>;
    }

    return (
        <Vote countdown={timeLeft} proposal={proposal} closed={closed} proposalPDA={proposalPDA as string}/>
    );
}
