
var ViewModel = function () {
    var self = this;
    self.requests = new ko.observableArray();
    self.testDate = ko.observable();

    self.currentElement = null;
    self.priorities = ["Low", "Normal", "Important", "Critical"];
    self.queueStatuses = ["New", "Ticket Pending"];
    self.completeStatuses = ["Complete", "Declined"];
    self.formatOptions = ["Excel", "Visualization (chart)", "CFV", "Other"];
    self.statusColors = {
        'New': 'white',
        'Ticket Pending': '#ffff66',
        'Complete': '#99ff66',
        'Declined': '#ff9980'
    }

    self.filters = {
        'priority': ko.observableArray([]),
        'requester': ko.observableArray([]),
        'status': ko.observableArray([]),
        'dateRequested': { 'from': ko.observable(null), 'to': ko.observable(null) },
        'dateWanted': { 'from': ko.observable(null), 'to': ko.observable(null) }
    };

    self.edit = function edit(data, event) {
        var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        var parent = target.parentElement;
        var arr = parent.querySelectorAll('.editable');

        var i, length = arr.length;
        for (i = 0; i < length; i++) {
            $(arr[i]).prop("readonly", false);
        }

        arr = parent.querySelectorAll('.selector');
        length = arr.length;
        for (i = 0; i < length; i++) {
            $(arr[i]).prop("disabled", false);
        }
    };

    self.saveEdit = function saveEdit(data) {
        var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        var parent = target.parentElement;
        var arr = parent.querySelectorAll('.editable');

        var i, length = arr.length;
        for (i = 0; i < length; i++) {
            $(arr[i]).prop("readonly", true);
        }

        arr = parent.querySelectorAll('.selector');
        length = arr.length;
        for (i = 0; i < length; i++) {
            $(arr[i]).prop("disabled", true);
        }
        console.log(data);
        ajaxHelper("/api/FormRequests/" + data.Id, 'PUT', data).done(function () {
            debugger;
            window.location.href = "/Home/RequestQueue";
        });
    };

    self.addFile = function addFile(data) {
        var r = {
            "RequestId": data.Id,
            "Type": "File",
            "Name": $("#attachedFiles")[0].files[0].name,
            "URL": $("#attachedFiles").val(),
        };
        ajaxHelper('/api/Links/PostLinks', 'POST', r);
    };
    //self.addQuery = function addQuery(data) {
    //    var r = {
    //        "RequestId": data.Id,
    //        "Type": "Query",
    //        "Name": $("#attachedQueries")[0].files[0].name,
    //        "URL": $("#attachedQueries").val(),
    //    };
    //    ajaxHelper('/api/Links/PostLinks', 'POST', r);
    //};
    self.declineRequest = function declineRequest(data) {

    }

    self.completeRequest = function completeRequest(data) {

    }

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
            console.log(self.requests());
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

    self.addRequesterFilter = function addRequesterFilter(data, event) {
        var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        var value = $(target).prev().val();

        if (self.filters.requester.indexOf(value) === -1) {
            self.filters.requester.push(value);
            $(target).prev().val('');
        }
    }

    ko.bindingHandlers.date = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) { 
            var value = valueAccessor();
            element.value = value.substring(0, 10);

            ko.utils.registerEventHandler(element, "change", function () {
                var value = valueAccessor();
                value(new Date(element.value));
                console.log(valueAccessor());
                //value(new Date(element.value));
            });
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            console.log('test');
            var value = valueAccessor();
            console.log(valueAccessor);
            element.value = value.substring(0, 10);
        }
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
        "filterNDBuilders": $("#filterNDBuilders").is(':checked'),
        "filterOpenBuilders": $("#filterOpenBuilders").is(':checked'),
        "filterUSBuilders": $("#filterUSBuilders").is(':checked'),
        "filterOther": $("#filterOther").val(),
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
            window.location.href = "/Home/RequestSubmission";
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

//$("#selectFile").click(function () {


//})



document.addEventListener("click", function (event) {
    var openDropdown = $('.dropdown.open');

    if (openDropdown.length === 0) return;

    var element = $(event.target);
    var parent = element.parent();
    var inMenu = parent.hasClass('dropdown') || parent.parent().hasClass('dropdown') ||
        parent.parent().parent().hasClass('dropdown') || parent.parent().parent().parent().hasClass('dropdown');

    if (!inMenu) {
        openDropdown.removeClass('open');
    } else {
        if (element.hasClass('dropdown-toggle')) {
            openDropdown.addClass('open');
        } else {
            return;
        }
    }
    event.stopPropagation();
});

$('.dropdown').on("hide.bs.dropdown", function (event) {
    return false;
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


