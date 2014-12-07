angular.module("crearsolicitud", ["crud","ngCookies"])
.controller("CrearSolicitudController", ["$scope", "$http", "service", "$cookies", function($scope, $http, service,$cookies) {
	
	$scope.cliente = $cookies.cliente;
	$scope.usuario = $cookies.usuario;
	$scope.tipo = $cookies.tipo;
	$scope.solicitud = {};
	$scope.ans = {};
	$scope.iscambiaraprobador = false;
	$scope.solicitud.productos = [];
	$scope.lineas = [];
	$scope.solicitud = {};
	$scope.wait = false;

	$scope.getLugares = function(){
		service.read("/api/v1/lugar/",function(status, data){
			if(status){
				$scope.lugares = data;
			} else{
				$scope.ans.msgcontacto = "Hubo un error cargando los lugares";
			}
		});
	};
	$scope.getSolicitantes = function(){
		service.readParam("/api/v1/consolidadorsolicitante/","consolidador",get_id( $scope.usuario ),function(status, data){
			if (status){
				$scope.solicitantes = data;
			} else {
				alert("fuck")
			}
		})
	};
	$scope.getAllSolicitantes = function(){
		service.readParam("/api/v1/usuario/",["cliente","tipo"],[get_id($scope.cliente),"3"],function(status, data){
			if (status){
				$scope.allsolicitantes = data;
			} else {
				alert("fuck");
			}
		})
	};
	$scope.getCentros = function(){
		service.readParam("/api/v1/centro/","cliente",get_id($scope.cliente),function(status,data){
			if (status){
				$scope.centros = data;
			} else {
				alert("fuck");
			}
		})
	}
	$scope.getEquipos = function(){
		service.readParam("/api/v1/equipo/","cliente",get_id($scope.cliente),function(status,data){
			if (status){
				$scope.equipos = data;
			} else {
				alert("fuck");
			}
		})
	}
	$scope.getAprobadores = function(){
		service.readParam("/api/v1/usuario/",["cliente","tipo"],[get_id($scope.cliente),"6"],function(status, data){
			if (status){
				$scope.aprobadores = data;
			} else {
				alert("fuck");
			}
		})
	};
	$scope.getAprobador = function(){
		service.readParam("/api/v1/aprobadorsolicitudessolicitante/","solicitante",get_id($scope.usuario),function(status, data){
			if (status){
				$scope.aprobador = data[0].aprobador;
			} else {
				alert("fuck");
			}
		})
	};
	$scope.getProductos = function(){
		service.readParam("/api/v1/producto/","cliente", get_id($scope.cliente),function(status, data){
			if (status){
				$scope.productos = data;
			} else {
				alert("fuck producto");
			}
		})
	}
	$scope.getLugares();
	$scope.getSolicitantes();
	$scope.getAllSolicitantes();
	$scope.getCentros();
	//$scope.getEquipos();
	$scope.getAprobador();
	$scope.getProductos();
	//check fechas
	$scope.agregarproducto = function(producto){
		var linea = {};
		$scope.lineas.push(linea);
		deleteobj($scope.productos,producto);
		linea.producto = producto;
		$scope.searchproducto = "";
		$scope.wait = false;
	};
	$scope.cambiaraprobador = function(){
		$scope.getAprobadores();
		$scope.iscambiaraprobador = true;
	};
	$scope.crearsolicitud = function(){
		if($scope.tipo == "4"){
			$scope.solicitud.consolidador = $scope.usuario;
			$scope.solicitud.solicitante = $scope.solicitante.solicitante.resource_uri;
		}else if($scope.tipo == "3"){
			$scope.solicitud.solicitante = $scope.usuario;
		}else{
			alert("este usuario no tiene permitido crear solicitudes");
			return;
		}
		$scope.solicitud.estado = "1";
		$scope.solicitud.lugar = $scope.lugar.resource_uri;
		$scope.solicitud.fechacreacion = todaydate();
		$scope.solicitud.fecharequerida = $scope.fecharequerida;
		$scope.solicitud.aprobador = $scope.aprobador.resource_uri;
		$scope.solicitud.centro = $scope.centro.resource_uri;
		//equipo
		//proyecto
		service.create("/api/v1/solicitud/", $scope.solicitud ,function(status,data){
			if(status){
				$scope.crearproductossolicitud(data.resource_uri,0);
			}else
				alert("fuck creacion solicitud");
		});
	};
	$scope.crearproductossolicitud = function(uri,i){
		if(i!=$scope.lineas.length){
			$scope.lineas[i].linea = {};
			var linea = $scope.lineas[i].linea;
			var l = $scope.lineas[i];
			linea.linea = i+1;
			linea.producto = l.unidad.resource_uri;
			linea.cantidad = l.cantidad;
			linea.solicitud = uri,
			linea.estado = 1;
			service.create("/api/v1/productosolicitud/",linea,function(status,data){
				if (status){
					$scope.crearproductossolicitud(uri,i+1)
					alert("i think super success");
				}else{
					alert("ocurrio un error");
				}
			});
		}
	};
	$scope.validForm = function(){
		if ($scope.lineas.length == 0 || ($scope.centro == undefined && $scope.equipo == undefined) || $scope.aprobador == undefined)
			return false;
		if($scope.tipo == "4")
			if($scope.solicitante == "")
				return false;
		return true;
	};
}])
.directive("crearsolicitud", function() {
	return {
		templateUrl: "crearsolicitud/crearsolicitud.html"
	};
});

var get_id = function(uri){
	var i = uri.length-2;
	var c = uri[i];
	var id = "";
	while(c!="/"){
		id = c + id;
		c = uri[--i];
	}
	return id;
};

var deleteobj = function(array, obj){
	var i = array.indexOf(obj);
	array.splice(i,1);
};
var todaydate = function(){
	var f = new Date();
	var d = f.getDate();
	var m = f.getMonth()+1;
	var y = f.getFullYear();
	if (d < 10)
		d = '0' + d;
	if (m < 10)
		m = '0' + m;
	return y+'-'+m+'-'+d
};
