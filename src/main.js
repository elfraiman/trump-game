import Welcome from './Welcome.svelte';

const app = new Welcome({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;