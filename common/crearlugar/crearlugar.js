angular.module("crearlugar", ["crud", "ngCookies"])
.controller("CrearLugarController", ["$scope", "$http", "service", "$cookies" , function($scope, $http, service, $cookies) {
	var url = "/api/v1/lugar/";

	$scope.cliente = $cookies.cliente;

	$scope.getcontactos = function(){
			service.read("/api/v1/contacto/",function(status, data){
			if(status){
				$scope.contactos = data;
			} else{
				$scope.ans.msgcontacto = "Hubo un error cargando los contactos";
			}
		});
	};

	$scope.init = function(){
		$scope.secciones = secciones;
		$scope.ans = {};
		$scope.contactostatus = 0;
		$scope.lugar = {};
		$scope.lugar.contactos = [];
		$scope.contactos = [];
		$scope.contacto = {};
		$scope.getcontactos();
	};
	$scope.init();

	$scope.iscontactostatus = function(num){
		return $scope.contactostatus == num;
	};
	$scope.setcontactostatus = function(num){
		$scope.contactostatus = num;
	};
	
	$scope.addcontacto = function(){
		$scope.lugar.contactos.push($scope.contacto);
		deleteobj($scope.contactos,$scope.contacto);
		$scope.contacto = {};
		$scope.setcontactostatus(0);
	};
	$scope.crear = function(){
		var contactos = $scope.lugar.contactos;
		$scope.lugar.seccion = $scope.seccion.id;
		$scope.lugar.usuario = $cookies.usuario;
		$scope.ans.msg = "Espere un momento porfavor...";
		for(var i =0; i< contactos; i++){
			if(contactos[i].id != undefined)
				contactos[i] = "/api/v1/contacto/"+contactos[i].id+"/";
		}
		service.create(url, $scope.lugar, function(status,data){
			if(status){
				$scope.ans.msg = "lugar creado exitosamente";
				$scope.init();
				alert("lugar creado exitosamente");
				$scope.nombrestatus = "";
				location.reload();
			} else 
				$scope.ans.msg = "ha ocurrido un error porfavor intentelo de nuevo";
		});
	};
	$scope.eliminarcontacto = function(contacto){
		deleteobj($scope.lugar.contactos,contacto);
		if(contacto.id != undefined)
			$scope.contactos.push(contacto);
	};
	$scope.checknombre = function(){
		$scope.nombrestatus = "espere..."
		service.readParam("/api/v1/lugar/","nombre",$scope.lugar.nombre,function(status,data){
			if(status){
				$scope.nombrestatus = "nombre no disponible"
			}
			else{
				$scope.nombrestatus = "nombre disponible"
			}

		});
	};

}])
.directive("crearlugar", function() {
	return {
		templateUrl: "../common/crearlugar/crearlugar.html"
	};
});
var secciones = [
	{"id":"1","nombre":"avenida"},
	{"id":"2","nombre":"calle"},
	{"id":"3","nombre":"carrera"},
	{"id":"4","nombre":"diagonal"},
	{"id":"5","nombre":"transversal"}
];
var deleteobj = function(array, obj){
	var i = array.indexOf(obj);
	array.splice(i,1);
};
