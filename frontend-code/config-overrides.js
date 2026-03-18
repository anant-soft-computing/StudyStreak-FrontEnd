module.exports = function override(config, env) {
  // Suppress ALL webpack warnings
  config.ignoreWarnings = [
    // Ignore all warnings from node_modules
    {
      module: /node_modules/,
    },
    // Ignore source map warnings
    function(warning) {
      return warning.message && warning.message.includes('source map');
    },
    // Ignore autoprefixer warnings
    function(warning) {
      return warning.message && warning.message.includes('autoprefixer');
    },
    // Ignore all other warnings
    () => true
  ];

  // Disable source map loader entirely for node_modules
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(oneOfRule => {
        if (oneOfRule.loader && oneOfRule.loader.includes('source-map-loader')) {
          oneOfRule.exclude = /node_modules/;
        }
      });
    }
  });

  return config;
};