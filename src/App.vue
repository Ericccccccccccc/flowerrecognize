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
			this.$store.commit(setModel, res);

			if( this.$store.state.wait)
				show.methods.callback(this.$store.state);

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
  overflow: hidden;
	height: 100%;
}

.my-container {
	height: 100%;
	background-color: black;
}

</style>
