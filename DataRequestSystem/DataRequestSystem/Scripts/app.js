
var ViewModel = function () {
    var self = this;
    self.requests = new ko.observableArray();

    self.currentElement = null;
    self.priorities = ["Low", "Normal", "Important", "Critical"];
    self.queueStatuses = ["New", "Ticket Pending"];

    self.filters = {
        'priority': ko.observableArray([]),
        'requester': ko.observableArray([]),
        'status': ko.observableArray([]),
        'dateRequested': { 'from': ko.observable(null), 'to': ko.observable(null) },
        'dateWanted': { 'from': ko.observable(null), 'to': ko.observable(null) }
    };

    self.edit = function edit() {
        $(".editable").prop("readonly", false);
        $(".selector").prop('disabled', false);
    };
    self.saveEdit = function saveEdit(data) {
        $(".editable").prop("readonly", true);
        $(".selector").prop('disabled', true);

        ajaxHelper("/api/FormRequests/" + data.Id, 'PUT', data).done(function () {
            window.location.href = "/Home/RequestQueue";
        });
        
    }

    //self.filters.dateWanted.from(Date.now());

    self.matchesFilters = function matchesFilters(request) {

        if (self.filters.priority() && self.filters.priority().length > 0 &&
            self.filters.priority.indexOf(request.PriorityLevel) === -1) {
            return false;
        }

        if (self.filters.requester() && self.filters.requester().length > 0 &&
            self.filters.requester.indexOf(request.RequesterName) === -1) {
            return false;
        }

        if (self.filters.status() && self.filters.status().length > 0 &&
            self.filters.status.indexOf(request.CompletionStatus) === -1) {
            return false;
        }

        if (self.filters.dateWanted.from() &&
            new Date(self.filters.dateWanted.from()) > new Date(request.DateWanted)) {
            return false;
        }

        if (self.filters.dateWanted.to() &&
            new Date(self.filters.dateWanted.to()) < new Date(request.DateWanted)) {
            return false;
        }

        if (self.filters.dateRequested.from() &&
            new Date(self.filters.dateRequested.from()) > new Date(request.DateRequested)) {
            return false;
        }

        if (self.filters.dateRequested.to() &&
            new Date(self.filters.dateRequested.to()) < new Date(request.DateRequested)) {
            return false;
        }

        return true;
    };

    self.getRequests = function getRequests() {
        ajaxHelper('/api/FormRequests/', 'GET').done(function (data) {
            self.requests([]);
            var i, length = data.length;
            for (i = 0; i < length; i++) {
                self.requests.push(data[i]);
            }

            self.requests.sort(DateRequestedComparatorA);
        });
    };

    self.sort = function sort(element, data, comparatorA, comparatorD) {
        if (element !== self.currentElement) $(element).removeClass('sortedAscending');

        self.currentElement = element;
        var jqueryElement = $(element);

        if (jqueryElement.hasClass('sortedAscending')) {
            data.requests.sort(comparatorD);
        } else {
            data.requests.sort(comparatorA);
        }

        return jqueryElement.toggleClass('sortedAscending');
    };

    self.getRequests();
    
};


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
var errorReminded = false;
$("#Submit").click(function () {
    //function add() {
    var r = {
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
        "filterToDate": new Date().toLocaleDateString()
    };


    var json = JSON.stringify(r);
    console.log("REQUEST: " + r);
    console.log("Stringified: " + json);
    $.ajax({
        type: "POST",
        url: '/api/FormRequests/PostFormRequest',
        data: JSON.stringify(r),
        contentType: "application/json;charset=utf-8",
        success: function (data, status, xhr) {
            console.log("The result is : " + status + ": " + data);
            window.location.href = "Home/RequestSubmission";
        },
        error: function (xhr) {
            console.log(xhr.responseText);

            var values = JSON.parse(xhr.responseText);
            var modelState = values.ModelState;

            if (!errorReminded) {
                console.log(values.ModelState);
                for (key in modelState) {
                    $("#" + key).after(`<span class="text-danger" style="display: inline-block">*` + modelState[key] + `</span>`);
                    console.log(key);
                }
            }
            errorReminded = true;

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
});

function DateRequestedComparatorA(request1, request2) {
    var date1 = new Date(request1.DateRequested);
    var date2 = new Date(request2.DateRequested);

    if (date1 > date2) {
        return 1;
    } else if (date2 > date1) {
        return -1;
    } else {
        return 0;
    }
}

function DateRequestedComparatorD(request1, request2) {
    return DateRequestedComparatorA(request1, request2) * -1;
}

function DateWantedComparatorA(request1, request2) {
    var date1 = new Date(request1.DateWanted);
    var date2 = new Date(request2.DateWanted);

    if (date1 > date2) {
        return 1;
    } else if (date2 > date1) {
        return -1;
    } else {
        return 0;
    }
}

function DateWantedComparatorD(request1, request2) {
    return DateWantedComparatorA(request1, request2) * -1;
}

function PriorityComparatorA(request1, request2) {
    var priorities = {
        "Critical": 1,
        "Important": 2,
        "Normal": 3,
        "Low": 4
    };
    var priority1 = priorities[request1.PriorityLevel];
    var priority2 = priorities[request2.PriorityLevel];

    priority1 = priority1 === undefined ? 5 : priority1;
    priority1 = priority1 === undefined ? 5 : priority1;

    if (priority1 > priority2) {
        return 1;
    } else if (priority2 > priority1) {
        return -1;
    } else {
        return 0;
    }
}

function PriorityComparatorD(request1, request2) {
    return PriorityComparatorA(request1, request2) * -1;
}

function RequesterComparatorA(request1, request2) {
    var requester1 = request1.RequesterName;
    var requester2 = request2.RequesterName;
    if (requester1 > requester2) {
        return 1;
    } else if (requester2 > requester1) {
        return -1;
    } else {
        return 0;
    }
}

function RequesterComparatorD(request1, request2) {
    return RequesterComparatorA(request1, request2) * -1;
}

function StatusComparatorA(request1, request2) {
    var status1 = request1.CompletionStatus;
    var status2 = request2.CompletionStatus;

    if (status1 > status2) {
        return 1;
    } else if (status2 > status1) {
        return -1;
    } else {
        return 0;
    }
}

function StatusComparatorD(request1, request2) {
    return StatusComparatorA(request1, request2) * -1;
}

