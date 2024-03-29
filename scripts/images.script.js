const cameras = require("../frontend/src/mock/cameras.mock.json");
const fs = require("fs");
const request = require("request");
const { basename, extname, join } = require("path");
const sanitize = require("sanitize-filename");
const { extension } = require("mime-types");
const { removeVI } = require("jsrmvi");

function getURL(cameraID) {
	return `http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${cameraID}`;
}

const dest = join(__dirname, "images");

function download(uri, camera) {
	return request({ url: uri, encoding: null }, function (error, response, body) {
		if (error || response.statusCode < 200 || response.statusCode >= 300) {
			console.error(`Request failed`);
			return;
		}

		let fileName = join(dest, sanitize(basename(removeVI(camera.name))));
		if (!extname(fileName)) {
			const contentType = response.headers["content-type"];
			const ext = extension(contentType);

			if (ext) {
				fileName += `.${ext}`;

				fs.writeFile(fileName, body, (err) => {
					if (err) {
						console.log(err);
						return;
					}
				});
			} else {
				console.log("Cannot detect file extension!");
			}
		}
	});
}

cameras.forEach((camera) => {
	download(getURL(camera.id), camera);
});
