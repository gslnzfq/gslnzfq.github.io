/**
 * 将dataURL转化成File对象
 * @param dataurl
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

/**
 * 压缩图片
 * @param file 文件对象，直接在input上可以获取
 * @param maxSize 最大宽度或者高度, 如果 height > width => height = maxSize, width自适应；如果 width > height => width = maxSize, height自适应；
 * @param maxHeight  最大高度，只设置maxHeight，宽度自适应；
 * @param maxWidth   最大宽度，只设置maxWidth，高度自适应；
 * 三个尺寸参数值设置一个   优先级  maxWidth > maxHeight > maxSize
 * @returns {Promise} 返回Object
 */

export default function resizer({file, maxSize = 1800, maxHeight, maxWidth}) {
    if (file.type.indexOf('image') > -1 && /\.(jpe?g|png|bmp)$/i.test(file.name)) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            let imageResult = null;
            //  读取图片的数据
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                imageResult = e.target.result;

                let canvasImage = new Image();
                canvasImage.src = imageResult;
                canvasImage.onload = function () {

                    const {width, height} = canvasImage;
                    let [newWidth, newHeight] = [0, 0];

                    //  如果图片本来就很小就不作处理了
                    if (maxWidth) {
                        if (width <= maxwidth) { newwidth="width;" newheight="height;" } else * height width; if (maxheight) (height <="maxHeight)" 最大高度，求宽度 width height; 最大宽度，求高度 (width> height) {
                            if (width </=>