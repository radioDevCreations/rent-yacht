const IMAGE: IMAGE_PATHS = {
	svg: {
		anchor: "/anchor.svg",
		backArrow: "/back-arrow.svg",
		browse: "/browse.svg",
		contract: "/contract.svg",
		login: "/login.svg",
		map: "/map.svg",
		nextArrow: "/next-arrow.svg",
		register: "/register.svg",
		sailBoat: "/sail-boat.svg",
		ship: "/ship.svg",
	},
	jpg: {
		profile: "/profile.jpg",
	},
	png: {},
	webp: {},
};

interface IMAGE_PATHS {
	svg: {
		anchor: string;
		backArrow: string;
		browse: string;
		contract: string;
		login: string;
		map: string;
		nextArrow: string;
		register: string;
		sailBoat: string;
		ship: string;
	};
	jpg: {
		profile: string;
	};
	png: Record<string, never>; // Empty object in PNG category
	webp: Record<string, never>; // Empty object in WebP category
}

export default IMAGE;
export type { IMAGE_PATHS };
