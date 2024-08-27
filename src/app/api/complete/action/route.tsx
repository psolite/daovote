import { NextActionLink } from "@solana/actions";


export const getCompletedAction = (PDA: string): NextActionLink =>  {
    return {
      type: "inline",
      action: {
        description: `Your Poll link -> http://localhost:3000/voting/${PDA}`,
        icon: `https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg`,
        label: `Successful`,
        title: `Action completed`,
        type: "completed",
      },
    };
  };