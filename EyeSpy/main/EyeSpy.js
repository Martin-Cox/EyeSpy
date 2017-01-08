var EyeSpy = (function () {
    function EyeSpy() {
        console.log("EyeSpy initial creation");
    }
    /**
     * Creates the singleton instance of the EyeSpy extension.
     */
    EyeSpy.createInstance = function () {
        if (this._eyeSpy) {
            return this._eyeSpy;
        }
        else {
            return new EyeSpy();
        }
    };
    return EyeSpy;
}());
//# sourceMappingURL=EyeSpy.js.map