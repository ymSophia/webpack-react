import React, { useState } from "react";
import { message, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import {
  batchCheckProductData,
  convertExcelToJson,
  createExcelByJson,
  createTemplate,
  FileRowData,
  InvalidFileRowData,
  ValidFileRowData,
} from "../utils/excelParserUtils";

const { Dragger } = Upload;

export enum ParseStatus {
  NORMAL = "normal",
  SUCCESS = "success",
  PARTIAL_SUCCESS = "partialSuccess",
  ERROR = "error",
}

const isExcelFile = (file: RcFile): boolean => {
  return [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ].includes(file.type);
};
const checkFileTypeAndSize = (file: RcFile): boolean => {
  if (!isExcelFile(file)) {
    message.error("文件格式错误，请重新选择");
    return false;
  }
  const isSizeMatched = file.size / 1024 / 1024 <= 1; // 限制1Mb
  if (!isSizeMatched) {
    message.error("文件尺寸过大，请重新选择");
    return false;
  }
  return true;
};

const ExcelParser = () => {
  const [counter, setCounter] = useState({ total: 0, valid: 0 });
  const [validList, setValidList] = useState<ValidFileRowData[]>([]);
  const [invalidList, setInvalidList] = useState<InvalidFileRowData[]>([]);
  const [parseStatus, setParseStatus] = useState<ParseStatus>(
    ParseStatus.NORMAL,
  );
  const btnStyle = "bg-white border border-gray-500 rounded-lg p-4 mb-10";

  const props: UploadProps = {
    name: "upload-file",
    maxCount: 1,
    showUploadList: false,
    accept: ".xls,.xlsx",
    onDrop(e) {
      if (!isExcelFile(e.dataTransfer.files[0] as RcFile)) {
        message.error("文件格式错误，请重新选择");
      }
    },
    beforeUpload: async (file: RcFile) => {
      setParseStatus(ParseStatus.NORMAL);
      const isSizeAndTypeMatched = checkFileTypeAndSize(file);
      if (isSizeAndTypeMatched) {
        const tableOriginData = await convertExcelToJson<FileRowData>(file);

        // 表格数据条数校验
        if (tableOriginData.length > 200) {
          message.error("最多包含200条数据");
          return false;
        }
        // 表格数据格式校验
        const { total, validList, invalidList } =
          await batchCheckProductData(tableOriginData);
        setCounter({ total, valid: total - invalidList.length });
        setValidList(validList);
        setInvalidList(invalidList);

        if (total === validList.length) {
          setParseStatus(ParseStatus.SUCCESS);
        } else if (validList.length === 0) {
          setParseStatus(ParseStatus.ERROR);
        } else {
          setParseStatus(ParseStatus.PARTIAL_SUCCESS);
        }
      }
      return false;
    },
  };

  const exportInvalidData = () => {
    const sheetHeader = [
      { name: "id", key: "id" },
      { name: "amount", key: "amount" },
      { name: "hint", key: "hint" },
    ];
    createExcelByJson(sheetHeader, invalidList, "问题数据.xlsx");
  };

  return (
    <div className="bg-gray-100 rounded-lg mb-10 p-10">
      <button className={btnStyle} onClick={createTemplate}>
        下载数据模版
      </button>
      <div className="md:w-1/2 lg:w-1/3 h-32 mb-10">
        <Dragger {...props}>
          <div>请把要上传的文件拖到这里</div>
        </Dragger>
      </div>
      <div>Current parse status is: {parseStatus}</div>

      {[ParseStatus.SUCCESS, ParseStatus.PARTIAL_SUCCESS].includes(
        parseStatus,
      ) && (
        <div className="border-t border-gray-300 py-10 mt-10">
          <h3 className="mb-10">
            {counter.total} 条数据中 {counter.valid} 条为有效数据
          </h3>
          {!!validList.length && (
            <div className="bg-white rounded-xl p-10 flex flex-col gap-2">
              {validList.map((item) => (
                <p key={item.id}>
                  id: {item.id}, amount: {item.amount}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {[ParseStatus.ERROR, ParseStatus.PARTIAL_SUCCESS].includes(
        parseStatus,
      ) && (
        <button className={btnStyle} onClick={exportInvalidData}>
          下载问题数据
        </button>
      )}
    </div>
  );
};

export default ExcelParser;
