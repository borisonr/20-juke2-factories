console.log('at top of client')


var obama = angular.module('obama', [])

console.log('obama app', obama)



obama.controller('PostController', function($scope, $timeout){

	console.log('in the post controller!')

	console.log('scope object', $scope)



	// $scope.changeName = function(){
		$scope.firstName = 'anotherName';
	// }

		$scope.changeName = function(){
			$scope.firstName = 'happy'
		}

		// setTimeout(function(){
		// 	$scope.firstName = 'newName'; 
		// 	$scope.$digest()

		// }, 1500)

// $timeout(function(){
// 	$scope.firstName = 'newName'
// }, 2000)

		$scope.songs = [{
			name: 'Purple Rain', 
			artist: 'Prince'
		}, {
			name: 'Sorry', 
			artist: 'Bieber'
		}]



})

obama.controller('RandomController', function($scope){


	// $scope.firstName =  $scope.$parent.firstName + ' biden'	console.log('scope of random', $scope)

		// $scope.firstName = 'obama'



})

