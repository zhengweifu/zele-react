let os = {};

os.getFileExtension = fileName => {
	const ext = /^.+\.([^.]+)$/.exec(fileName);
	return ext == null ? '' : ext[1];
};

export default os;