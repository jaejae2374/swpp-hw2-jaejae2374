// TODO: edit this file

type RecordType = {
  year: number;
  rank: number;
  name: string;
  gender: string;
  rankChange: number | null;
};

// This is a list where your records should be stored. See `parseAndSave`.
let records: RecordType[] = [];

// `parseAndSave(text)` is a function called with one argument `text`, the content of the babyname CSV file.
// It is invoked only once at the start of application.
// TODO: parse the csv text and save data records into the global variable `records` properly,
// so that the other functions use them with ease. After calling this function, `records` should
// contain the parsed data of every year like below.
//     e.g. records: [{year: 2001, rank: 1, name: "Jacob", gender: "M", rankChange: null},
//                    {year: 2001, rank: 2, name: "Michael", gender: "M", rankChange: null},
//                    ...]
//
// IMPORTANT NOTE: a CSV text can end with trailing line-break character '\n'. Whether it exists or not,
//                 the function should parse `text` correctly. Also, records should be stored in the same order
//                 in which they appear in a csv text. You can assume that at the first line is always a csv header.
//
// IMPORTANT NOTE: you can assume that the number of male names and the number of female names are the same.
//                 On the other hand, you should NOT assume the number of total rows in the csv file
//                 or the data sequence (e.g., rank order).
function parseAndSave(text: string): void {
  // TODO: Fill this function. (3 points)
  let sentences: string[][] = text.split("\n").slice(1).map(sentence => sentence.split(","));
  if (sentences[sentences.length-1].length == 1) {
    sentences.pop();
  }
  sentences.forEach(element => records.push(
    {
      year: parseInt(element[0]),
      rank: parseInt(element[1]),
      name: element[2],
      gender: element[3],
      rankChange: element[4] ? parseInt(element[4]) : null
    }
  ))
}

// `provideYearData(year)` is a function that receives a year and returns an array of data object corresponding to that year.
// Note that male and female record with the same rank should be joined together to form one object.
// TODO: return all data objects of a specific year, that are joined and organized by rank in an ascending order.
// The example of returned array is as follows.
//     e.g. [{rank: 1, male: "Jacob", maleRankChange: 0, female: "Isabella", femaleRankChange: 0},
//           {rank: 2, male: "Ethan", maleRankChange: 0, female: "Sophia", femaleRankChange: -2},
//           ...,
//           {rank: 1000, male: "Keshawn", maleRankChange: 113, female: "Karley", femaleRankChange: 17}]
//
// IMPORTANT NOTE: you should NOT assume the number of data corresponding to the given year.
function provideYearData(year: number): RankType[] {
  // TODO: Fill in this function. (5 points)

  // year filter -> male & female -> ascending
  let datas: RecordType[] = records.filter(element => element.year == year)
  
  let results: RankType[] = []
  let tmp: RankType;
  for (let data of datas) {
    let obj: RankType[] = results.filter(element => element.rank == data.rank);
    tmp = obj.length? obj[0] : {
      rank: data.rank,
      male: null,
      maleRankChange: null,
      female: null,
      femaleRankChange: null
    }
    if (data.gender == "M") {
      tmp.male = data.name;
      tmp.maleRankChange = data.rankChange;
    } else {
      tmp.female = data.name;
      tmp.femaleRankChange = data.rankChange;
    }
    if (! obj.length) {
      results.push(tmp);
    }
    }
  // This is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
  return results.sort(function(a, b){return a.rank-b.rank});
}

// provideChartData(name, gender) is a function called when a user wants
// to see the chart showing the year-on-year change of rank of a specific name.
// TODO: return a list of all objects from 2001 to 2018 in the format of `{year: <year>, rank: <rank>}`
// of a specific name specified by the arguments, name and gender.
// If there are no records with the name and gender for some years,
// either you can set the values of the ranks to `undefined` or not return those records at all.
// The example of return data is as follow.
//     e.g. [{year: 2001, rank: undefined},
//           {year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
// You can also return data excluding `undefined` value as below.
//     e.g. [{year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
function provideChartData(name: string, gender: string): CharDataType[] {
  // TODO: Fill in this function. (2 points)

  // This is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
  return [
    { year: 2001, rank: 3 },
    { year: 2002, rank: undefined },
  ];
}

// `handleSignUpFormSubmit(form)` is called when a user submits the sign up form.
// `form` is the target HTML form element (L82~ in index.html).
// TODO: validate the form. (5 points)
function handleSignUpFormSubmit(form: FormType): {
  alertMessage: string;
  validationResults: ValidationResultType[];
} {
  let alertMessage = "TODO: Fill in this alert message properly";
  // TODO: Fill in the rest of function to get the HTML form element as above.

  // Hint: you can use the `RegExp` class for matching a string.

  // The return data format is as follows. For the given `form` argument, you should
  // correctly process the validation, filling in `alertMessage`, and `validationResults`.
  // When you deal with `validationResults`, the values of `message` should be set to `null`
  // for the valid input fields. (See the example below.)
  // Below is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.

  // IMPORTANT NOTE: You must use the argument `form` rather than directly using APIs such as `document.getElementId` or `document.querySelector`.
  //                 Plus, please do not call `alert` function here.
  //                 For debugging purpose, you can use `console.log`.
  return {
    alertMessage: alertMessage,
    validationResults: [
      { name: "first-name", valid: true, message: null },
      { name: "last-name", valid: false, message: "Invalid last name" },
      { name: "email", valid: true, message: null },
      { name: "date-of-birth", valid: false, message: "Invalid date of birth" },
    ],
  };
}
