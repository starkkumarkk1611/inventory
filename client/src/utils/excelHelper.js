import * as XLSX from 'xlsx';


export const excelTableToJSONArray = async ({ file }) => {
     if (
          file &&
          (file.name.split(".")[1] === "xlsx" || file.name.split(".")[1] === "xls")
     ) {
          const promise = new Promise((resolve, reject) => {
               const fileReader = new FileReader();
               fileReader.readAsArrayBuffer(file);
               fileReader.onload = (e) => {
                    const bufferArray = e.target.result;
                    const wb = XLSX.read(bufferArray, { type: "buffer" });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);

                    if (data[0].hasOwnProperty("name") && data[0].hasOwnProperty("quantity") && data[0].hasOwnProperty("description"))
                         resolve(data);
                    else
                         reject(new Error("Wrong Table Headers"))
               };
               fileReader.onerror = (error) => {
                    reject(error);
               };
          });
          // setError(false);
          return promise.then((data) => {
               console.log(data);
               return data;
          });
     } else {
          throw new Error("Wrong file");
     }
}

export const JSONRowsToSheet = ({ rows, fileName }) => {
     const worksheet = XLSX.utils.json_to_sheet(rows);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
     const max_width = rows.reduce((w, r) => Math.max(w, r.name?.length), 10);
     worksheet["!cols"] = [{ wch: max_width }];
     XLSX.writeFile(workbook, `${fileName}.xlsx`);
} 