require("@babel/register")({
  presets: [
    [
      "env",
      {
        targets: {
          node: true
        }
      }
    ]
  ]
});
require("./server/app.js");
