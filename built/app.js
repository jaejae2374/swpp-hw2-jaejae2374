var records = [];
function parseAndSave(text) {
    var sentences = text.split("\n").slice(1).map(function (sentence) { return sentence.split(","); });
    if (sentences[sentences.length - 1].length == 1) {
        sentences.pop();
    }
    sentences.forEach(function (element) { return records.push({
        year: parseInt(element[0]),
        rank: parseInt(element[1]),
        name: element[2],
        gender: element[3],
        rankChange: element[4] ? parseInt(element[4]) : null
    }); });
}
function provideYearData(year) {
    var datas = records.filter(function (element) { return element.year == year; });
    var results = [];
    var tmp;
    var _loop_1 = function (data) {
        var obj = results.filter(function (element) { return element.rank == data.rank; });
        tmp = obj.length ? obj[0] : {
            rank: data.rank,
            male: null,
            maleRankChange: null,
            female: null,
            femaleRankChange: null
        };
        if (data.gender == "M") {
            tmp.male = data.name;
            tmp.maleRankChange = data.rankChange;
        }
        else {
            tmp.female = data.name;
            tmp.femaleRankChange = data.rankChange;
        }
        if (!obj.length) {
            results.push(tmp);
        }
    };
    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
        var data = datas_1[_i];
        _loop_1(data);
    }
    return results.sort(function (a, b) { return a.rank - b.rank; });
}
function provideChartData(name, gender) {
    return [
        { year: 2001, rank: 3 },
        { year: 2002, rank: undefined },
    ];
}
function handleSignUpFormSubmit(form) {
    var alertMessage = "TODO: Fill in this alert message properly";
    return {
        alertMessage: alertMessage,
        validationResults: [
            { name: "first-name", valid: true, message: null },
            { name: "last-name", valid: false, message: "Invalid last name" },
            { name: "email", valid: true, message: null },
            { name: "date-of-birth", valid: false, message: "Invalid date of birth" },
        ]
    };
}
//# sourceMappingURL=app.js.map