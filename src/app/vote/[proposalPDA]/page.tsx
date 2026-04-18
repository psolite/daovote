"use client"

import { useEffect, useState } from "react";
import { findOneProposal } from "@/anchor/setup";
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
                setLoading(true);
                const proposalData = await findOneProposal(proposalPDA as string);
                setProposal(proposalData);

                const closingTime =
                    proposalData.createdAt * 1000 + proposalData.duration * 1000;

                const buildCountdown = () => {
                    const diff = closingTime - Date.now();
                    if (diff <= 0) {
                        setClosed(true);
                        return [
                            { id: "countdown1", description: "DAYS", value: 0 },
                            { id: "countdown2", description: "HOURS", value: 0 },
                            { id: "countdown3", description: "MIN", value: 0 },
                            { id: "countdown4", description: "SEC", value: 0 },
                        ];
                    }
                    const total = Math.floor(diff / 1000);
                    return [
                        { id: "countdown1", description: "DAYS", value: Math.floor(total / 86400) },
                        { id: "countdown2", description: "HOURS", value: Math.floor((total % 86400) / 3600) },
                        { id: "countdown3", description: "MIN", value: Math.floor((total % 3600) / 60) },
                        { id: "countdown4", description: "SEC", value: total % 60 },
                    ];
                };

                setTimeLeft(buildCountdown());
                const interval = setInterval(() => {
                    const countdown = buildCountdown();
                    setTimeLeft(countdown);
                    if (countdown[3].value === 0 && countdown[2].value === 0 &&
                        countdown[1].value === 0 && countdown[0].value === 0) {
                        clearInterval(interval);
                    }
                }, 1000);

                return () => clearInterval(interval);
            } catch (error) {
                console.error("Error fetching proposal:", error);
            } finally {
                setLoading(false);
            }
        };

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
