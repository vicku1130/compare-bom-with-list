import XLSX from "xlsx";

export function readxlsx(inputData) {
  var workbook = XLSX.read(inputData, { type: "binary" });
  return toJson(workbook);
}

export function toJson(workbook) {
  let result = {};
  workbook.SheetNames.forEach((sheetName) => {
    const roa = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheetName]
    );
    if (roa.length > 0) {
      result[sheetName] = roa;
    }
  });

  return result;
}

export function parseObject(retJson) {
  let bomObj = [];
  retJson.BOM.forEach((row) => {
    if (row["Bill of Materials (BOM) Form"] >= 0) {
      const obj = {
        item: row["Bill of Materials (BOM) Form"],
        qty: row.__EMPTY,
        smcPn: row.__EMPTY_1,
        type:
          row.__EMPTY_1 === null || row.__EMPTY_1 === undefined
            ? ""
            : row.__EMPTY_1.split("-")[0],
        mfg: row.__EMPTY_2,
        mfgPn: row.__EMPTY_3,
        description: row.__EMPTY_4,
        refence: row.__EMPTY_5,
        rowNum: row.__rowNum__,
      };
      bomObj.push(obj);
    }
  });

  return bomObj;
}

const keywords = [
  "BGA",
  "SOCKET",
  "QFN",
  "CRYSTAL",
  "QFP",
  "LED",
  "CONNECTOR",
  "SFP",
  "LGA",
  "PRESS",
  "HEATSINK",
  "SCREW",
];

export function recommendItem(bom) {
  return bom
    .filter(
      (item) => item.description !== undefined && item.description !== null
    )
    .filter((item) =>
      keywords.some((keyword) => item.description.includes(keyword))
    );
}
