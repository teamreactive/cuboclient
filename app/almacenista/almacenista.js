var app= angular.module("Almacenista",[]);
app.controller("MainTabController", function(){
	this.tab = 1;
	this.SetTab = function(tab){
		this.tab = tab;
	};
	this.isTab = function(tab){
		return this.tab === tab;
	};
});
app.controller("mainController",["$http",function($http){
	$http.get("products.").success(function(data){
		
	});
}]);