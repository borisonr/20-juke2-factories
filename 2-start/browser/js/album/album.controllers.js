'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, AlbumFactory, PlayerFactory) {

    // load our initial data
    AlbumFactory.fetchAll()
        .then(function(data) {
            return AlbumFactory.fetchById(data)
        })
        .then(function(album) {
            album.imageUrl = '/api/albums/' + album.id + '/image';
            album.songs.forEach(function(song, i) {
                song.audioUrl = '/api/songs/' + song.id + '/audio';
                song.albumIndex = i;
            });

            $scope.album = album;
        })
        .catch($log.error); // $log service can be turned on and off; also, pre-bound

    // main toggle
    $scope.toggle = function(song, album) {
        if (PlayerFactory.playing && song === PlayerFactory.currentSong) {
            PlayerFactory.pause();
        } else {
            PlayerFactory.start(song, album)
        };
    };
    $scope.isCurrentSong = function(song) {
        return PlayerFactory.currentSong === song;
    }
    $scope.isSongPlaying = function() {
        return PlayerFactory.playing;
    }
    $scope.$on("viewSwap", function(event, data) {
        $scope.showMe = (data.name === "oneAlbum");

    })
});

juke.controller("albumsCtrl", function($scope, $rootScope, AlbumFactory) {
    AlbumFactory.fetchAll()
        .then(function(data) {
            $scope.albums = data;
        })
    $scope.$on('viewSwap', function(event, data) {
        $scope.showMe = (data.name === "allAlbums");
    });
    $scope.showAlbum = function(albumId) {
        $rootScope.$broadcast("viewSwap", {
            name: "oneAlbum",
            id: albumId
        });
    }
})
