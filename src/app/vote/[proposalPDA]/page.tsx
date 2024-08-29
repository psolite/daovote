"use client"

import { useEffect, useState } from "react";
import { findOneProposal } from "@/anchor/setup";
import { useParams } from "next/navigation";

export default function Vote() {
  const { proposalPDA } = useParams();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [closed, setClosed] = useState<boolean>(false);
  const [proposal, setProposal] = useState<any>();

  useEffect(() => {
    async function fetchProposalData() {
      if (!proposalPDA) return;
      console.log(proposalPDA)
      const proposal = await findOneProposal(proposalPDA as string);
      console.log(proposal)
      setProposal(proposal)
      const now = Date.now();

      // Convert proposal.createdAt from seconds to milliseconds
      const createdAtInMillis = proposal.createdAt * 1000;
      const durationInMillis = proposal.duration * 1000;

      // Calculate the closing time by adding duration to the creation time
      const closingTime = createdAtInMillis + durationInMillis;
      const timeDifference = closingTime - now;

      if (timeDifference <= 0) {
        setTimeLeft("Closed");
        setClosed(true);
        return;
      }

      // Convert seconds to days, hours, and minutes
      const totalSeconds = Math.floor(timeDifference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      // Output the results
      const formattedTime = `${days > 0 ? `${days} days${hours > 0 || minutes > 0 ? ", " : ""}` : ""}${
        hours > 0 ? `${hours} hours${minutes > 0 ? ", " : ""}` : ""
      }${minutes > 0 ? `${minutes} minutes` : ""}`;

      setTimeLeft(`Closing in ${formattedTime}`);
    }

    fetchProposalData();
  }, [proposalPDA]);

  return (
    <div className="m-10 m-10 m-10">
      <h1>Proposal Voting</h1>
      <p>{timeLeft}</p>
      {closed ? <p>Voting is closed.</p> : <p>Voting is open! Cast your vote now.</p>}
    </div>
  );
}
