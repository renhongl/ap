(function () {
    var TEST_USER = {
        testRegister: function () {
            var user = {
                name: "test2",
                password: "123456"
            };
            
            USER.register.call(user);
        },
        testLogin: function () {
            var user = {
                name: "test2",
                password: "1234567"
            };
            
            USER.login.call(user);
        },
        testLogout: function () {

        },
        testChangeInfo: function () {

        },
        test: function(){
            TEST_USER.testRegister();
            TEST_USER.testLogin();
        }
    };
    
    TEST_USER.test();
    
})();