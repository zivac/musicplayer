angular.module('musicApp', ['ngMaterial', 'ngRoute', 'wu.masonry'])
.config(function($mdThemingProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');

    $routeProvider
    .when('/artists', {
        templateUrl: 'views/artists.html',
        controller: 'ArtistsCtrl'
    })
    .when('/albums', {
        templateUrl: 'views/albums.html',
        controller: 'AlbumsCtrl'
    })
    .when('/songs', {
        templateUrl: 'views/songs.html',
        controller: 'SongsCtrl'
    })
    .when('/playlists', {
        templateUrl: 'views/playlists.html',
        controller: 'PlaylistsCtrl'
    });
})
.controller("MenuCtrl", function($scope) {
    window.setTimeout(function() {
        angular.element('.md-tab').click(function(e) {
            var path = angular.element(this).find('.ng-scope').html();
            window.location = '#/'+path;
        });
    }, 1);
})
.controller("SearchCtrl", function($scope, $http) {

    $scope.list = [];
    
    $scope.search = function() {
        var query = $scope.query;
        var type = $scope.type;
        $http.get('https://api.spotify.com/v1/search', {params: {q:query, type:type}})
        .success(function(data) {
            console.log(data);
            $scope.list = [];
            data[type+'s'].items.forEach(function(obj) {
                if(obj.popularity < 10) return;
                var images = type=='track'?obj.album.images:obj.images;
                if(images.length > 0) var image = images[0].url;
                else image = 'http://www.the-music-shop.com/wp-content/uploads/2015/02/placeholder.png';
                $scope.list.push({image: image, name:obj.name});
            });
            console.log($scope.list);
        });
    }
})
.controller("ArtistsCtrl", function($scope) {
    $scope.type = 'artist';
})
.controller("AlbumsCtrl", function($scope) {
    $scope.type = 'album';
})
.controller("SongsCtrl", function($scope) {
    $scope.type = 'track';
})
.controller("PlaylistsCtrl", function($scope) {
    $scope.type = 'playlist';
})