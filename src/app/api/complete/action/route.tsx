import { NextActionLink } from "@solana/actions";


export const getCompletedAction = (PDA: string): NextActionLink =>  {
    return {
      type: "inline",
      action: {
        description: `This is your Poll link \nhttp://localhost:3000/api/voting/\n${PDA}`,
        icon: `https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg`,
        label: `Successful`,
        title: `Your poll has been created`,
        type: "completed",
      },
    };
  };