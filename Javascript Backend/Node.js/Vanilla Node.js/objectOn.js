http.request(options, function (response) {
    let buffer = "";
    // ...
    response.on("data", function (chunk) {
      buffer += chunk;
    });
    response.on("end", function () {
      console.log(buffer);
    });
  })
  .end();
