import { NextActionLink } from "@solana/actions";


export const getCompletedAction = (PDA: string): NextActionLink =>  {
    return {
      type: "inline",
      action: {
        description: `Blinks for your vote ${PDA}`,
        icon: `https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg`,
        label: `Action Label`,
        title: `Action completed`,
        type: "completed",
      },
    };
  };