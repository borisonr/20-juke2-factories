'use strict';

juke.factory("AlbumFactory", function($http) {
    return {
        fetchAll: function() {
            return $http.get('/api/albums/')
                .then(function(res) {
                    return res.data;
                })
        },
        fetchById: function(data) {
            return $http.get('/api/albums/' + data[0].id)
                .then(function(res) {
                    return res.data;
                })
        }
    }
})


// AlbumFactory.fetchAll().then(AlbumFactory.fetchById)
