angular.module("crud", [])

.factory("service", ["$http", function($http) {
	var base = "http://127.0.0.1:8080"

	function create(url, data, callback) {
		var newUrl = base + url;

		$http({
			method: "POST",
			url: newUrl,
			data: data,
			content_type: "application/json"
		})
		.success(function(data) {
			callback(true, data);
		})
		.error(function(data) {
			callback(false, data);
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

	function update() {
		console.log("MISSING CONTENT");
		return false;
	}

	function destroy(url, id, callback) {
		var newUrl = base + url + id + "/";

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
	}

	return {
		"create": create,
		"read": read,
		"readParam": readParam,
		"update": update,
		"destroy": destroy
	}
}]);