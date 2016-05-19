'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory) {

    $scope.toggle = function() {

        if (PlayerFactory.playing) PlayerFactory.pause();
        else PlayerFactory.start(PlayerFactory.currentSong, PlayerFactory.currentAlbum);
    };

    $scope.firstSongPlaying = function() {
        return PlayerFactory.currentSong;
    }

    $scope.isSongPlaying = function() {
        return PlayerFactory.isPlaying();
    }

    $scope.prev = function() {
        PlayerFactory.previous();
    }

    $scope.next = function() {
        PlayerFactory.next();
    }

    $scope.myProgress = function() {
        return PlayerFactory.getProgress() * 100;
    }

});
