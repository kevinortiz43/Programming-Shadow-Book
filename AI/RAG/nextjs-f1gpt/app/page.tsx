"use client";

import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { useState } from "react";
import PromptSuggestionRow from "./components/PromptSuggestionRow";
import LoadingBubble from "./components/LoadingBubble";
import Bubble from "./components/Bubble";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const noMessages = messages.length === 0;

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message to the chat
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      content: userMessage,
      role: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setInput("");

    try {
      // Send to your backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Create assistant message placeholder
      const assistantMessageId = crypto.randomUUID();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        // Update the assistant message as it streams in
        setMessages((prev) => {
          const existing = prev.find((m) => m.id === assistantMessageId);
          if (existing) {
            return prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: assistantMessage }
                : m
            );
          } else {
            return [
              ...prev,
              {
                id: assistantMessageId,
                content: assistantMessage,
                role: "assistant" as const,
              },
            ];
          }
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: "Sorry, there was an error processing your request.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main>
      <Image src={logo} width="250" alt="logo not production" />
      <section>
        {noMessages ? (
          <>
            <p className="start-text">Movie similarity search</p>
            <br />
            <PromptSuggestionRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <Bubble key={`message--${index}`} message={message} />
            ))}
            {isLoading && <LoadingBubble />}
          </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <input
          className="question-box"
          onChange={handleInputChange}
          value={input}
          placeholder="Ask me something"
        />
        <input type="submit" />
      </form>
    </main>
  );
};

export default Home;