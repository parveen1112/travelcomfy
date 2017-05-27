/**
 * Maintaining Session in Session Store
 */
define(function(){
    return {
        /**
         * Get Data from Session
         * @param key
         */
        getSession: function(key){
            return sessionStorage ? sessionStorage.getItem(key) || '' : '';
        },

        /**
         *
         * @param key
         * @param val
         */
        setSession: function(key, val) {
            if (sessionStorage && key) {
                val = val ? val : '';
                sessionStorage.setItem(key, val);
            }
        }
    };
});