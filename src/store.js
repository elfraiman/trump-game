import { writable } from 'svelte/store';

export const playerList = writable();
export const playerTurn = writable(1);
export const user = writable({ loggedIn: false });