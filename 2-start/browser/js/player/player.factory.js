'use strict';

juke.factory('PlayerFactory', function($rootScope) {
    // non-UI logic in here
    var audio = document.createElement('audio');
    var currentAlbum = null;
    var currentSong = null;
    var currentSongIndex = null;
    var playing = false;
    var progress = 0;
    audio.addEventListener('timeupdate', function() {
        progress = audio.currentTime / audio.duration;
        $rootScope.$digest();
    });


    return {
        start: function(song, songList) {
            currentSong = song;
            if (songList) {
                currentAlbum = songList;
                currentSongIndex = songList.indexOf(song);
            }
            this.pause();
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
            playing = true;
        },
        pause: function() {
            audio.pause();
            playing = false;
        },
        resume: function() {
            audio.play()
            playing = true;
        },
        isPlaying: function() {
            if (playing) {
                return true;
            }
            return false;
        },
        getCurrentSong: function() {
            return currentSong;
        },
        next: function() {
            var nextSong;
            if (currentSongIndex === currentAlbum.length - 1) {
                nextSong = currentAlbum[0];
            } else {
                nextSong = currentAlbum[currentSongIndex + 1];
            }
            this.start(nextSong, currentAlbum);
        },
        previous: function() {
            var nextSong;
            if (currentSongIndex === 0) {
                nextSong = currentAlbum[currentAlbum.length - 1];
            } else {
                nextSong = currentAlbum[currentSongIndex - 1];
            }
            this.start(nextSong, currentAlbum);
        },
        getProgress: function() {
            return progress;
        }

    }
});
