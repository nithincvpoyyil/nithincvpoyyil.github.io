webpackJsonp([0,3],{

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SharedService = (function () {
    function SharedService() {
        this.inputList = [];
        //'date', 'location-cordinates'
        this.EXPRESSIONS = ['number', 'boolean', 'image', 'sentence', 'name', 'zipcode', 'random-string', 'paragarph', 'email', 'uuid', 'address', 'number-array', 'string-array'];
    }
    SharedService.prototype.addInput = function (inputItem) {
        this.inputList.push(inputItem);
    };
    SharedService.prototype.removeInput = function (inputKey) {
        this.inputList = this.inputList.filter(function (inputItem) {
            return inputItem.variable !== inputKey;
        });
    };
    SharedService.prototype.getInputList = function () {
        return this.inputList;
    };
    SharedService.prototype.getExpressionTypes = function () {
        return this.EXPRESSIONS;
    };
    SharedService.prototype.generateRandom = function (length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    };
    ;
    SharedService.prototype.generateRandomNumber = function (max, min) {
        max = max ? max : 1000000;
        min = min ? min : 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    SharedService.prototype.getRandomBoolean = function () {
        return Math.random() >= 0.5;
    };
    return SharedService;
}());
SharedService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SharedService);

//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/shared.service.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputComponent_input_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coreModule_shared_service__ = __webpack_require__(200);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(zone, listService, componentFactoryResolver, viewContainerRef) {
        this.zone = zone;
        this.listService = listService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.jsonGenerated = '';
        this.inputList = [];
        this.orginalJSONStringified = '';
        this.limitValue = 5;
        this.items = [1, 2, 3, 4];
        this.expressionTypes = this.listService.getExpressionTypes();
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.addInput = function (inputItem) {
        this.inputList.push(inputItem);
    };
    AppComponent.prototype.removeInput = function (inputKey) {
        this.inputList = this.inputList.filter(function (inputItem) {
            return inputItem.variable !== inputKey;
        });
        this.runJsonGenrateFunction();
    };
    AppComponent.prototype.updateInputList = function (newInputItem, oldInputItem) {
        this.inputList.forEach(function (inputItem) {
            if (inputItem.variable === oldInputItem.variable) {
                inputItem.variable = newInputItem.variable;
                inputItem.expression = newInputItem.expression;
            }
        });
    };
    AppComponent.prototype.getInputList = function () {
        return this.inputList;
    };
    AppComponent.prototype.createComponentProgramatically = function () {
        var factory = this.componentFactoryResolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_2__inputComponent_input_component__["a" /* InputComponent */]);
        var ref = this.inputItemContainer.createComponent(factory);
        var inputComponentInstance = ref.instance;
        this.listService.addInput(inputComponentInstance.getInputItem());
        ref.changeDetectorRef.detectChanges();
    };
    AppComponent.prototype.insert = function () {
        this.expressionTypes = this.listService.getExpressionTypes();
        var expression = 'random-string';
        var variable = 'new-key-' + this.listService.generateRandom(8);
        var inputItem = { 'expression': expression, 'variable': variable };
        this.addInput(inputItem);
        this.runJsonGenrateFunction();
    };
    AppComponent.prototype.downloadJson = function () {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.orginalJSONStringified);
        var dlAnchorElem = document.getElementById('dummy-anchor-element-to-download');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "fakeJSON.json");
        dlAnchorElem.click();
    };
    AppComponent.prototype.printVals = function () {
        this.inputList.filter(function (inputItem) {
            console.info(inputItem.variable, ' : ', inputItem.expression);
        });
    };
    AppComponent.prototype.onUpdateOfInputItem = function (newInputItem, oldInputItem) {
        this.updateInputList(newInputItem, oldInputItem);
        this.runJsonGenrateFunction();
    };
    AppComponent.prototype.runJsonGenrateFunction = function () {
        var jsonObjectArray = [];
        if (this.limitValue > 1000) {
            this.limitValue = 1000;
            bootbox.alert('Warning: Exceeded the maximum limit (<1000)');
        }
        for (var i = 0; i < this.limitValue; i++) {
            jsonObjectArray.push(this.generateJson());
        }
        this.appendAndUpdateJSON(jsonObjectArray);
    };
    AppComponent.prototype.generateJson = function () {
        var _this = this;
        var jsonObj = new Object();
        this.inputList.forEach(function (inputItem) {
            if (inputItem.expression === 'number') {
                jsonObj[inputItem.variable.toString()] = _this.listService.generateRandomNumber(1, 10000000);
            }
            else if (inputItem.expression === 'image') {
                jsonObj[inputItem.variable.toString()] = faker.Image.imageUrl();
            }
            else if (inputItem.expression === 'sentence') {
                jsonObj[inputItem.variable.toString()] = faker.Lorem.sentence();
            }
            else if (inputItem.expression === 'name') {
                jsonObj[inputItem.variable.toString()] = faker.Name.findName();
            }
            else if (inputItem.expression === 'zipcode') {
                jsonObj[inputItem.variable.toString()] = faker.Address.zipCode();
            }
            else if (inputItem.expression === 'location-cordinates') {
                jsonObj[inputItem.variable.toString()] = '12,12';
            }
            else if (inputItem.expression === 'date') {
                jsonObj[inputItem.variable.toString()] = '27/05/1991';
            }
            else if (inputItem.expression === 'random-string') {
                jsonObj[inputItem.variable.toString()] = _this.listService.generateRandom(12);
            }
            else if (inputItem.expression === 'paragraph') {
                jsonObj[inputItem.variable.toString()] = faker.Lorem.paragarph();
            }
            else if (inputItem.expression === 'email') {
                jsonObj[inputItem.variable.toString()] = faker.Internet.email();
            }
            else if (inputItem.expression === 'uuid') {
                jsonObj[inputItem.variable.toString()] = __WEBPACK_IMPORTED_MODULE_1_uuid__["v4"]();
            }
            else if (inputItem.expression === 'address') {
                jsonObj[inputItem.variable.toString()] = faker.Address.streetAddress();
            }
            else if (inputItem.expression === 'number-array') {
                jsonObj[inputItem.variable.toString()] = _this.getStringOrNumberArray(false);
            }
            else if (inputItem.expression === 'string-array') {
                jsonObj[inputItem.variable.toString()] = _this.getStringOrNumberArray(true);
            }
            else if (inputItem.expression === 'boolean') {
                jsonObj[inputItem.variable.toString()] = _this.listService.getRandomBoolean();
            }
            else {
                jsonObj[inputItem.variable.toString()] = __WEBPACK_IMPORTED_MODULE_1_uuid__["v4"]();
            }
        });
        return jsonObj;
    };
    AppComponent.prototype.getStringOrNumberArray = function (isString) {
        var limit = this.listService.generateRandomNumber(3, 10);
        var array = [];
        for (var i = 0; i < limit; i++) {
            if (isString) {
                array.push(this.listService.generateRandom(10));
            }
            else {
                array.push(this.listService.generateRandomNumber(1, 9999));
            }
        }
        return array;
    };
    AppComponent.prototype.syntaxHighlight = function (jsonString) {
        // http://jsfiddle.net/KJQ9K/554/
        // http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        jsonString = jsonString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                }
                else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
    AppComponent.prototype.appendAndUpdateJSON = function (jsonObject) {
        try {
            var str = JSON.stringify(jsonObject, null, 2);
            this.orginalJSONStringified = str;
            this.jsonGenerated = this.syntaxHighlight(str);
        }
        catch (error) {
            this.jsonGenerated = '';
        }
    };
    AppComponent.prototype.showWithLovePopup = function () {
        bootbox.alert({
            message: "Thank you for using the app, kindly share your thoughts!",
            backdrop: true
        });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])('inputitemcontainer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* ViewContainerRef */] }),
    __metadata("design:type", Object)
], AppComponent.prototype, "inputItemContainer", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(615),
        styles: [__webpack_require__(612)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__coreModule_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__coreModule_shared_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* ComponentFactoryResolver */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* ViewContainerRef */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/app.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coreModule_shared_service__ = __webpack_require__(200);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InputComponent = (function () {
    function InputComponent(zone, listService) {
        this.zone = zone;
        this.listService = listService;
        this.onInputItemChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.onDeleteItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.expressionTypes = this.listService.getExpressionTypes();
    }
    InputComponent.prototype.ngOnInit = function () {
    };
    InputComponent.prototype.setVariable = function (variable) {
        this.variable = variable;
    };
    InputComponent.prototype.getVariable = function () {
        return this.variable;
    };
    InputComponent.prototype.setExpression = function (expr) {
        this.expression = expr;
    };
    InputComponent.prototype.getExpression = function () {
        return this.expression;
    };
    InputComponent.prototype.updateData = function () {
        var inputItem = { 'expression': this.expression, 'variable': this.variable };
        this.onInputItemChange.emit(inputItem);
    };
    InputComponent.prototype.deleteItem = function () {
        var inputItem = { 'expression': this.expression, 'variable': this.variable };
        this.onDeleteItem.emit(inputItem);
    };
    InputComponent.prototype.printvals = function (args) {
        args = args ? args : '';
        console.log(args, '---', this.expression, '---', this.variable, '---');
    };
    return InputComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(),
    __metadata("design:type", Object)
], InputComponent.prototype, "variable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(),
    __metadata("design:type", Object)
], InputComponent.prototype, "expression", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _a || Object)
], InputComponent.prototype, "onInputItemChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _b || Object)
], InputComponent.prototype, "onDeleteItem", void 0);
InputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
        selector: 'input-item',
        template: __webpack_require__(616),
        styles: [__webpack_require__(613)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__coreModule_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__coreModule_shared_service__["a" /* SharedService */]) === "function" && _d || Object])
], InputComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/input.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 348;


/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(457);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inputComponent_input_component__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pouchdb_service__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__coreModule_shared_service__ = __webpack_require__(200);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__inputComponent_input_component__["a" /* InputComponent */]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_5__inputComponent_input_component__["a" /* InputComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__pouchdb_service__["a" /* PouchService */], __WEBPACK_IMPORTED_MODULE_7__coreModule_shared_service__["a" /* SharedService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/app.module.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(302);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(456);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/index.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PouchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PouchService = (function () {
    function PouchService() {
        this.listener = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        if (!this.isInstantiated) {
        }
    }
    PouchService.prototype.get = function (id) {
        return this.database.get(id);
    };
    PouchService.prototype.put = function (document, id) {
    };
    PouchService.prototype.sync = function (remote) {
    };
    PouchService.prototype.getChangeListener = function () {
        return this.listener;
    };
    return PouchService;
}());
PouchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PouchService);

//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/pouchdb.service.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true
};
//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/environment.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=/home/nithincv/dev/couchbase-chrome-extension-master/AngularExtension/src/polyfills.js.map

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(146)();
// imports


// module
exports.push([module.i, "\n/* Taken from http://bootsnipp.com/snippets/8deZ */\n\n.btn-circle {\n  width: 35px;\n  height: 35px;\n  text-align: center;\n  padding: 2px 0;\n  font-size: 20px;\n  line-height: 1.65;\n  border-radius: 30px;\n}\n\n.input-item-container {\n  width: 100%;\n  position: relative;\n  top: 80px;\n  left: 14px;\n  max-height: 500px;\n  min-height: 400px;\n  overflow: hidden;\n  overflow-y: auto;\n  padding-bottom: 10px;\n}\n\n.output-json-container {\n  width: 100%;\n  position: relative;\n  top: 80px;\n  left: 14px;\n  max-height: 500px;\n  overflow: hidden;\n  overflow-y: auto;\n  padding: 5px;\n  border: 1px dotted #1e90ff;\n  min-height: 400px;\n  background: #f5f5f5;\n  padding-bottom: 10px;\n}\n\n\n/* refer code link*/\n\n.output-json-container pre {\n  padding: 5px;\n  margin: 5px;\n  border: 0;\n  background: transparent;\n}\n\na.btn.btn-circle.btn-lg {\n  font-size: 15px;\n  line-height: 30px;\n}\n\n\nspan.item-limit-text {\n    color: #fff;\n    font-size: 1.5rem;\n    margin-right: 19px;\n    display: inline-block;\n    position: relative;\n    top: 5px;\n}\n\nspan.item-limit-input {\n    width: 50px;\n    overflow: hidden;\n    display: inline-block;\n    margin-right: 50px;\n    position: relative;\n    top: 12px;\n    text-align: center;\n    color: #444;\n}\n\nspan.item-limit-input input[type=\"number\"] {\n\n    padding:0 5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(146)();
// imports


// module
exports.push([module.i, " .input-container {\n   display: block;\n   min-width: 390px;\n   padding: 5px 0 5px 5px;\n   width: 90%;\n }\n \n .variable {\n   color: red;\n   display: inline-block;\n   min-height: 30px;\n   line-height: 30px;\n   min-width: 150px;\n   text-align: center;\n }\n \n .variable input {\n   height: 30px;\n   font-weight: 500;\n   padding: 7px;\n   color: #444;\n   border: 0;\n   border-bottom: 1px solid #ffffff;\n   box-shadow: 0 0px 3px 0px #337ab7;\n   -webkit-transition: all 0.3s ease-in;\n   transition: all 0.3s ease-in;\n   border-radius: 2%;\n }\n \n .variable input:focus {\n   border-bottom: 1px solid #35aefe;\n }\n \n .expression {\n   display: inline-block;\n   color: blue;\n   line-height: 30px;\n   min-width: 150px;\n   text-align: center;\n }\n \n .expression select {\n   position: relative;\n   top: 0;\n   height: 31px;\n   padding: 2px 8px;\n   color: #444;\n }\n \n .remove-btn-container {\n   display: inline-block;\n   width: 30px;\n   height: 30px;\n }\n \n .remove-btn-container button {\n   width: 30px;\n   height: 30px;\n   line-height: 30px;\n   background-color: #ff6347;\n   color: #ffffff;\n   border-radius: 50%;\n   font-weight: 600;\n   outline: none;\n   border: 0;\n   box-shadow: 0px 0px 3px #c3a9a9;\n }\n \n .edit-btn-container {\n   display: inline-block;\n   color: #444;\n   font-size: 15px;\n   font-weight: 500;\n }\n\n .title-section{\n   position: relative;\n }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 615:
/***/ (function(module, exports) {

module.exports = "<div>\n  <nav class=\"navbar navbar-default navbar-fixed-top\" style=\"background-color: #2196F3;\">\n    <div class=\"navbar-header\">\n      <span class=\"navbar-brand\" style=\"color: #FFFFFF\" (click)=\"printVals()\">Fake JSON Generator </span>\n    </div>\n    <div class=\"nav navbar-nav navbar-right\">\n      <span class=\"item-limit-text\">Number of Items:</span>\n      <span class=\"item-limit-input\"><input type='number'  min=\"1\" max=\"1000\"  [(ngModel)]=\"limitValue\"/></span>\n    </div>\n  </nav>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-sm-12 col-sm-12 col-md-6\">\n        <div class=\"row title-section\">\n          JSON - (Key,Value)\n        </div>\n        <div class=\"input-item-container\">\n          <!--  <ng-container #inputitemcontainer></ng-container> -->\n          <input-item *ngFor=\"let inputItem of inputList\" (onInputItemChange)=\"onUpdateOfInputItem($event,inputItem)\" (onDeleteItem)=\"removeInput($event.variable)\"\n            [(variable)]=\"inputItem.variable\" [(expression)]=\"inputItem.expression\"></input-item>\n        </div>\n      </div>\n      <div class=\"col-sm-12 col-sm-12 col-md-6\">\n        <div class=\"row title-section\">\n          JSON - Generated\n        </div>\n        <div class=\"output-json-container\">\n\n          <pre class=\"code-generated\" innerHtml=\"{{jsonGenerated}}\"></pre>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n\n  <a (click)=\"insert()\" title=\"add JSON key-value\" class=\"btn btn-circle btn-primary btn-lg\" style=\"position: fixed; bottom: 15px; right: 15px\">\n    <span class=\"glyphicon glyphicon-plus\"></span>\n  </a>\n\n\n  <a (click)=\"runJsonGenrateFunction()\" title=\"generate JSON\" class=\"btn btn-circle btn-success btn-lg\" style=\"position: fixed; bottom: 15px; right: 60px\">\n    <span class=\"glyphicon glyphicon-play\"></span>\n  </a>\n\n  <a (click)=\"downloadJson()\" title=\"download JSON\" class=\"btn btn-circle btn-warning btn-lg\"\n    style=\"position: fixed; bottom: 15px; right: 105px\">\n    <span class=\"glyphicon glyphicon-download-alt\"></span>\n  </a>\n\n  <a (click)=\"showWithLovePopup()\" title=\"with <3 of JS\" class=\"btn btn-circle btn-danger btn-lg\" style=\"position: fixed; bottom: 15px; right: 150px\">\n    <span class=\"glyphicon glyphicon-heart\"></span>\n  </a>\n</div>\n"

/***/ }),

/***/ 616:
/***/ (function(module, exports) {

module.exports = "<div class=\"row input-container\">\n  <div class=\"variable col-sm-4\">\n    <input type=\"text\" [(ngModel)]=\"variable\" (keyup)=\"updateData()\" />\n  </div>\n  <div class=\"expression col-sm-5\">\n    <select class=\"input-select\" (change)=\"updateData()\" [(ngModel)]=\"expression\">\n        <option *ngFor=\"let item of expressionTypes\" [value]=\"item\">{{item}}</option>\n    </select>\n  </div>\n  <div class=\"remove-btn-container col-sm-3\"><button (click)=\"deleteItem()\"><span   class=\"glyphicon glyphicon-minus\"></span></button></div>\n</div>\n"

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(349);


/***/ })

},[632]);
//# sourceMappingURL=main.bundle.js.map