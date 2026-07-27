module.exports = {
  apps: [
    {
      name: "nkcgroup",
      script: "./server.js",
      watch: ["./"], // Theo dõi file trong project
      ignore_watch: ["node_modules", "logs", "*.log", ".git"],
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
