//XLIB code
function numbersonly(myfield, e, dec) {
    var key;
    var keychar;
    if (window.event) key = window.event.keyCode;
    else if (e) key = e.which;
    else return true;
    keychar = String.fromCharCode(key);
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) return true;
    else if ((("0123456789").indexOf(keychar) > -1)) return true;
    else if (dec && (keychar == ".")) {
        myfield.form.elements[dec].focus();
        return false
    } else return false
}

$(function() {
    $("li:first-child").addClass("first");
    $("li:last-child").addClass("last");
    $("tr:nth-child(odd)").addClass("alter");
    $('[href="#"]').attr("href", "javascript:;");
    now = new Date;
    thecopyrightYear = now.getYear();
    if (thecopyrightYear < 1900) thecopyrightYear = thecopyrightYear + 1900;
    $("#cur-date").replaceWith('<span id="cur-date">' + thecopyrightYear + "</span>")
        // Country List Data Fill
    var ctrycode = 44, calby; //------------------------------Change Country Code here if required.
	if (typeof geoip_country_code === "function") { 
		calby = "ip";
	}
	else{
		calby = "noip";
	}
    $.ajax({
        type: "GET",
        url: "/assets/js/countrylist.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('country').each(function() {
                var name = $(this).find('name').text();
                var abbr = $(this).find('abbr').text();
                var code = $(this).find('code').text();
                $('.jform select.countrylist').append('<option value="' + code + '" data-abbr="' + abbr + '">' + name + '</option>');
                if (calby == "noip") {
                    /* Static Country Select */
                    $('.jform select.countrylist option[value="' + ctrycode + '"]').attr('selected', 'selected');
                    $('.jform input[name="code"]').val('+' + ctrycode);
                    $('.jform input[name="ctry"]').val($('.jform select.countrylist option:selected').html());
                } else if (calby == "ip") {
                    /* Geo IP Country Select */
                    var ctrycode1 = geoip_country_code(),
                        tgtctry = $('.jform select.countrylist option[data-abbr="' + ctrycode1 + '"]');
                    tgtctry.attr('selected', 'selected');
                    $('.jform input[name="code"]').val('+' + tgtctry.attr('value'));
                    $('.jform input[name="ctry"]').val($('.jform select.countrylist option:selected').html());
                }
            })
        }
    });
    // Code change on select
    $('.jform select.countrylist[name="pc"]').each(function() {
        var id = $(this).parents('.jform').parent().attr('id');
        $(this).bind('change', function() {
            var cval = $(this).children('option:selected').attr('value');
            cnam = $(this).children('option:selected').html();
            $('#' + id + ' .jform input[name="code"]').val('+' + cval);
            $('#' + id + ' .jform input[name="ctry"]').val(cnam)
        });
    });
    $('[name="pn"]').each(function() {
        if ($(this).attr('type') == "text") {
            $(this).attr('onkeypress', 'return numbersonly(this, event)');
        }
        $(this).attr('minlength', 7)
    });
    $('[name="cn"]').each(function() {
        $(this).attr('minlength', 2)
    })
    $('input[type="password"]').keypress(function(e) {
        if (e.which === 32) return false;
    });

    if ($.browser.msie && $.browser.version <= 9) {
        $('input[type="text"], input[type="password"], input[type="email"], textarea').each(function() {
            var txtvalue = $(this).attr('placeholder');
            $(this).attr('value', txtvalue)
        });
        $('input[type="text"], input[type="password"], input[type="email"], textarea').on('focus', function() {
            var maintxt = $(this).attr('placeholder');
            if ($(this).attr('value') == maintxt) {
                $(this).attr('value', '')
            }
        }).blur(function() {
            var maintxt = $(this).attr('placeholder');
            if ($(this).attr('value') == '') {
                $(this).attr('value', maintxt)
            }
        })
    }

    // Validations ------------------------------------------------------------------
    $('.validate').each(function() {
        var id = $(this).parent().attr('id'),
            cnval = $('#' + id + ' .jform').find('[name="cn"]').attr('placeholder');
        var msgval = $('#' + id + ' .jform').find('[name="param_Project-Information"]').attr('placeholder');
        pwdval = $('#' + id + ' .jform').find('[name="pwd"]').attr('placeholder');
        if ($.browser.msie && $.browser.version <= 9) {
            jQuery.validator.addMethod("iecn", function(value, element) {
                switch (element.value) {
                    case cnval:
                        if (element.name == cnval) return false;
                        break;
                    default:
                        return true;
                        break;
                }
            });
            jQuery.validator.addMethod("iemsg", function(value, element) {
                switch (element.value) {
                    case $(element).attr('placeholder'):
                        if (element.value == $(element).attr('placeholder')) return false;
                        break;
                    default:
                        return true;
                        break;
                }
            });

        }
        jQuery.validator.addMethod("alphanumeric", function(value, element) {
            return this.optional(element) || /^[A-Za-z-.\s\']+$/i.test(value);
        }, "Letters, numbers, and underscores only please");
        $('#' + id + ' .jform').validate();
    });

    $(window).load(function() {
        var num = 0;
        $('.placeholder').each(function() {
            num++;
            var ithis = $(this),
                pval = ithis.attr('placeholder'),
                namval = ithis.attr('name');
            ithis.removeAttr('placeholder');
            ithis.parent().prepend('<input type="text" name="phtxt' + num + '" class="phtxt ' + namval + '-holder" value="' + pval + '" />');
            ithis.hide();
            ithis.parent().children('.phtxt').on('focus', function() {
                $(this).hide();
                ithis.show().trigger('focus');
            });
            ithis.on('blur', function() {
                if (ithis.hasClass('error')) {
                    $(this).parent().children('.phtxt').addClass('error');
                } else {
                    $(this).parent().children('.phtxt').removeClass('error');
                } if (!ithis.val()) {
                    $(this).hide();
                    $(this).parent().children('.phtxt').show();
                }
            });
        });
    });

})

function goToByScroll(e) {
    $("html,body").animate({
        scrollTop: $(e).offset().top
    }, 1e3, "", function() {
        $(this).stop(true, true)
    })
}


//Validation Plugin
(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) {
                b && b.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
                return
            }
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0)
            }), this.submit(function(b) {
                function d() {
                    var d;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            if (a(this[0]).is("form")) return this.validate().form();
            var b = !0,
                c = a(this[0].form).validate();
            return this.each(function() {
                b &= c.element(this)
            }), b
        },
        removeAttrs: function(b) {
            var c = {},
                d = this;
            return a.each(b.split(/\s/), function(a, b) {
                c[b] = d.attr(b), d.removeAttr(b)
            }), c
        },
        rules: function(b, c) {
            var d = this[0];
            if (b) {
                var e = a.data(d.form, "validator").settings,
                    f = e.rules,
                    g = a.validator.staticRules(d);
                switch (b) {
                    case "add":
                        a.extend(g, a.validator.normalizeRule(c)), f[d.name] = g, c.messages && (e.messages[d.name] = a.extend(e.messages[d.name], c.messages));
                        break;
                    case "remove":
                        if (!c) return delete f[d.name], g;
                        var h = {};
                        return a.each(c.split(/\s/), function(a, b) {
                            h[b] = g[b], delete g[b]
                        }), h
                }
            }
            var i = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(d), a.validator.classRules(d), a.validator.attributeRules(d), a.validator.staticRules(d)), d);
            if (i.required) {
                var j = i.required;
                delete i.required, i = a.extend({
                    required: j
                }, i)
            }
            return i
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + b.value)
        },
        filled: function(b) {
            return !!a.trim("" + b.value)
        },
        unchecked: function(a) {
            return !a.checked
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return arguments.length === 1 ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), c)
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a, b) {
                this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
            },
            onfocusout: function(a, b) {
                !this.checkable(a) && (a.name in this.submitted || !this.optional(a)) && this.element(a)
            },
            onkeyup: function(a, b) {
                if (b.which === 9 && this.elementValue(a) === "") return;
                (a.name in this.submitted || a === this.lastActive) && this.element(a)
            },
            onclick: function(a, b) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                b.type === "radio" ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                b.type === "radio" ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function d(b) {
                    var c = a.data(this[0].form, "validator"),
                        d = "on" + b.type.replace(/^validate/, "");
                    c.settings[d] && c.settings[d].call(c, this[0], b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var b = this.groups = {};
                a.each(this.settings.groups, function(c, d) {
                    a.each(d.split(/\s/), function(a, d) {
                        b[d] = c
                    })
                });
                var c = this.settings.rules;
                a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", d).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", d), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                b = this.validationTargetFor(this.clean(b)), this.lastElement = b, this.prepareElement(b), this.currentElements = a(b);
                var c = this.check(b) !== !1;
                return c ? delete this.invalid[b.name] : this.invalid[b.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), c
            },
            showErrors: function(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c],
                        element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b = 0;
                for (var c in a) b++;
                return b
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length === 1 && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.replace(" ", ".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c = a(b).attr("type"),
                    d = a(b).val();
                return c === "radio" || c === "checkbox" ? a('input[name="' + a(b).attr("name") + '"]:checked').val() : typeof d == "string" ? d.replace(/\r/g, "") : d
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c = a(b).rules(),
                    d = !1,
                    e = this.elementValue(b),
                    f;
                for (var g in c) {
                    var h = {
                        method: g,
                        parameters: c[g]
                    };
                    try {
                        f = a.validator.methods[g].call(this, e, b, h.parameters);
                        if (f === "dependency-mismatch") {
                            d = !0;
                            continue
                        }
                        d = !1;
                        if (f === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(b));
                            return
                        }
                        if (!f) return this.formatAndAdd(b, h), !1
                    } catch (i) {
                        throw this.settings.debug && window.console && console.log("exception occured when checking element " + b.id + ", check the '" + h.method + "' method", i), i
                    }
                }
                if (d) return;
                return this.objectLength(c) && this.successList.push(b), !0
            },
            customMetaMessage: function(b, c) {
                if (!a.metadata) return;
                var d = this.settings.meta ? a(b).metadata()[this.settings.meta] : a(b).metadata();
                return d && d.messages && d.messages[c]
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg-" + c.toLowerCase()) || b.attributes && a(b).attr("data-msg-" + c.toLowerCase())
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (arguments[a] !== undefined) return arguments[a];
                return undefined
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), this.customMetaMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(b, c) {
                var d = this.defaultMessage(b, c.method),
                    e = /\$?\{(\d+)\}/g;
                typeof d == "function" ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                    message: d,
                    element: b
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b;
                for (a = 0; this.errorList[a]; a++) {
                    var c = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message)
                }
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d = this.errorsFor(b);
                d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.attr("generated") && d.html(c)) : (d = a("<" + this.settings.errorElement + "/>").attr({
                    "for": this.idOrName(b),
                    generated: !0
                }).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b))), !c && this.settings.success && (d.text(""), typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d, b)), this.toShow = this.toShow.add(d)
            },
            errorsFor: function(b) {
                var c = this.idOrName(b);
                return this.errors().filter(function() {
                    return a(this).attr("for") === c
                })
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(a) {
                return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find('[name="' + b + '"]')
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a, b) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && this.pendingRequest === 0 && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        attributeRules: function(b) {
            var c = {},
                d = a(b);
            for (var e in a.validator.methods) {
                var f;
                e === "required" ? (f = d.get(0).getAttribute(e), f === "" && (f = !0), f = !!f) : f = d.attr(e), f ? c[e] = f : d[0].getAttribute("type") === e && (c[e] = !0)
            }
            return c.maxlength && /-1|2147483647|524288/.test(c.maxlength) && delete c.maxlength, c
        },
        metadataRules: function(b) {
            if (!a.metadata) return {};
            var c = a.data(b.form, "validator").settings.meta;
            return c ? a(b).metadata()[c] : a(b).metadata()
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) {
                    delete b[d];
                    return
                }
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = e.param !== undefined ? e.param : !0 : delete b[d]
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) ? e(c) : e
            }), a.each(["minlength", "maxlength", "min", "max"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                b[this] && (b[this] = [Number(b[this][0]), Number(b[this][1])])
            }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b.messages && delete b.messages, b
        },
        normalizeRule: function(b) {
            if (typeof b == "string") {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = d !== undefined ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if (c.nodeName.toLowerCase() === "select") {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
            },
            remote: function(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e = this.previousValue(c);
                this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), e.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = e.message, d = typeof d == "string" && {
                    url: d
                } || d;
                if (this.pending[c.name]) return "pending";
                if (e.old === b) return e.valid;
                e.old = b;
                var f = this;
                this.startRequest(c);
                var g = {};
                return g[c.name] = b, a.ajax(a.extend(!0, {
                    url: d,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    success: function(d) {
                        f.settings.messages[c.name].remote = e.originalMessage;
                        var g = d === !0 || d === "true";
                        if (g) {
                            var h = f.formSubmitted;
                            f.prepareElement(c), f.formSubmitted = h, f.successList.push(c), delete f.invalid[c.name], f.showErrors()
                        } else {
                            var i = {},
                                j = d || f.defaultMessage(c, "remote");
                            i[c.name] = e.message = a.isFunction(j) ? j(b) : j, f.invalid[c.name] = !0, f.showErrors(i)
                        }
                        e.valid = g, f.stopRequest(c, g)
                    }
                }, d)), "pending"
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e <= d
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || a <= c
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            email: function(a, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c = 0,
                    d = 0,
                    e = !1;
                a = a.replace(/\D/g, "");
                for (var f = a.length - 1; f >= 0; f--) {
                    var g = a.charAt(f);
                    d = parseInt(g, 10), e && (d *= 2) > 9 && (d -= 9), c += d, e = !e
                }
                return c % 10 === 0
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            }
        }
    }), a.format = a.validator.format
})(jQuery),
function(a) {
    var b = {};
    if (a.ajaxPrefilter) a.ajaxPrefilter(function(a, c, d) {
        var e = a.port;
        a.mode === "abort" && (b[e] && b[e].abort(), b[e] = d)
    });
    else {
        var c = a.ajax;
        a.ajax = function(d) {
            var e = ("mode" in d ? d : a.ajaxSettings).mode,
                f = ("port" in d ? d : a.ajaxSettings).port;
            return e === "abort" ? (b[f] && b[f].abort(), b[f] = c.apply(this, arguments)) : c.apply(this, arguments)
        }
    }
}(jQuery),
function(a) {
    !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && a.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, c) {
        function d(b) {
            return b = a.event.fix(b), b.type = c, a.event.handle.call(this, b)
        }
        a.event.special[c] = {
            setup: function() {
                this.addEventListener(b, d, !0)
            },
            teardown: function() {
                this.removeEventListener(b, d, !0)
            },
            handler: function(b) {
                var d = arguments;
                return d[0] = a.event.fix(b), d[0].type = c, a.event.handle.apply(this, d)
            }
        }
    }), a.extend(a.fn, {
        validateDelegate: function(b, c, d) {
            return this.bind(c, function(c) {
                var e = a(c.target);
                if (e.is(b)) return d.apply(e, arguments)
            })
        }
    })
}(jQuery);




/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {
			return;
		}

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));



//Popup on leave	
	function leaveFromTop(e){
		
		if( e.clientY < 0 ) {// less than 60px is close enough to the top
		if ($.cookie('orform') == null)
			{
		 		$('.bxch, .cus-overlay').fadeIn();
				  cokie();

			}
		}
	}	

//create cookie on form submission
function cokie(){
		$.cookie("orform", 1,{
			expires : 1
			});
		var cookieValue = $.cookie("orform");
	
	
}

jQuery(document).ready(function(e) {
	//setTimeout(function() {
//		  $(document).on('mouseleave', leaveFromTop);
//		
//	}, 2000);
	
	$('.frmswitcher').click( function(){
		$(this).closest('.intro').css('display', 'none')
		$(this).closest('.bxch').find('form').fadeIn(600);
	})
	$('.bxch .closebtn').click( function(){
		$('.bxch, .cus-overlay').fadeOut();
	})
});