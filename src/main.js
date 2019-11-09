import Router from './Router.svelte';
import LogRocket from 'logrocket';
// Initialize logRocket
LogRocket.init('q9gyyz/make-shots-great-again');

const app = new Router({
	target: document.body
});

export default app;