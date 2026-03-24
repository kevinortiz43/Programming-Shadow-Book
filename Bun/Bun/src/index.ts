import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

// // learning bun server
// with figlet not necessary
// const server = Bun.serve({
//   port: 3000,
//   fetch(req) {
//     const body = figlet.textSync("HoA!");
//     return new Response(body);
//   },
// });

// console.log(`listening on port http://localhost::${server.port}`);

// more routes

// import figlet from "figlet";
// const server = Bun.serve({
//   port: 3000,
//   fetch(req) {
//     const url = new URL(req.url);
//     if (url.pathname === "/") {
//       const body = figlet.textSync("Video");
//       return new Response(body);
//     }
//     if (url.pathname === "/about") {
//       return new Response("About Me!");
//     }

//     if (url.pathname === "/contact") {
//       return new Response("Contact us!");
//     }

//     if (url.pathname === "feed") {
//       throw new Error("could not catch feed");
//     }

//     return new Response("404");
//   },
//   error(error) {
//     return new Response(`<pre> ${error} \n  ${error.stack}</pre>`, {
//       headers: {
//         "Content-Type": "text/html",
//       },
//     });
//   },
// });



// BUILDING REST APIS FOR BUN


