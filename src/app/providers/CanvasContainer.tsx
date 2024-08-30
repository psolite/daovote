"use client";

import { ReactNode, useEffect, useRef } from "react";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";
import useCanvasWallet from "./CanvasWalletProvider";

export default function CanvasContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasClientRef = useRef<CanvasClient | undefined>();
  const { iframe } = useCanvasWallet();

  useEffect(() => {
    if (iframe) {
      canvasClientRef.current = new CanvasClient();
    }

    const resizeObserver = new ResizeObserver(() => {
      canvasClientRef.current?.resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      canvasClientRef.current = undefined; // Cleanup
    };
  }, [iframe]); // Add iframe as a dependency

  return (
    <div className="relative min-h-screen">
      <main ref={containerRef} className="flex-grow">
        {children}
      </main>
    </div>
    // <main ref={containerRef} className="min-h-screen">
    //   {children}
    // </main>
  );
}
