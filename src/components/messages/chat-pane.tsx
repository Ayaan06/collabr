"use client";

import { useMemo, useState } from "react";
import { ArrowUp, MoreHorizontal, Search } from "lucide-react";
import { conversations, getMessagesForConversation } from "@/lib/mock-data";
import { Avatar } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function ChatPane() {
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");
  const messages = useMemo(
    () => getMessagesForConversation(activeId ?? "") ?? [],
    [activeId],
  );
  const activeConversation = conversations.find((c) => c.id === activeId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
      <div className="glass-panel flex flex-col border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input className="bg-white/5 pl-9" placeholder="Search conversations" />
          </div>
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="divide-y divide-white/5">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveId(conversation.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5",
                activeId === conversation.id && "bg-white/10",
              )}
            >
              <Avatar name={conversation.participant.name} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-white">
                  <span className="font-medium">{conversation.participant.name}</span>
                  <span className="text-xs text-white/50">{conversation.timestamp}</span>
                </div>
                <p className="text-xs text-white/60 line-clamp-1">{conversation.lastMessage}</p>
              </div>
              {conversation.unread && (
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel flex flex-col border border-white/10 bg-white/5 p-5">
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Avatar name={activeConversation.participant.name} />
                <div>
                  <p className="text-base font-semibold text-white">
                    {activeConversation.participant.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {activeConversation.participant.headline}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View profile
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto py-4 pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.direction === "sent" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-lg",
                      message.direction === "sent"
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
                        : "bg-white/10 text-white",
                    )}
                  >
                    <p>{message.text}</p>
                    <span className="mt-1 block text-[11px] text-white/70">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
              <Input
                placeholder="Write a message..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="bg-white/10"
              />
              <Button
                variant="primary"
                size="icon"
                className="h-11 w-11 rounded-full"
                disabled={!draft}
                onClick={() => setDraft("")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-white/70">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
