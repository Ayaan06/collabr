"use client";

import { ChatPane } from "@/components/messages/chat-pane";

export default function MessagesPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-white/60">Inbox</p>
        <h1 className="text-2xl font-semibold text-white">Messages</h1>
      </div>
      <ChatPane />
    </div>
  );
}
