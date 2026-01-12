import React from "react";

function PromptSuggestionButton({ text, onClick }) {
  return (
    <button className="prompt-suggestion-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default PromptSuggestionButton;
