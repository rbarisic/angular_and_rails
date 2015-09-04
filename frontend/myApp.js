(function () {

    // Modules
    angular.module('myApp', ['contentful']);

    // Contentful Configuration
    angular
      .module('myApp')
      .config(function(contentfulProvider){
        contentfulProvider.setOptions({
            space: 'k9t1lgbm1ueu',
            accessToken: '71ed45fdca34d82236d78ea9e881d232618f7b38de2c386702ae7e679cf88424'
        });
      });
})();