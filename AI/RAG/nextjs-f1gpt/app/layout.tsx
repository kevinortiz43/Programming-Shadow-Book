import "./globals.css";

export const metadata = {
  title: "Movie GPT",
  description: "Movie questions ",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
