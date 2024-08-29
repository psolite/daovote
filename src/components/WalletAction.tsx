import React from 'react';

export const handleWalletConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Trigger WalletMultiButton functionality
    const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
    if (button) {
        button.click();
    }
};