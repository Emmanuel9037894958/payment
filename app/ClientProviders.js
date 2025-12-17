"use client";

import ClientGate from "./ClientGate";

export default function ClientProviders({ children }) {
  return <ClientGate>{children}</ClientGate>;
}
