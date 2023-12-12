import React from "react";
import FileParser from "../components/ExcelParser";

const FileCenter = () => {
	return <div className="bg-white px-10 py-4 rounded-lg mb-10">
		<div className="font-bold text-lg text-gray-500 mb-10">File Center</div>
		<FileParser />
	</div>;
};

export default FileCenter;
