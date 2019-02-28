import home from './components/Home';
import show from './components/Show';
import display from './components/Display';


export default {
	mode: 'history',
  	routes: [
		{name: "Home", path: '/', component: home},
		{name: "Show", path: '/show', component: show},
		{name: "Display", path: "/display", component: display}
  	]
};
