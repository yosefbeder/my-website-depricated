const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');

async function getImageBase64(imagePath) {
	const sharpImg = sharp(imagePath);
	const meta = await sharpImg.metadata();
	const placeholderImgWidth = 20;
	const imgAspectRatio = meta.width / meta.height;
	const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);

	const imgBase64 = await sharpImg
		.resize(placeholderImgWidth, placeholderImgHeight)
		.toBuffer()
		.then(
			buffer => `data:image/${meta.format};base64,${buffer.toString('base64')}`,
		);

	return imgBase64;
}

(async () => {
	const dir = await fs.opendir(path.join(process.cwd(), 'public/images'));
	const images = [];
	const imagesBase64 = {};

	for await (const dirrent of dir) {
		images.push(dirrent.name);
	}

	await Promise.all(
		images.map(async image => {
			const imageBase64 = await getImageBase64(
				path.join(process.cwd(), `public/images/${image}`),
			);

			imagesBase64[image.slice(0, image.lastIndexOf('.'))] = imageBase64;
		}),
	);

	fs.writeFile(
		path.join(process.cwd(), 'public/images-base64.json'),
		JSON.stringify(imagesBase64),
	);
})();
