import Welcome from './Welcome.svelte';
import LogRocket from 'logrocket';

// Initialise logRocket
LogRocket.init('q9gyyz/make-shots-great-again');

const app = new Welcome({
	target: document.body
});

export default app;