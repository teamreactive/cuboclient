angular.module("actualizarfamilia", ["crud", "ngCookies"])
.controller("ActualizarFamiliaController", ["$scope", "$cookies", "$http", "service", function($scope, $cookies, $http, service) {
	$scope.familia = {};

	$scope.ans = {};

	$scope.familias = [];
	var urlfamilia = "/api/v1/familia/";
	var clientecookie = $cookies.cliente.substring(0, $cookies.cliente.length-1);
	var cliente = clientecookie.substring(clientecookie.lastIndexOf("/")+1, clientecookie.length);
	service.readParam(urlfamilia, "cliente", cliente, function(status, data) {
		if (status || data.length == 0) {
			$scope.familias = data;
			console.log(urlfamilia + " " + data.length);
		} else {
			console.log("Error cargando " + urlfamilia);
		}
	})

	$scope.valid = true;
	$scope.checknombre = function() {
		if (!$scope.familia.nombre) {
			$scope.valid = true;
			return true;
		} else if ($scope.familia.nombre == $scope.copy.nombre) {
			$scope.valid = true;
			return true;
		} else {
			var keys = ["cliente", "nombre"];
			var vals = [cliente, $scope.familia.nombre];
			service.readParam(urlfamilia, keys, vals, function(status, data) {
				if (status || data.length == 0) {
					if (data.length > 0) {
						$scope.valid = false;
						return false;
					} else {
						$scope.valid = true;
						return true;
					}
				} else {
					console.log("No se pudo verificar el nombre");
					$scope.valid = false;
					return false;
				} 
			});
		}
	}

	$scope.copy = {};
	$scope.setCopy = function() {
		$scope.copy = jQuery.extend(true, {}, $scope.familia);
		return true;
	}

	$scope.descartar = function() {
		var index = $scope.familias.indexOf($scope.familia);
		if (index != -1) {
			$scope.familias.splice(index, 1);
		}
		$scope.familia = $scope.copy;
		$scope.familias.push($scope.familia);
		return true;
	}

	$scope.actualizarfamilia = function() {
		console.log($scope.familia);

		$scope.ans.css = "alert alert-info";
		$scope.ans.msg = "Espere un momento...";

		var url = "/api/v1/familia/";
		service.update(url, $scope.familia.id, $scope.familia, function(status, data) {
			if (status) {
				$scope.ans.css = "alert alert-success";
				$scope.ans.msg = "Familia-proveedor actualizada con exito";
				location.reload();
				return true;
			} else {
				$scope.ans.css = "alert alert-danger";
				$scope.ans.msg = "Ocurrio un error";
				return false;
			}
		})
	}
}])
.directive("actualizarfamilia", function() {
	return {
		templateUrl: "../common/actualizarfamilia/actualizarfamilia.html"
	};
});