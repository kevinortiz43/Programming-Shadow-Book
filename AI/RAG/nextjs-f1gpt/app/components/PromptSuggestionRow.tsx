import React from "react";
import PromptSuggestionButton from "./PromptSuggestionButton";

export default function PromptSuggestionRow({ onPromptClick }) {
  const prompts = [
    "What year did parasite come out?",
    "What year did cabin fever came out?",
    "What year did la la land come out?",
  ];
  return (
    <div className="prompt-suggestion-row">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton
          key={`suggestion-${index}`}
          text={prompt}
          onClick={() => onPromptClick(prompt)}
        />
      ))}
    </div>
  );
}
