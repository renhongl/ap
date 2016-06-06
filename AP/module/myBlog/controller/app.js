(function () {
    var MY_APP = {
        init: function () {
            loadScript();
        }
    };

    function loadScript() {
        $.when(
            $.getScript("controller/user.js"),
            $.getScript("controller/ajax.js"),
            $.getScript("controller/url.js")
        ).done(function () {
            $.getScript("test/testUser.js")
        });
    }

    MY_APP.init();
})();