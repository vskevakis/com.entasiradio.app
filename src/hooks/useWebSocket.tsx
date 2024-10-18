import { useEffect, useRef } from "react";

export const useWebSocket = (handleWebSocketMessage: (event: MessageEvent) => void, setError: (value: boolean) => void) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("wss://api.entasiradio.tuc.gr/ws/");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = handleWebSocketMessage;

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError(true);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [handleWebSocketMessage, setError]);
};