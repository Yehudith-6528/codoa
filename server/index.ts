import express from "express";
import bodyParser = require("body-parser");
import { tempData } from "./temp-data";
import { resolve } from "dns";
const serverAPIPort = "3232";
const APIPath = "/api/tickets";
console.log("starting server", { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get(APIPath, (req, res) => {
  if (!(req.query && req.query.search)) {
    res.send(tempData);
  }
  let search = req.query.search;

  // @ts-ignore
  // const page: number = req.query.page || 1;

  // const paginatedData = tempData.slice(
  //   (page - 1) * PAGE_SIZE,
  //   page * PAGE_SIZE
  // );
  let tempResults: any = [];
  specialFilter(search)
    .then((result: any) => {
      res.send(result);
    })
    .catch(() => {
      tempResults = simpleSearch(tempData, String(search));
      res.send(tempResults);
    });
});

const simpleSearch = (myData: Array<any>, search: string) => {
  let results;
  results = myData.filter(
    (t) =>
      t.title.toLowerCase().indexOf(String(search)) !== -1 ||
      t.content.toLowerCase().indexOf(String(search)) !== -1
  );
  return results;
};

// 2c - Bonus Task
const specialFilter = (searchTxt: any) => {
  return new Promise((resolve, reject) => {
    let searchArr = searchTxt.split(/^(before:|after:|from:|)/);
    //to enshure that the string is not only "before:" or "after:" or "from:"
    if (searchArr.length > 2) {
      let extraFiltered: any = [];
      let specialValue = searchArr[2].split(" ")[0];
      if (searchArr[1] === "before:") {
        extraFiltered = tempData.filter(
          (t) => new Date(t.creationTime) < convertStringToDate(specialValue)
        );
      } else {
        if (searchArr[1] === "after:") {
          extraFiltered = tempData.filter(
            (t) => new Date(t.creationTime) > convertStringToDate(specialValue)
          );
        }
        //for From email
        else {
          extraFiltered = tempData.filter((t) => t.userEmail === specialValue);
        }
      }
      let searchValue = searchArr[2].split(" ")[1];
      if (searchValue) {
        extraFiltered = simpleSearch(extraFiltered, searchValue);
      }
      resolve(extraFiltered);
    }
    reject();
  });
};

const convertStringToDate = (dateString: string) => {
  // parse format of "DD/MM/YYYY" to date
  var dateParts = dateString.split("/");
  var dateObject = new Date(
    +dateParts[2],
    parseInt(dateParts[1]) - 1,
    +dateParts[0]
  );
  return dateObject;
};

app.listen(serverAPIPort);
console.log("server running", serverAPIPort);
