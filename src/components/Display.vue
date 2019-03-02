<template>

    <div class="row my-container">
        <mt-button icon="back" @click="back" style="float:left"> </mt-button>

		<div class="my-tip"> 下载模型用时：{{ modelTimeSpan }} </div>
		<div class="my-tip"> 计算用时：{{ data.timeSpan }} </div>
		<div class="my-tip"> 确信度：{{ data.confidence }} </div>

		<div v-if="data.succ">
			<div style="margin:20% 20%; color:gray;">
				<h2 style="margin-left:-3%;"> {{ info.中文名 }} </h2>

				<hr style="margin-left:-20%;"/>

				<p class="my-font" v-for="(val, key, index) in info" :key="index">
					<span class="col-xs-6 my-key"> {{ key }}: </span>
					<span class="col-xs-6 my-value"> {{ val }} </span>
				</p>
			</div>
		</div>

		<div v-else>
			<div style="margin:20% 20%; color:gray;">
				<h2 style="margin-left:-3%;"> 鉴别失败 </h2>
				<p style="margin:10% -10%; text-indent:1em;">
					请对准要识别的植物或者植物不在雏菊,蒲公英,玫瑰,向日葵,郁金香的类别中
				</p>
			</div>
		</div>

		<div style="text-align:center;">
			<div class="my-img-wrap">

				<!-- <div id="my-range"> </div> -->
				<img :src="image">
			</div>
		</div>

        <!-- <mt-button @click.native="camera()" type="danger" class="button button-caution button-pill button-jumbo">
            <i class="fa fa-camera"> 合个影吧 </i>
            <input id="launch-camera" @change="imageDeal" type="file" capture="camera" accept="image/*" style="display:none">
        </mt-button> -->
    </div>

</template>


<script>
import dicts from "../assets/js/data.js"

export default
{
    data: function() {
        return {
			info: null,
			image: null,
			data: null,
			modelTimeSpan: null
        }
    },
    created: function()
    {
		this.data = this.$route.params.data;
		this.image = this.$route.params.image;
		this.modelTimeSpan = this.$store.state.modelTimeSpan;

		$.each(dicts, (i, dict)=> {
			if( this.data.cname === dict.中文名) {
				this.info = dict;  return ;
			}
		});

		console.log(this.data);
    },
    // mounted: function() {
    //     let height = this.pos.ed.y - this.pos.st.y;
    //     let width = this.pos.ed.x - this.pos.st.x;

    //     $("#my-range").css({
    //         height: height*100 + "%",
    //         width: width*100 + "%",
    //         top: this.pos.st.x*100 + "%",
    //         left: this.pos.st.y*100 + "%"
    //     });
    // },
    methods:
    {
		back: function() {
			this.$router.push("/");
		},

        // camera: function() {
        //     $("#launch-camera").click();
        // },
        // imageDeal: function(event)
		// {
		// 	const reader = new FileReader();
		// 	let files = event.target.files[0];

		// 	if(/image/.test(files.type))
		// 	{
		// 		reader.readAsDataURL(files);
		// 		let _this = this;

		// 		reader.onload = ()=>
		// 		{
        //             mergeImage(this.image, reader.result);

		// 			_this.$router.push({
		// 				name: "Share",
		// 				params: {image: reader.result}
		// 			});
		// 		}
		// 	}
        // },
        // mergeImage: function(img1, img2) {
        //     /**
        //      *
        //      */
        // }
	},
    template: "template"
}

</script>

<style scoped>

.my-img-wrap {
    display: inline-block;
    overflow: hidden;
    position: relative;
	margin-top: 20%;
}

#my-range {
    height: 0%;
    width: 0%;
    left: 0%;
    top: 0%;
    border: 2px solid red;
    position: absolute;
}

.my-font {
	font-size: 20px;
	color: gray;
	font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
	height: 30%;
	line-height: 200%;
}

.my-key {
	color: crimson;
}

.my-value {
	color: greenyellow;
}

.my-tip {
	float: right;
	margin: 5% 5% 0 0;
	color: lavender;
	font-size: 18px;
	text-shadow: 1px 1px 3px white;
	clear: both;
}

</style>