

// const allProposal = await program.account.proposal.all();

//     const proposals = allProposal.map((proposal) => {

//       const optionsWithVoteCounts = proposal.account.options.map((option, index) => {
//         const voteCount = proposal.account.voteCounts[index];
//         return `${option.toString()}: ${voteCount.toString()}`;
//       });

//       return {
//         title: proposal.account.title.toString(),
//         description: proposal.account.description.toString(),
//         optionsWithVoteCounts,
//         createdAt: proposal.account.createdAt.toString(),
//         duration: proposal.account.duration.toString(),
//         point: proposal.account.point
//       }
//     });
//     console.log(proposals)