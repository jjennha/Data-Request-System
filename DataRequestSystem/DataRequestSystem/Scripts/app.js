var ViewModel = function () {
    var self = this;
    this.requests = new ko.observableArray();

    this.getRequests = function () {
        ajaxHelper('/api/FormRequests/', 'GET').done(function (data) {
            self.requests([]);
            console.log(data);
            var i, length = data.length;
            for (i = 0; i < length; i++) {
                self.requests.push(data[i]);
            }
        })
    }

    self.getRequests();
}


ko.applyBindings(new ViewModel());


//Ajax helper function. Returns error messages
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$(".btn").click(function () {

    var request = {
        "DateRequested": new Date().toLocaleDateString(),
        "DateWanted": $("#DateWanted").val(),
        "RequesterName": $("#RequesterName").val(),
        "PriorityLevel": $("#PriorityLevel").val(),
        "NumberRequests": $("#NumberRequests").val(),
        "Format": $(formatID).val(),
        "Requests": $("#Requests").val(),
        "UsageExplanation": $("#UsageExplanation").val(),
        "Description": $("#Description").val(),
        "Viewers": $("#Viewers").val(),
        "NumberViewers": $("#NumberViewers").val(),
        "RequestComments": $("#RequestComments").val(),
        "DatePulled": new Date().toLocaleDateString(),
        "CompletionStatus": "New",
        "filterNDBuilders": $("filterNDBuilders").val(),
        "filterOpenBuilders": $("filterOpenBuilders").val(),
        "filterUSBuilders": $("filterUSBuilders").val(),
        "filterOther": $("filterOther").val(),
        "filterFromDate": new Date().toLocaleDateString(),
        "filterToDate": new Date().toLocaleDateString(),
    };

    var json = JSON.stringify(request);
    console.log("REQUEST: " + request);
    console.log("Stringified: " + json);
    $.ajax({
        type: "POST",
        url: '/api/FormRequests/PostFormRequest',
        data: JSON.stringify(request),
        contentType: "application/json;charset=utf-8",
        success: function (data, status, xhr) {
            console.log("The result is : " + status + ": " + data);
            window.location.href = "Home/RequestSubmission";
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            
            var values = JSON.parse(xhr.responseText);
            var modelState = values.ModelState;

            console.log(values.ModelState);
            for (key in modelState) {
                $("#" + key).after(`<span class="text-danger">*` + modelState[key] + `</span>`);
                console.log(key);
            }

        }
    });


});
var formatID = "#Format";
$("#Format").click(function () {
    if ($("#Format").val() === "Other") {
        //$("#otherFormat").click(function () {
        $("#otherFormat").css("visibility", "visible");
        formatID = "#otherFormatVal";
    } else {
        $("#otherFormat").css("visibility", "hidden");
        formatID = "#Format";
    }
})

