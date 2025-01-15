import {
	FaTrash as IconTrash,
	FaInfoCircle as IconInfo,
	FaPalette as IconPallete,
	FaLanguage as IconLanguage,
	FaCogs as IconGear,
} from 'react-icons/fa';

import {
	AiOutlineLeft as IconArrowLeft,
	AiOutlineRight as IconArrowRight,
	AiFillSave as IconSave,
	AiOutlinePlus as IconAdd,
} from 'react-icons/ai';

const IconsDefault = {
	trash: IconTrash,
	info: IconInfo,
	pallete: IconPallete,
	language: IconLanguage,
	gear: IconGear,
	arrowLeft: IconArrowLeft,
	arrowRight: IconArrowRight,
	add: IconAdd,
	save: IconSave,
};

export default IconsDefault;

export { IconTrash, IconInfo, IconPallete, IconLanguage, IconGear, IconArrowLeft, IconArrowRight, IconAdd, IconSave };

import {
	RiFileUploadLine as IconImport,
	RiFileDownloadLine as IconExport,
	RiDeleteBinLine as IconClear,
} from 'react-icons/ri';

export { IconClear, IconImport, IconExport };
