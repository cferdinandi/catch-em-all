// @TODO update TS with proper API response types
export function PokemonSprite ({ sprites }: { sprites: any }) {

	// @TODO update this with a utility function that looks for more images
	const sprite = sprites?.front_default ?? sprites?.back_default;

	if (!sprite) {
		return null;
	}

	return (
		<>
			<img alt=" " src={sprite} />
		</>
	)

}
