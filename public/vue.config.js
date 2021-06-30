module.exports = {
  publicPath: '/demo',
  //   process.env.NODE_ENV === 'production' ? '/apiary/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/styles.scss";`,
      },
    },
  },
};
