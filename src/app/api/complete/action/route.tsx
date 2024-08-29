import { NextActionLink } from "@solana/actions";


export const getCompletedAction = (PDA: string, imageurl: string): NextActionLink =>  {
    return {
      type: "inline",
      action: {
        description: `This is your Poll link \nhttp://localhost:3000/api/voting/\n${PDA}`,
        icon: imageurl,
        label: `Successful`,
        title: `Your poll has been created`,
        type: "completed",
      },
    };
  };