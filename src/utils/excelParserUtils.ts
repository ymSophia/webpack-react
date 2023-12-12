import { read, utils, writeFile } from "xlsx";

export interface FileRowData {
  id: string;
  amount: string;
}
export type ValidFileRowData = FileRowData;
export interface InvalidFileRowData extends FileRowData {
  hint: string;
}

const GLOBAL_HINT =
  "温馨提示：\n" +
  "1、该文档最高限制200条数据，当数据过多时，请分批导入；\n" +
  "2、请在下方表格中输入正确格式的ID和数量；\n" +
  "3、无对应结果时，请回到该表格进行修改，并重新上传填写完毕的表格；\n" +
  "4、系统仅识别文档中的第一个表格";

export const createTemplate = () => {
  const data = [[GLOBAL_HINT], ["id", "amount"]];
  // 创建一个新的工作簿
  const workBook = utils.book_new();
  // 添加一个工作表
  const workSheet = utils.aoa_to_sheet(data);
  // 合并单元格设置：s 意为 start ，即开始的单元格，e 就是 end
  // r 是 row ，表示行号，从 0 计起
  // c 是 col ，表示列号，从 0 计起
  workSheet["!merges"] = [
    // 横向合并，范围是第1行的列1到列2
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
  ];
  workSheet["!cols"] = [{ wch: 30 }, { wch: 10 }];
  workSheet["!rows"] = [{ hpx: 140 }, { hpx: 20 }];
  utils.book_append_sheet(workBook, workSheet, "Sheet1");
  // 将工作簿保存为Excel文件
  writeFile(workBook, "数据模版.xlsx");
};

function markDuplicateIds<
  T extends { id: string },
  V extends T & { isDuplicated?: boolean },
>(arr: T[]) {
  const idCounts = new Map<string, number>();
  for (const data of arr) {
    const count = idCounts.get(data.id) ?? 0;
    idCounts.set(data.id, count + 1);
  }

  const markedArr: V[] = [];
  for (const data of arr) {
    const isDuplicated = idCounts.get(data.id)! > 1;
    markedArr.push({ ...data, isDuplicated } as V);
  }

  return markedArr;
}

export const convertExcelToJson = <RowData>(file: File): Promise<RowData[]> => {
  const readOptions = {
    // header: the list of columns you want
    // blankBows: include or omit empty lines
    // defVal: set default value
    sheetRows: 0, // 读取所有行
    range: 1, // 因为第一行是提示，要跳过从第二行开始读取
  };

  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = utils.sheet_to_json<RowData>(worksheet, readOptions);
        resolve(parsedData);
      };

      reader.readAsBinaryString(file);
    } else {
      reject(new Error("invalid file!"));
    }
  });
};

interface HeaderConfigItem {
  name: string;
  key: string;
}
export const createExcelByJson = (
  headerConfig: HeaderConfigItem[],
  dataList: any[],
  fileName: string,
) => {
  // 定义要写入Excel的数据
  const headerNameList: string[] = headerConfig.map((item) => item.name);
  const rowKeyOrder: string[] = headerConfig.map((item) => item.key);
  const data = [
    headerNameList,
    ...dataList.map((v: any) => {
      return rowKeyOrder.map((key) => v[key]);
    }),
  ];

  // 创建一个新的工作簿
  const workbook = utils.book_new();
  // 添加一个工作表
  const worksheet = utils.aoa_to_sheet(data);
  // 设置列宽
  worksheet["!cols"] = [{ wch: 30 }, { wch: 10 }, { wch: 55 }];
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // 将工作簿保存为Excel文件
  writeFile(workbook, fileName);
};

const isPositiveInteger = (num: string | number): boolean => {
  const formattedNum = `${num}`.trim();
  return /^[1-9]\d*$/.test(formattedNum);
};

export const batchCheckProductData = async (originData: FileRowData[]) => {
  const data = originData.map((item) => ({
    id: `${item.id}`.trim(),
    amount: `${item.amount}`.trim(),
  }));

  const validList: ValidFileRowData[] = [];
  const invalidList: InvalidFileRowData[] = [];

  // 数量校验+重复id校验
  markDuplicateIds(data).forEach((item) => {
    const isAmountValid = isPositiveInteger(item.amount);

    if (isAmountValid && !item.isDuplicated) {
      validList.push({ id: item.id, amount: item.amount });
    } else {
      const hintList = [];
      item.isDuplicated && hintList.push("产品ID存在重复");
      !isAmountValid && hintList.push("数量无效, 请输入正整数");
      invalidList.push({
        id: item.id,
        amount: item.amount,
        hint: hintList.join("; "),
      });
    }
  });

  return {
    total: data.length,
    validList,
    invalidList,
  };
};
