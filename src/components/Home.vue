<template>
	<div class="row my-container">
		<my-title/>

		<my-body>
			<div class="my-body-margin"> </div>
			<p class="my-font"> Enjoy Your Trip </p>

			<mt-button @click.native="bindReadImage()" class="my-album-button button button-small button-default button-circle button-jumbo">
				<i class="fa fa-plus"></i>
				<input id="read-image" @change="imageDeal" type="file" accept="image/*" style="display:none">
			</mt-button>

			<mt-button @click.native="bindLaunchCamera()" type="danger" size="normal" class="button button-caution button-pill button-jumbo">
				<i class="fa fa-camera"> 拍照 </i>
				<input id="launch-camera" @change="imageDeal" type="file" capture="camera" accept="image/*" style="display:none">
			</mt-button>
		</my-body>

	</div>
</template>


<script>
import Vue from "vue";
import { Button } from 'mint-ui';
import title from "./Title";
import body from "./Body"
Vue.component(Button.name, Button);

export default
{
  	data: function() {
    	return {}
	},
	components: {
		"my-title": title,
		"my-body": body
	},
	methods: {
		bindReadImage: function() {
			$("#read-image").click();
		},
		bindLaunchCamera: function() {
			$("#launch-camera").click();
		},
		imageDeal: function(event)
		{
			const reader = new FileReader();
			let files = event.target.files[0];

			if(/image/.test(files.type))
			{
				reader.readAsDataURL(files);
				let _this = this;

				reader.onload = ()=>
				{
					_this.$router.push({
						name: "Show",
						params: {image: reader.result}
					});
				}
			}
		}
	},
	template: "template"
}

</script>

<style scoped>

.my-body-margin {
	height: 15%;
}

.my-font {
	font-size: 20px;
	color: gray;
	font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
	height: 30%;
}


.my-album-button {
	position: absolute;
	opacity: 0.3;
	margin: 5% 0 0 -15%;
	overflow: hidden;
}

</style>
