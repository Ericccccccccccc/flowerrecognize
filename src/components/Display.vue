<template>

    <div class="row">
        <mt-button icon="back" @click="back"> </mt-button>

		<div v-if="data.succ">

			<div class="my-margin"> </div>
			<h2> {{ info.cname }} </h2>

			<p v-for="(val, key, index) in info" :key="index">
				{{ key }}: {{ val }}
			</p>

			<div class="my-img-wrap">

				<div id="my-range"> </div>

				<img :src="image">
			</div>

		</div>

		<div v-else>
			<h2> 鉴别失败 </h2>
			<p> 请对准要识别的植物或者植物不在雏菊,蒲公英,玫瑰,向日葵,郁金香的类别中 </p>
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
			data: null
        }
    },
    created: function()
    {
		this.data = this.$route.params.data;
		this.image = this.$route.params.image;

		$.each(dicts, (i, dict)=> {
			if( this.data.cname === dict.cname) {
				this.info = dict;  return ;
			}
		});
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
}

#my-range {
    height: 0%;
    width: 0%;
    left: 0%;
    top: 0%;
    border: 2px solid red;
    position: absolute;
}


</style>