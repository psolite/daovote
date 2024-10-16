import { NextAction, NextActionLink } from "@solana/actions";


export const getCompletedActions = (PDA: string, imageurl: string): NextAction => {
    const link = `https://twitter.com/intent/tweet?text=This%20is%20your%20Poll%20link&url=${process.env.NEXT_PUBLIC_URL}/vote/${PDA}`
    return {
        type: "action",
        description: `This is your Poll link \n${process.env.NEXT_PUBLIC_URL}/vote/${PDA}`,
        icon: imageurl,
        label: "Successfullll",
        title: "Your poll has been created",
        links: {
            actions: [
                {
                    type: "external-link",
                    href: link,
                    label: "Share Link",
                },
            ]
        }
    };
};