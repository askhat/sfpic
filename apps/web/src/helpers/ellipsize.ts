export function ellipsize(string: string, limit = 140) {
	if (string.length > limit) {
		return string.slice(0, limit) + "...";
	}
	return string;
}
