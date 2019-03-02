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

export default
{
	data: function() {
			return {
			image: ''
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
			var _this = this;
			var model = this.$store.state.model;

			obj.analysize(model, this.image).then(
				data=>
				{
					_this.$router.push({
						name: "Display",
						params: {
							image: _this.image,
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
