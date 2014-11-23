angular.module("crearproducto", ["crud"])
.controller("CrearProductoController", ["$scope", "$http", "service", function($scope, $http, service) {
	$scope.producto = {};
	$scope.producto.nombresinput = "";
	$scope.nombres = [];
	$scope.servicios = servicios;
	$scope.familias = [];
	$scope.ans = {};
	$scope.getfamilias = function(){
		service.read("/api/v1/familia/",function(status, data){
			if(status){
				$scope.familias = data;
				$scope.familias.push({"nombre":"--nueva familia"})
			} else{
				$scope.ans.familiasmsg = "Hubo un error cargando las familias";
			}
		});
	};
	$scope.getfamilias();
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
var servicios = [{"id":true,"nombre":"servicio"},{"id":false,"nombre":"bien"}];