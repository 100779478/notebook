async function uploadImages(urls, n) {
    let index = 0; // 当前上传的图片索引
    let activeLoadingNumber = 0; // 当前正在上传的图片数量

    async function uploadNext() {
        // 如果所有图片都已上传且没有正在上传的图片，结束上传
        if (index >= urls.length && activeLoadingNumber === 0) return;

        // 如果当前正在上传的图片数量小于 n，并且还有图片未上传，继续上传
        while (index < urls.length && activeLoadingNumber < n) {
            const url = urls[index++]; // 获取当前图片的 URL，并增加索引
            activeLoadingNumber++; // 增加正在上传的图片数量

            uploading(url).then(() => {
                console.log(`Uploaded: ${url}`);
                activeLoadingNumber--; // 上传完成后，减少正在上传的图片数量
                uploadNext(); // 补充新的图片
            });
        }
    }

    await uploadNext(); // 开始上传
}

function uploading(url) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(url); // 模拟上传完成
        }, 1500); // 模拟上传延迟
    });
}

// 示例使用
const urls = [
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png',
    'image9.png',
    'image10.png',
    'image11.png',
];

uploadImages(urls, 3); // 保持同时上传 3 张图片