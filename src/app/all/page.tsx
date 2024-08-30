"use client"

import { useEffect, useState } from "react";
import { AllProposal, findOneProposal, HasVoted } from "@/anchor/setup";
import { useParams } from "next/navigation";
import Vote from "@/components/Vote";
import AllPolls from "@/components/AllPolls";

export default function Voting() {
   
    const [timeLeft, setTimeLeft] = useState<{ id: string; description: string; value: number; }[]>();
    const [closed, setClosed] = useState<boolean>(false);
    const [proposal, setProposal] = useState<any>();
    const [loading, setLoading] = useState<boolean>();


    useEffect(() => {
         const fetchProposalData = async () => {
            try {
                const proposal = await AllProposal()
                console.log(proposal)
                
                setProposal(proposal)
            } catch (error) {
                console.error("Error fetching proposal:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching completes
            }
        }

        fetchProposalData();
    }, []);

    return (
        <AllPolls allPolls={proposal} />
    );
}
