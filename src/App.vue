<template>
	<div id="app" class="container-fluid">
		<router-view/>
	</div>
</template>


<script>
import obj from './assets/js/model.js';
import show from './components/Show.vue';

const setModel = "setModel"

export default {
	name: 'App',
	created: function() {
		obj.modelInit().then(res=>
		{
			let model = res.model;
			let timeSpan = res.timeSpan;

			this.$store.commit(setModel, model);
			this.$store.state.modelTimeSpan = timeSpan;

			if( this.$store.state.wait)
				show.methods.callback(this);

			this.$store.state.wait = false;

			console.log("model ready");
		});
	},
	template: "template"
}

</script>



<style>

* {
	padding: 0;
	margin: 0;

	box-sizing:border-box;
	-moz-box-sizing:border-box;
	-webkit-box-sizing:border-box;
}

html, body{
	height: 100%;
}

#app {
	height: 100%;
}

.my-container {
	height: 100%;
	background-color: black;
}

</style>
