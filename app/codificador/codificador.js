angular.module("app", [])
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
	$httpProvider.defaults.xsrfCookieName = "csrftoken";
}])
.controller("MainController", ["$scope", "$http", function($scope, $http) {

	/**
	 * ##############################################################
	 * ######################### TEST DATA ##########################
	 * ##############################################################
	**/

	$scope.opciones = {
		"familias": [
			{
				"nombre": "Ferreteria"
			},
			{
				"nombre": "Papeleria"
			},
			{
				"nombre": "Farmacia"
			}
		],
		"tipos": [
			{
				"nombre": "Bien"
			},
			{
				"nombre": "Servicio"
			}
		],
		"equipos": [
			{
				"nombre": "Equipo de papeleria"
			},
			{
				"nombre": "Equipo de farmacia"
			},
			{
				"nombre": "Equipo de ferreteria"
			},
			{
				"nombre": "No aplica"
			}
		],
		"centros": [
			{
				"nombre": "Centro de papeleria"
			},
			{
				"nombre": "Centro de ferreteria"
			},
			{
				"nombre": "Centro de farmacia"
			},
			{
				"nombre": "No aplica"
			}
		],
		"unidades": [
			{
				"nombre": "kg"
			},
			{
				"nombre": "m"
			},
			{
				"nombre": "mg"
			}
		]
	};

	$scope.opciones.pendientes = [
		{
			"id": "1",
			"nombre": "Taladro",
			"descripcion": "Taladro perfora todo",
			"marca": "Taladretor",
			"onu": "93417lhkghk421",
			"referencia": "25476573",
			"talla": "1",
			"familia": $scope.opciones.familias[0],
			"equipo": $scope.opciones.equipos[0],
			"centro": $scope.opciones.centros[1],
			"unidad": $scope.opciones.unidades[1],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "taladroPerforaOrejas.jpg"
		},
		{
			"id": "2",
			"nombre": "Tornillo",
			"descripcion": "Gran tornillo tamano familiar para cualquier ocasion",
			"marca": "SuperTornillos",
			"onu": "147083kjfds443",
			"referencia": "247583",
			"talla": "3",
			"familia": $scope.opciones.familias[1],
			"equipo": $scope.opciones.equipos[2],
			"centro": $scope.opciones.centros[0],
			"unidad": $scope.opciones.unidades[1],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "tornilloSuperDuper.jpg"
		},
		{
			"id": "3",
			"nombre": "Excavadora",
			"descripcion": "Hermosa excavadora con efecto 3D",
			"marca": "Excavator",
			"onu": "34789342nnhg5",
			"referencia": "413254",
			"talla": "34",
			"familia": $scope.opciones.familias[2],
			"equipo": $scope.opciones.equipos[1],
			"centro": $scope.opciones.centros[0],
			"unidad": $scope.opciones.unidades[0],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "excavadora34.jpg"
		},
		{
			"id": "4",
			"nombre": "Tractor",
			"descripcion": "Camion de banda ancha de gran capacidad",
			"marca": "Tractomula",
			"onu": "1347kjk5354",
			"referencia": "43572034",
			"talla": "34",
			"familia": $scope.opciones.familias[2],
			"equipo": $scope.opciones.equipos[2],
			"centro": $scope.opciones.centros[1],
			"unidad": $scope.opciones.unidades[0],
			"tipo": $scope.opciones.tipos[1],
			"imagen": "tractorTrack.jpg"
		},
		{
			"id": "5",
			"nombre": "Agarraderos",
			"descripcion": "Los agarraderos de la ropa",
			"marca": "Ganchiviris",
			"onu": "430805nkfdkh4",
			"referencia": "04132751",
			"talla": "38",
			"familia": $scope.opciones.familias[1],
			"equipo": $scope.opciones.equipos[2],
			"centro": $scope.opciones.centros[1],
			"unidad": $scope.opciones.unidades[0],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "ganchosGrises.jpg"
		},
	];

	$scope.opciones.productos = [
		{
			"id": "6",
			"nombre": "Ganchos",
			"descripcion": "Ganchos de colgar la ropa de metal antiadherente",
			"marca": "Ganchiviris",
			"onu": "430805nkfdkh4",
			"referencia": "04132751",
			"talla": "38",
			"familia": $scope.opciones.familias[1],
			"equipo": $scope.opciones.equipos[2],
			"centro": $scope.opciones.centros[1],
			"unidad": $scope.opciones.unidades[1],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "ganchosGrises.jpg"
		},
		{
			"id": "7",
			"nombre": "Cafe",
			"descripcion": "Bolsa de cafe granulado de Colombia listo para preparar",
			"marca": "Nescafe",
			"onu": "42575hhlm65",
			"referencia": "52707026",
			"talla": "4",
			"familia": $scope.opciones.familias[2],
			"equipo": $scope.opciones.equipos[0],
			"centro": $scope.opciones.centros[2],
			"unidad": $scope.opciones.unidades[0],
			"tipo": $scope.opciones.tipos[1],
			"imagen": "cafeColombiano.jpg"
		},
		{
			"id": "8",
			"nombre": "Computador",
			"descripcion": "Portatil de alta gama con un procesador Intel de ultima generacion",
			"marca": "Toshiba",
			"onu": "1234nf34",
			"referencia": "12349634",
			"talla": "3",
			"familia": $scope.opciones.familias[1],
			"equipo": $scope.opciones.equipos[0],
			"centro": $scope.opciones.centros[2],
			"unidad": $scope.opciones.unidades[1],
			"tipo": $scope.opciones.tipos[0],
			"imagen": "computadorInteligente.jpg"
		}
	];

	/**
	 * ##############################################################
	 * ######################## VARS SECTION ########################
	 * ##############################################################
	**/

	$scope.nav = "1";

	$scope.message = {
		"css": "",
		"message": ""
	};

	$scope.form = {};

	$scope.otro = {};

	$scope.rechazo = {};

	/**
	 * ##############################################################
	 * ######################## FUNCS SECTION #######################
	 * ##############################################################
	**/

	$scope.setNav = function(nav) {
		$scope.nav = nav;
		$scope.message = {
			"css": "",
			"message": ""
		};
		return true;
	};

	$scope.validNombre = function() {
		if ($scope.form.nombre == null) return true;
		for (var i = 0; i < $scope.opciones.productos.length; i++)
			if ($scope.opciones.productos[i]["nombre"].toLowerCase() == $scope.form.nombre.toLowerCase()) {
				return false;
			}
		return true;
	};

	$scope.editar = function(producto) {
		$scope.setNav("4");
		$scope.form.temp = producto;
		$scope.editarProducto();
		return true;
	};

	$scope.editarProducto = function() {
		var tipo = $scope.opciones.tipos.indexOf($scope.form.temp.tipo);
		var unidad = $scope.opciones.unidades.indexOf($scope.form.temp.unidad);
		var familia = $scope.opciones.familias.indexOf($scope.form.temp.familia);
		var centro = $scope.opciones.centros.indexOf($scope.form.temp.centro);
		var equipo = $scope.opciones.equipos.indexOf($scope.form.temp.equipo);
		$scope.form.producto = $.extend(true, {}, $scope.form.temp);
		$scope.form.producto.tipo = $scope.opciones.tipos[tipo];
		$scope.form.producto.unidad = $scope.opciones.unidades[unidad];
		$scope.form.producto.familia = $scope.opciones.familias[familia];
		$scope.form.producto.centro = $scope.opciones.centros[centro];
		$scope.form.producto.equipo = $scope.opciones.equipos[equipo];
		$scope.message.message = "";
		$scope.message.css = "";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return true;
	};

	$scope.descartarProducto = function() {
		$scope.editarProducto();
		$scope.message.css = "alert alert-danger";
		$scope.message.message = "Se descartaron los cambios.";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return true;
	}

	$scope.clean = function() {
		for (var i = 0; i < arguments.length; i++)
			$scope.form[arguments[i]] = "";
		return true;
	};

	$scope.aprobar = function(producto) {
		for (var i = 0; i < $scope.opciones.pendientes.length; i++) {
			if ($scope.opciones.pendientes[i] == producto) {
				$scope.opciones.pendientes.splice(i, 1);
				$scope.opciones.productos.unshift(producto);
				$scope.message.css = "alert alert-success";
				$scope.message.message = "Producto aprobado con exito.";
				$("html, body").animate({ scrollTop: 0 }, "fast");
				return true;
			}
		}
		$scope.message.css = "alert alert-danger";
		$scope.message.message = "No se encontro el producto.";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return false;
	};

	$scope.rechazar = function(producto) {
		for (var i = 0; i < $scope.opciones.pendientes.length; i++) {
			if ($scope.opciones.pendientes[i] == producto) {
				$scope.opciones.pendientes.splice(i, 1);
				$scope.message.css = "alert alert-success";
				$scope.message.message = "Producto rechazado con exito.";
				$scope.clean("rechazo");
				$("html, body").animate({ scrollTop: 0 }, "fast");
				return true;
			}
		}
		$scope.message.css = "alert alert-danger";
		$scope.message.message = "No se encontro el producto.";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return false;
	};

	$scope.crearProducto = function() {
		var producto = {
			"nombre": $scope.form.nombre,
			"descripcion": $scope.form.descripcion,
			"marca": $scope.form.marca,
			"unidad": $scope.form.unidad,
			"tipo": $scope.form.tipo,
			"onu": $scope.form.onu,
			"referencia": $scope.form.referencia,
			"talla": $scope.form.talla,
			"familia": $scope.form.familia,
			"equipo": $scope.form.equipo,
			"centro": $scope.form.centro,
			"foto": $scope.form.imagen,
		};

		$scope.opciones.productos.unshift(producto);
		$scope.clean("nombre", "descripcion", "marca",
		"unidad", "tipo", "onu", "referencia", "talla",
		"familia", "equipo", "centro", "foto");
		$scope.message.message = "Producto creado con exito.";
		$scope.message.css = "alert alert-success";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return true;
	};

	$scope.join = function(producto) {
		for (var i = 0; i < $scope.opciones.pendientes.length; i++) {
			if ($scope.opciones.pendientes[i] == producto) {
				if ($scope.form.otroProducto.marca != producto.marca) {
					$scope.message.message = "Las marcas no coinciden.";
					$scope.message.css = "alert alert-danger";
					$("html, body").animate({ scrollTop: 0 }, "fast");
					return false;
				}
				
				else if ($scope.form.otroProducto.tipo.nombre != producto.tipo.nombre) {
					$scope.message.message = "Los tipos no coinciden.";
					$scope.message.css = "alert alert-danger";
					$("html, body").animate({ scrollTop: 0 }, "fast");
					return false;
				}

				else {
					if ($scope.form.otroProducto.unidades == null &&
					$scope.form.otroProducto.unidad != producto.unidad) {
						$scope.form.otroProducto.unidades = [$scope.form.otroProducto.unidad];
						$scope.form.otroProducto.unidades.unshift(producto.unidad);
					}
					if ($scope.form.otroProducto.nombres == null)
						$scope.form.otroProducto.nombres = [];
					$scope.form.otroProducto.nombres.unshift(producto.nombre);
					$scope.clean("otroProducto");
					$scope.opciones.pendientes.splice(i, 1);
					$scope.message.message = "Operacion realizada con exitos.";
					$scope.message.css = "alert alert-success";
					$("html, body").animate({ scrollTop: 0 }, "fast");
					return true;
				}
			}
		}
		$scope.message.message = "No se encontro el producto.";
		$scope.message.css = "alert alert-danger";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		return false;
	};

	$scope.alterarProducto = function() {
		var iProd = $scope.opciones.productos.indexOf($scope.form.temp);
		var iPend = $scope.opciones.pendientes.indexOf($scope.form.temp);
		var producto = {
			"nombre": $scope.form.producto.nombre,
			"descripcion": $scope.form.producto.descripcion,
			"marca": $scope.form.producto.marca,
			"unidad": $scope.form.producto.unidad,
			"tipo": $scope.form.producto.tipo,
			"onu": $scope.form.producto.onu,
			"referencia": $scope.form.producto.referencia,
			"talla": $scope.form.producto.talla,
			"familia": $scope.form.producto.familia,
			"equipo": $scope.form.producto.equipo,
			"centro": $scope.form.producto.centro,
			"foto": $scope.form.producto.imagen,
			"nombres": $scope.form.producto.nombres,
			"unidades": $scope.form.producto.unidades
		};

		if (iProd != -1) {
			$scope.opciones.productos.splice(iProd, 1);
			$scope.opciones.productos.unshift(producto);
			$scope.form.temp = producto;
			$scope.message.message = "Producto alterado correctamente.";
			$scope.message.css = "alert alert-success";
			$("html, body").animate({ scrollTop: 0 }, "fast");
			return true;
		}

		else if (iPend != -1) {
			$scope.opciones.pendientes.splice(iPend, 1);
			$scope.opciones.productos.unshift(producto);
			$scope.form.temp = producto;
			$scope.message.message = "Producto aprobado correctamente.";
			$scope.message.css = "alert alert-success";
			$("html, body").animate({ scrollTop: 0 }, "fast");
			return true;
		}

		else {
			$scope.message.message = "No se encontro el producto.";
			$scope.message.css = "alert alert-danger";
			$("html, body").animate({ scrollTop: 0 }, "fast");
			return false
		}
	}
}]);