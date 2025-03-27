export interface CvData {
	personal: {
		fullName: string;
		title: string;
		email: string;
		phone: string;
		location: string;
		github: string;
		linkedin: string;
	};
	summary: string;
	experience: {
		role: string;
		company: string;
		location: string;
		from: string;
		to: string;
		description: string;
	}[];
	education: {
		degree: string;
		school: string;
		location: string;
		from: string;
		to: string;
	}[];
	skills: string[];
	languages: {
		language: string;
		level: string;
	}[];
}
