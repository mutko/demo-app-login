module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `
          @import "~@/styles/_vars.scss";
          @import url("https://fonts.googleapis.com/css?family=Poppins:300,400,600&display=swap");
          `
      }
    }
  }
};
