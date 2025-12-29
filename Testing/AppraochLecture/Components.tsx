import React from "react";

interface Props {
  name: string;
  age: number;
  isEnginner: boolean;
}

export default function MyComponent(props: Props) {
  return (
    <li>
      <p>{props.name}</p>
      <p>{props.age}</p>
      <p>{props.isEnginner ? "yes" : "no"}</p>
    </li>
  );
}
