angular.module("crearproducto", ["crud", "ngCookies"])
.controller("CrearProductoController", ["$scope", "$http", "service","$cookies", function($scope, $http, service,$cookies) {
	$scope.producto = {};
	$scope.producto.nombresinput = "";
	$scope.nombres = [];
	$scope.servicios = servicios;
	$scope.familias = [];
	$scope.ans = {};
	$scope.i = $cookies.cliente;
	$scope.submitenabled = true;
	$scope.getfamilias = function(){
		service.read("/api/v1/familia/",function(status, data){
			if(status){
				$scope.familias = data;
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
		if($scope.producto.familia.nombre == "--nueva familia")
			$scope.producto.familia = { "nombre": $scope.familia };
		else
			$scope.producto.familia = $scope.producto.familia.resource_uri;
		$scope.submitenabled = false;
		service.create("/api/v1/producto/", $scope.producto, function(status, data) {
			if(status) {
				console.log("Producto creado exitosamente");
				console.log(data);
				$scope.crearnombres(data.resource_uri);
			}
			else{
				console.log("Ocurrio un error");
				console.log(data);
			}
		});
	};

	$scope.crearnombres = function(uri) {
		alert("entered");
		var url = "/api/v1/nombreproducto/";
		if($scope.nombres.length != 0){
			var nombre = {"nombre":$scope.nombres[$scope.nombres.length-1],"producto":uri};
			service.create(url, nombre, function(status, data) {
				if (status) {
					console.log("Nombres agregados correctamente.");
					$scope.nombres.pop();
					$scope.crearnombres(uri);
				} else {
					console.log("Ocurrio un error.");
					console.log(data);
				}
			});
		}
	}

	

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