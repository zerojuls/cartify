"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ValidService = (function () {
    function ValidService() {
        this.stateChecks = {};
        this.validityChecks = {};
    }
    ValidService.prototype.stateCheck = function (control, code) {
        return (code in this.stateChecks) ? control[this.stateChecks[code]] : control.touched;
    };
    ValidService.prototype.validityCheck = function (control, code) {
        var ck = this.validityChecks[code];
        return ck ? {
            "result": control.hasError(ck['condition']),
            "message": ck['message']
        } : { "result": false, "message": "" };
    };
    ValidService.prototype.check = function (control) {
        var c = this.formToVlidate.controls[control];
        if (this.stateCheck(c, control)) {
            return (c.hasError('required')) ? {
                "result": true,
                "message": "Required Field!"
            } : this.validityCheck(c, control);
        }
        else {
            return { "result": false, "message": "" };
        }
    };
    ValidService.prototype.configure = function (form, _customValidityChecks, _customStateChecks) {
        this.formToVlidate = form;
        this.validityChecks = _customValidityChecks;
        this.stateChecks = _customStateChecks;
    };
    ValidService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ValidService);
    return ValidService;
}());
exports.ValidService = ValidService;
//# sourceMappingURL=validation.service.js.map