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
    var resp = [];
    var datas = records.filter(function (element) { return element.name == name && element.gender == gender; });
    datas.forEach(function (element) { return resp.push({
        year: element.year,
        rank: element.rank
    }); });
    return resp;
}
function handleSignUpFormSubmit(form) {
    var alertMessage;
    var email = form['email'];
    var first_name = form['first-name'];
    var last_name = form['last-name'];
    var birth = form['date-of-birth'];
    var results = [];
    var wrong_fields = [];
    var email_valid = new RegExp(/^[0-9a-zA-Z]([^\s\@]*[0-9a-zA-Z])*@[0-9a-zA-Z]([^\s\@.]*[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
    var name_valid = new RegExp(/^[A-Z][a-z]+$/);
    var birth_valid = new RegExp(/^\d{4}-\d{2}-\d{2}/);
    if (email_valid.test(email.value)) {
        results.push({ name: "email", valid: true, message: null });
    }
    else {
        results.push({ name: "email", valid: false, message: "Invalid email" });
        wrong_fields.push("Email");
    }
    if (name_valid.test(first_name.value)) {
        results.push({ name: "first-name", valid: true, message: null });
    }
    else {
        results.push({ name: "first-name", valid: false, message: "Invalid first name" });
        wrong_fields.push("First Name");
    }
    if (name_valid.test(last_name.value)) {
        results.push({ name: "last-name", valid: true, message: null });
    }
    else {
        results.push({ name: "last-name", valid: false, message: "Invalid last name" });
        wrong_fields.push("Last Name");
    }
    if (birth_valid.test(birth.value)) {
        var year = parseInt(birth.value.split("-")[0]);
        var month = parseInt(birth.value.split("-")[1]);
        var day = parseInt(birth.value.split("-")[2]);
        if (year < 1900 || year > 2022 || month < 1 || month > 12 || day < 1 || day > 31) {
            results.push({ name: "date-of-birth", valid: false, message: "Invalid date of birth" });
            wrong_fields.push("Date of Birth");
        }
        else {
            results.push({ name: "date-of-birth", valid: true, message: null });
        }
    }
    else {
        results.push({ name: "date-of-birth", valid: false, message: "Invalid date of birth" });
        wrong_fields.push("Date of Birth");
    }
    if (wrong_fields.length) {
        alertMessage = "You must correct: \n\n" + wrong_fields.join("\n");
    }
    else {
        alertMessage = "Successfully Submitted!";
    }
    return {
        alertMessage: alertMessage,
        validationResults: results
    };
}
//# sourceMappingURL=app.js.map