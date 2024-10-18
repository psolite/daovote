import { NextAction, NextActionLink } from "@solana/actions";


export const getCompletedAction = (PDA: string, imageurl: string): NextActionLink => {
    const voteLink = `${process.env.NEXT_PUBLIC_URL}/vote/${PDA}`;
    const link = `https://x.com/intent/tweet?text=This%20is%20your%20Poll%20link&url=${voteLink}`
    return {
        type: "inline",
        action: {
            description: `This is your Poll link \n${voteLink}`,
            icon: imageurl,
            label: `Successful`,
            title: `Your poll has been created`,
            type: "action",
            links: {
                actions: [
                    {
                        type: "external-link",
                        href: `/api/link?url=${link}`,
                        label: "Share Link",
                    }
                ]
            }
        },
        // action: [
        //     {
        // type: "",
        // description: `This is your Poll link \n${process.env.NEXT_PUBLIC_URL}/vote/${PDA}`,
        // icon: imageurl,
        // label: "Successfullll",
        // title: "Your poll has been created",
        // links: {
        //     actions: [
        //         {
        // type: "external-link",
        // href: "https://bulldevelopers.com",
        // label: "Share Link",
        //         },
        //     ]
        // }
        // }
        // ]


    };
};