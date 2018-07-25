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

