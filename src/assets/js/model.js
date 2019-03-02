import * as tf from '@tensorflow/tfjs';

class Webcam {
    /**
     * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
     */
    constructor(webcamElement) {
      this.webcamElement = webcamElement;
    }

    /**
     * Captures a frame from the webcam and normalizes it between -1 and 1.
     * Returns a batched image (1-element batch) of shape [1, w, h, c].
     */
    capture() {
      return tf.tidy(() => {
        // Reads the image as a Tensor from the webcam <video> element.
        const webcamImage = tf.browser.fromPixels(this.webcamElement);

        // Crop the image so we're using the center square of the rectangular
        // webcam.
        const croppedImage = this.cropImage(webcamImage);

        // Expand the outer most dimension so we have a batch size of 1.
        const batchedImage = croppedImage.expandDims(0);

        // Normalize the image between -1 and 1. The image comes in between 0-255,
        // so we divide by 127 and subtract 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      });
    }

    /**
     * Crops an image tensor so we get a square image with no white space.
     * @param {Tensor4D} img An input image Tensor to crop.
     */
    cropImage(img) {
      const size = Math.min(img.shape[0], img.shape[1]);
      const centerHeight = img.shape[0] / 2;
      const beginHeight = centerHeight - (size / 2);
      const centerWidth = img.shape[1] / 2;
      const beginWidth = centerWidth - (size / 2);
      return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
    }

    /**
     * Adjusts the video size so we can make a centered square crop without
     * including whitespace.
     * @param {number} width The real width of the video element.
     * @param {number} height The real height of the video element.
     */
    adjustVideoSize(width, height) {
      const aspectRatio = width / height;
      if (width >= height) {
        this.webcamElement.width = aspectRatio * this.webcamElement.height;
      } else if (width < height) {
        this.webcamElement.height = this.webcamElement.width / aspectRatio;
      }
    }

    async setup() {
      return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
          navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
          navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
          navigator.getUserMedia({
              video: {
                facingMode: "User"
              }
            },
            stream => {
              this.webcamElement.srcObject = stream;
              this.webcamElement.addEventListener('loadeddata', async () => {
                this.adjustVideoSize(
                  this.webcamElement.videoWidth,
                  this.webcamElement.videoHeight);
                resolve();
              }, false);
            },
            error => {
              reject();
            });
        } else {
          reject();
        }
      });
    }
  }
let model;
const webcam = new Webcam(document.getElementById('webcamloc'));
const statusElement = document.getElementById('status');
const snapshotelement = document.getElementById('snapshot');
// snapshotelement.style.visibility = 'hidden';

async function loadMobileNetv2() {

  let d1 = new Date();
  let time1 = d1.getTime();
//   console.log(1111);

  const mobilenet = await tf.loadLayersModel(
	// 'https://tfjs-1256337767.cos.ap-shanghai.myqcloud.com/model.json');
  'https://raw.githubusercontent.com/Ericccccccccccc/tfjs/master/model.json');
  //'https://lz-legal-aid.cn:9000/download/model.json');

//   alert('load done!');
  // Return a model that outputs an internal activation.

//   let d2 = new Date();
//   let time2 = d2.getTime();
//   document.getElementById('status').innerHTML = 'Loading Done!\n' + '用时:' + String((time2 - time1) / 1000.0) + '秒'
  return mobilenet
}


function draw(image, canvas) {
  const [width, height] = [224, 224];
  const ctx = canvas.getContext('2d');
  const imageData = new ImageData(width, height);
  const data = image.dataSync();
  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127;
    imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127;
    imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127;
    imageData.data[j + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

function to_draw(img) {
  const thumbCanvas = document.getElementById('myresult');
  draw(img, thumbCanvas);
}

async function take_snapshot() {
    const img = webcam.capture();
    to_draw(img);
    console.log(img);
    // Capture the frame from the webcam.
    let d = new Date();
    let time1 = d.getTime();
    const predictions = model.predict(img);
    // Returns the index with the maximum probability. This number corresponds
    // to the class the model thinks is the most probable given the input.
    let d2 = new Date();
    let time2 = d2.getTime();
	document.getElementById('time').innerHTML = '用时:' + String((time2 - time1) / 1000.0) + '秒'

    //p = predictions.as1D().argMax();
    //console.log(predictions.as1D().data())
    maxpre = predictions.as1D().max();
    p = predictions.as1D().argMax();
    // console.log(predictions.as1D().data())

    const classId = await (p.data());
    const Maxpre = await (maxpre.data());
    labels = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip'];
    label_chinese = ['雏菊', '蒲公英', '玫瑰', '向日葵', '郁金香'];
    console.log(Maxpre[0]);
    if (Maxpre[0] < 0.9) {
      var hint = '请对准要识别的植物或者植物不在雏菊,蒲公英,玫瑰,向日葵,郁金香的类别中';
      document.getElementById('result').innerHTML = hint;
    } else {
      //predictedClass.dispose();

      console.log(classId[0]);

      if (Maxpre == 1) {
        confidence = 'confidence: 1';
      } else {
        confidence = 'confidence:' + String(Maxpre)[0] + String(Maxpre)[1] + String(Maxpre)[2] + String(Maxpre)[3];
      }
      document.getElementById('result').innerHTML = labels[classId[0]] + ', ' + label_chinese[classId[0]] + '\n' + confidence;
      //let res = model.predict(img)
      // res = res.as1D().argMax()

      // console.log(res)
    }
  }

export default
{
	analysize: async function(model, img)
	{
		var data = {};

		let d = new Date();
		let time1 = d.getTime();

		var dom = $("<img>");  dom.prop("src", img);
		img = this.convert(dom[0]);

		const predictions = model.predict(img);

		let d2 = new Date();
		let time2 = d2.getTime();
		// document.getElementById('time').innerHTML = '用时:' + String((time2 - time1) / 1000.0) + '秒'
		data.timeSpan = (time2 - time1) /1000.0;

		//p = predictions.as1D().argMax();
		//console.log(predictions.as1D().data())
		let maxpre = predictions.as1D().max();
		let p = predictions.as1D().argMax();
		// console.log(predictions.as1D().data())

		const classId = await (p.data());
		const Maxpre = await (maxpre.data());
		const labels = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip'];
		const label_chinese = ['雏菊', '蒲公英', '玫瑰', '向日葵', '郁金香'];

		var confidence = 0, res = {}

		if (Maxpre[0] < 0.9) {
			var hint = '请对准要识别的植物或者植物不在雏菊,蒲公英,玫瑰,向日葵,郁金香的类别中';
			//   document.getElementById('result').innerHTML = hint;

			data.succ = false;
		} else {

			if (Maxpre == 1) {
				confidence = 1;
			} else {
				confidence = String(Maxpre)[0] + String(Maxpre)[1] + String(Maxpre)[2] + String(Maxpre)[3];
			}
			// document.getElementById('result').innerHTML = labels[classId[0]] + ', ' + label_chinese[classId[0]] + '\n' + confidence;

			data.cname = label_chinese[classId[0]];
			data.ename = labels[classId[0]];

			data.succ = true;
		}

		data.confidence = confidence;
		return data;
	},
	convert(img) {
		const webcamImage = tf.browser.fromPixels(img);

		// Crop the image so we're using the center square of the rectangular
		// webcam.
		const croppedImage = this.cropImage(webcamImage);

		// Expand the outer most dimension so we have a batch size of 1.
		const batchedImage = croppedImage.expandDims(0);

		// Normalize the image between -1 and 1. The image comes in between 0-255,
		// so we divide by 127 and subtract 1.
		return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
	},
	cropImage(img) {
	  const size = Math.min(img.shape[0], img.shape[1]);
	  const centerHeight = img.shape[0] / 2;
	  const beginHeight = centerHeight - (size / 2);
	  const centerWidth = img.shape[1] / 2;
	  const beginWidth = centerWidth - (size / 2);
	  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
	},

	modelInit: async function init() {
		model = await loadMobileNetv2();
		return model;
	}
};