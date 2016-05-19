'use strict';

juke.factory('PlayerFactory', function($rootScope) {
    // non-UI logic in here
    var audio = document.createElement('audio');
    var currentSong = null;
    var progress = 0;
    audio.addEventListener('timeupdate', function() {
        progress = audio.currentTime / audio.duration;
        $rootScope.$digest();
    });
    audio.addEventListener('ended', function() {
        this.next();
        $rootScope.digest()
    });

    var playFty = {
        playing: false,
        currentAlbum: null,
        currentSongIndex: null,
        get currentSong() {
            return currentSong
        },
        start: function(song, songList) {

            if (songList) {
                playFty.currentAlbum = songList;
                playFty.currentSongIndex = songList.indexOf(song);
            }
            if (currentSong === song) {
                return playFty.resume();
            }
            currentSong = song;
            playFty.pause();
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
            playFty.playing = true;
        },
        pause: function() {
            audio.pause();
            playFty.playing = false;
        },
        resume: function() {
            playFty.playing = true;
            return audio.play();

        },
        isPlaying: function() {
            if (playFty.playing) {
                return true;
            }
            return false;
        },
        getCurrentSong: function() {
            return currentSong;
        },
        next: function() {
            var nextSong;
            if (playFty.currentSongIndex === playFty.currentAlbum.length - 1) {
                nextSong = playFty.currentAlbum[0];
            } else {
                nextSong = playFty.currentAlbum[playFty.currentSongIndex + 1];
            }
            this.start(nextSong, playFty.currentAlbum);
        },
        previous: function() {
            var nextSong;
            if (playFty.currentSongIndex === 0) {
                nextSong = playFty.currentAlbum[playFty.currentAlbum.length - 1];
            } else {
                nextSong = playFty.currentAlbum[playFty.currentSongIndex - 1];
            }
            this.start(nextSong, playFty.currentAlbum);
        },
        getProgress: function() {
            return progress;
        }

    }
    return playFty;
});
