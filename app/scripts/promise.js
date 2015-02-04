define([], function () {

	if (typeof Promise === 'undefined') throw new {msg: 'Promise.allSettled polyfill needs native Promise support.'};

	Promise.allSettled = Promise.allSettled || function (all) {

		var promise = new Promise( function (resolve, reject) {

			var initing = true, count = 0;
			var end = function () {
				if (!initing && count === 0) {
					count = -1;
					resolve();
				}
			};

			if (all.length) {
				for (i = 0; i < all.length; i++) {

					all[i].then(function () {
						end();
					}, function () {
						end();
					});

				}
				initing = false;
				end();
			} else {
				resolve();
			}

		});

		return promise;

	};

	return Promise;
});