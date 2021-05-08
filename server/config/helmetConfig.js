module.exports = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      objectSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["*"],
      fontSrc: ["*"],
      // baseUri: ['self'],
      // blockAllMixedContent: [],
      // frameAncestors: ['self'],
      // imgSrc: ['mjakubec.eu'],
      // scriptSrcAttr: ['none'],
      // upgradeInsecureRequests: [],
    },
  },
};
