import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Mint from 'mint-ui';
import Router from './router.js';

import 'mint-ui/lib/style.css';
import 'bootstrap/js/bootstrap.min.js';
import 'bootstrap/css/bootstrap.min.css';
import 'bootstrap/js/bootstrap.min.js';
import "./assets/css/button.css";
import "./assets/font-awesome/css/font-awesome.min.css";

import $ from 'jquery';


Vue.config.productionTip = false


Vue.use(Mint);
Vue.use(VueRouter);

const router = new VueRouter(Router);

new Vue({
  	el: '#app',
  	components: {
    	"app": App
  	},
	template: '<app/>',
	router: router
});

