module.exports = {
  publicPath: '/demo',
  outputDir: 'dist/demo'
  //   process.env.NODE_ENV === 'production' ? '/apiary/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/styles.scss";`,
      },
    },
  },
};
