const faviconsContext = require.context(
  "./",
  true,
  /\.(svg|png|ico|xml|json)$/
);

faviconsContext.keys().forEach(faviconsContext);