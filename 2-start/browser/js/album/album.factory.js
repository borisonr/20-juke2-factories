'use strict';

juke.factory("AlbumFactory", function($http, $log) {
    return {
        fetchAll: function() {
            return $http.get('/api/albums/')
                .then(getData)
                .then(function(albums) {
                    return Promise.all(albums.map(function(album) {
                        return $http.get("/api/albums/" + album.id + "/songs")
                            .then(function(songs) {
                                album.songs = songs.data;

                            })
                    })).then(function() {
                        return albums;
                    })
                })
                .catch($log.error)
        },
        fetchById: function(data) {
            return $http.get('/api/albums/' + data[0].id)
                .then(getData)
                .catch($log.error)
        },
    }
})

function getData(res) {
    return res.data;
}
