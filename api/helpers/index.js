module.exports = {
    /**
     * This function is used for merging the two objects
     * @param destination
     * @param source
     */
    merge : function(destination, source){
        for (var i in source){
            destination[i] = source[i];
        }
    },
    /**
     * Better Empty function than lodash
     * @param obj
     * @returns {boolean}
     */
    isEmpty : function isEmpty(obj) {
        if (typeof obj === "undefined") {
            return true;
        } else if (obj === null || typeof obj === "number" || typeof obj === "boolean") {
            return obj ? false : true;
        } else if (typeof obj === "string") {
            return obj.trim().length ? false : true;
        } else if (typeof obj === "object") {
            return Object.keys(obj).length ? false : true;
        } else {
            return false;
        }
    }
}
