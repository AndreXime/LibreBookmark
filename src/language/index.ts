import en from './english';
import ptbr from './portuguese';

const Languages = {
	ptbr,
	en,
};

export type LanguagesType = typeof Languages;
export type LanguagesSingularType = typeof Languages.en;

export default Languages;
