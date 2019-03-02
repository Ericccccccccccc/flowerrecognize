<template>

	<div class="row my-container">
		<mt-button icon="back" @click="back"> </mt-button>

		<my-title/>

		<my-body>
			<div class="row">
				<div class="col-xs-12" style="display:inline-block;">
					<img :src="image">
				</div>
			</div>

			<div class="row my-margin"> </div>

			<div class="row">
				<mt-button @click.native="recognize()" type="danger" size="small" class="button button-caution button-pill">
					<i class="fa fa-upload"> 识别 </i>
				</mt-button>
			</div>
		</my-body>

	</div>

</template>



<script>
import title from "./Title";
import body from "./Body";
// import data from "../mock/data.js";
import obj from "../assets/js/model.js"

const setImage = "setImage";

export default
{
	data: function() {
		return {
			image: '',
		}
	},
	components: {
		"my-title": title,
		"my-body": body,
	},
	created: function() {
		this.image = this.$route.params.image;
	},
	methods:
	{
		back: function() {
			this.$router.push("/");
		},
		recognize: function()
		{
			this.$store.commit(setImage, this.image);
			var model = this.$store.state.model;

			if( this.$store.state.model)
				this.callback(this.$store.state);
			else {
				this.$store.state.wait = true;
				console.log("wait...");
			}
		},
		callback: function(state)
		{

			var model = state.model;
			var image = state.image;

			obj.analysize(model, image).then(
				data=>
				{
					this.$router.push({
						name: "Display",
						params: {
							image: image,
							data: data
						}
					});
				}
			);
		}
	}
}

</script>

<style scoped>


img {
	transform: translate(0, -50%);
	width: 40%;
	height: 40%;
}

.my-margin {
	height: 10%;
}

</style>
