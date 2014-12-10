angular.module("crud", ["ngCookies"])

.factory("service", ["$cookies", "$http", function($cookies, $http) {
	var base = "http://127.0.0.1:8080";
	//var base = "https://morning-reef-7939.herokuapp.com"

	function create(url, data, callback) {
		var newUrl = base + url;
		register(url, "CREAR (POST)", function() {
			$http({
				method: "POST",
				url: newUrl,
				data: data,
				content_type: "application/json",
			})
			.success(function(data) {
				callback(true, data);
			})
			.error(function(data) {
				console.log(data);
				callback(false, data);
			});
		});
	}

	function read(url, callback) {
		var newUrl = base + url;

		$http({
			method: "GET",
			url: newUrl,
			content_type: "application/json"
		})
		.success(function(data) {
			var ans = data;
			var status = true;
			if (data.objects != null) {
				ans = data.objects;
				status = ans.length;
			}
			callback(status, ans);
		})
		.error(function(data) {
			console.log(data)
			callback(false, data);
		});
	}

	function readParam(url, param, value, callback) {
		var newUrl = base + url + "?";

		if (typeof param == "array") {
			for (var i = 0; i < param.length; i++) {
				newUrl += param[i] + "=" + value[i];
				if (i != param.length - 1)
					newUrl += "&";
			}
		} else
			newUrl += param + "=" + value;

		$http({
			method: "GET",
			url: newUrl,
			content_type: "application/json"
		})
		.success(function(data) {
			callback(data.objects.length > 0, data.objects);
		})
		.error(function(data) {
			callback(false, data);
		});
	}

	function update(url, id, data, callback) {
		var newUrl = base + url + id + "/";
		register(url, "ACTUALIZAR (PUT)", function() {
			$http({
				method: "PUT",
				url: newUrl,
				data: data,
				content_type: "application/json"
			})
			.success(function(data) {
				callback(true, data);
			})
			.error(function(data) {
				console.log(data);
				callback(false, data);
			});
		});
	}

	function destroy(url, id, callback) {
		var newUrl = base + url + id + "/";
		register(url, "BORRAR (DELETE)", function() {
			$http({
				method: "DELETE",
				url: newUrl,
				content_type: "application/json"
			})
			.success(function(data) {
				callback(true, data);
			})
			.error(function(data) {
				callback(false, data);
			});
		});
	}

	function register(url, action, callback) {
		if (!$cookies.cliente || !$cookies.usuario) {
			location.assign("/login/login.html");
			return false;
		}
		data = {
			"cliente": $cookies.cliente,
			"usuario": $cookies.usuario,
			"descripcion": action + " " + url
		};
		$http({
			method: "POST",
			url: base + "/api/v1/historial/",
			data: data,
			content_type: "application/json"
		})
		.success(function(data) {
			console.log("Actividad registrada");
			callback();
		})
		.error(function(data) {
			console.log("Error al registrar actividad");
			console.log(data);
		})
	}

	return {
		"create": create,
		"read": read,
		"readParam": readParam,
		"update": update,
		"destroy": destroy
	}
}]);