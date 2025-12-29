module.exports = {
  apps: [
    {
      name: "dxl-blog",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      exec_mode: "cluster",
      env: {
        PORT: 9090,
        NODE_ENV: "production",
      },
    },
  ],
};
