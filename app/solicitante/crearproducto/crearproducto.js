angular.module("crearproducto", ["crud"])
.controller("CrearProductoController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.producto = {};
	$scope.producto.nombresinput = "";
	$scope.nombres = [];

	$scope.nombreschanged = function() {
		var length = $scope.nombresinput.length;
		if(length!=0){
			var lchar = $scope.nombresinput[length-1];
			if(lchar == ","){
				$scope.nombres.push(filternombre($scope.nombresinput));
				$scope.nombresinput = "";
			}
		}
	};
	$scope.deletenombre = function(nombre){
		deleteobj($scope.nombres,nombre);
	};

	$scope.quitarunidad = function(unidad) {
		var i = $scope.producto.unidades.indexOf(unidad);
		$scope.producto.unidades.splice(i, 1);
	};

	$scope.agregarunidad = function() {
		if ($scope.producto.unidades == null)
			$scope.producto.unidades = [];
		var max = $scope.producto.unidades.length;
		$scope.producto.unidades.push(max);
	};

	$scope.crearproducto = function() {
		// TODO
		var nombres = $scope.nombres;
		var names = [];
		var nombre = "";
		for (var i = 0; i < nombres.length; i++) {
			if (nombres[i] != ",") {
				nombre += nombres[i];
			} else {
				names.push(nombre);
				nombre = "";
			}
		}
		if (nombre.length > 0) {
			names.push(nombre);
			nombre = "";
		}
	};

	

}])
.directive("crearproducto", function() {
	return {
		templateUrl: "crearproducto/crearproducto.html"
	};
});
var filternombre = function(nombre){
	var ans = "";
	var i = 0;
	var l = nombre.length;
	while(i<l && nombre[i]==" ")
		i++;
	if(i == l)
		return "";
	while(i<l-1){
		if((i!=0 && nombre[i]==" " && nombre[i-1]!=" ") || nombre[i]!=" ")
			ans += nombre[i];
		i++;
	}
	return ans;
};
var deleteobj = function(array, obj){
	var i = array.indexOf(obj);
	array.splice(i,1);
};