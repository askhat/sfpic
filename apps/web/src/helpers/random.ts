export function random(min = -127, max = 127): number {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
