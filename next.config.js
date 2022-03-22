module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
    });
    config.module.rules.push({
      test: /\bmapbox-gl-csp-worker.js\b/i,
      use: { loader: "worker-loader" },
    });
    return config;
  },
};
