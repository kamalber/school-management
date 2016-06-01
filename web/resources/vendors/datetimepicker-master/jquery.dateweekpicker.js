/**
 * @preserve jQuery DateTimePicker plugin v2.4.3
 * @homepage http://myxdsoft.net/jqplugins/dateweekpicker/
 * (c) 2014, Chupurnov Valeriy.
 */
/*global document,window,jQuery,setTimeout,clearTimeout,HighlightedDate,getmyCurrentValue*/
(function ($) {
	'use strict';
	var default_options  = {
		i18n: {
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeek: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeek: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				]
			}
		},
		value: '',
		lang: 'en',

		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',

		startDate: false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: true,
		closeOnWithoutClick: true,
		closeOnInputClick: true,

		timepicker: false,
		datepicker: true,
		weeks: false,

		defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',

		myonSelectDate: function () {},
		myonSelectTime: function () {},
		myonChangeMonth: function () {},
		myonChangeYear: function () {},
		myonChangeDateTime: function () {},
		myonShow: function () {},
		myonClose: function () {},
		myonGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'myxdsoft_next',
		prev : 'myxdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: false,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		highlightedDates: [],
		highlightedPeriods: [],
		disabledDates : [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
        showApplyButton: false
	};
	// fix for ie8
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}
	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};
        
        
	$.fn.myxdsoftScroller = function (percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {x: 0, y: 0},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} 
                                        else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				move = 0,
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};
			if (percent === 'hide') {
				timeboxparent.find('.myxdsoft_scrollbar').hide();
				return;
			}
			if (!$(this).hasClass('myxdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="myxdsoft_scrollbar"></div>');
				scroller = $('<div class="myxdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('myxdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.myxdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.myxdsoft_scroller mousedown.myxdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.myxdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown') {
							if (document) {
								$(document.body).addClass('myxdsoft_noselect');
							}
							$([document.body, window]).on('mouseup.myxdsoft_scroller', function arguments_callee() {
								$([document.body, window]).off('mouseup.myxdsoft_scroller', arguments_callee)
									.off('mousemove.myxdsoft_scroller', calcOffset)
									.removeClass('myxdsoft_noselect');
							});
							$(document.body).on('mousemove.myxdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function (event) {
						touchStart =  false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.myxdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.myxdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.myxdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.myxdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.myxdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.myxdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function (event) {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.myxdsoft_scroller', [percent]);
		});
	};

	$.fn.dateweekpicker = function (opt) {
		var KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown	=	false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.myxdsoft focusin.myxdsoft mousedown.myxdsoft', function initOnActionCallback(event) {
						if (input.is(':disabled') || input.data('myxdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('myxdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.myxdsoft focusin.myxdsoft mousedown.myxdsoft', initOnActionCallback)
								.trigger('open.myxdsoft');
						}, 100);
					});
			};

		createDateTimePicker = function (input) {
			var dateweekpicker = $('<div class="myxdsoft_datetimepicker myxdsoft_noselect"></div>'),
				myxdsoft_copyright = $('<div class="myxdsoft_copyright"></div>'),
				datepicker = $('<div class="myxdsoft_datepicker active"></div>'),
				mounth_picker = $(
                                '<div class="myxdsoft_mounthpicker">'+
//                 '<button type="button" class="myxdsoft_prev"></button>'+
                '<button type="button" class="myxdsoft_today_button"></button>' +
					'<div class="myxdsoft_label myxdsoft_month"><span></span></div>' +
					'<div class="myxdsoft_label myxdsoft_year"><span></span><i></i></div>' 
//		+'<button type="button" class="myxdsoft_next"></button></div>'
                                        ),
                                        
				calendar = $('<div class="myxdsoft_calendar"></div>'),
				timepicker = $('<div class="myxdsoft_timepicker active"><button type="button" class="myxdsoft_prev"></button><div class="myxdsoft_time_box"></div><button type="button" class="myxdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.myxdsoft_time_box').eq(0),
				timebox = $('<div class="myxdsoft_time_variant"></div>'),
                applyButton = $('<button class="myxdsoft_save_selected blue-gradient-button">Save Selected</button>'),
				/*scrollbar = $('<div class="myxdsoft_scrollbar"></div>'),
				scroller = $('<div class="myxdsoft_scroller"></div>'),*/
				monthselect = $('<div class="myxdsoft_select myxdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="myxdsoft_select myxdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,
				//scroll_element,
				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				timer1 = 0,
				_myxdsoft_datetime;

			if (options.id) dateweekpicker.attr('id', options.id);
			if (options.style) dateweekpicker.attr('style', options.style);
			if (options.weeks) dateweekpicker.addClass('myxdsoft_showweeks');

			dateweekpicker.addClass('myxdsoft_' + options.theme);
			dateweekpicker.addClass(options.className);

		
                
                
//                        mounth_picker
//				.find('.myxdsoft_month span')
//					.after(monthselect);
			mounth_picker
				.find('.myxdsoft_year span')
					.after(yearselect);

			mounth_picker
				.find('.myxdsoft_year')
					.on('mousedown.myxdsoft', function (event) {
					var select = $(this).find('.myxdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					mounth_picker
						.find('.myxdsoft_select')
							.hide();
					if (_myxdsoft_datetime.currentTime) {
						val = _myxdsoft_datetime.currentTime[$(this).hasClass('myxdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.myxdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.myxdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			mounth_picker
				.find('.myxdsoft_select')
					.myxdsoftScroller()
				.on('mousedown.myxdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
				})
				.on('mousedown.myxdsoft', '.myxdsoft_option', function (event) {

					if (_myxdsoft_datetime.currentTime === undefined || _myxdsoft_datetime.currentTime === null) {
						_myxdsoft_datetime.currentTime = _myxdsoft_datetime.now();
					}

					var year = _myxdsoft_datetime.currentTime.getFullYear();
					if (_myxdsoft_datetime && _myxdsoft_datetime.currentTime) {
						_myxdsoft_datetime.currentTime[$(this).parent().parent().hasClass('myxdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
					}

					$(this).parent().parent().hide();

					dateweekpicker.trigger('xchange.myxdsoft');
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}

					if (year !== _myxdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}
				});
                                
                                
			
			dateweekpicker.setOptions = function (_options) {
				var highlightedDates = {},
					getCaretPos = function (input) {
						try {
							if (document.selection && document.selection.createRange) {
								var range = document.selection.createRange();
								return range.getBookmark().charCodeAt(2) - 2;
							}
							if (input.setSelectionRange) {
								return input.selectionStart;
							}
						} catch (e) {
							return 0;
						}
					},
					setCaretPos = function (node, pos) {
						node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
						if (!node) {
							return false;
						}
						if (node.createTextRange) {
							var textRange = node.createTextRange();
							textRange.collapse(true);
							textRange.moveEnd('character', pos);
							textRange.moveStart('character', pos);
							textRange.select();
							return true;
						}
						if (node.setSelectionRange) {
							node.setSelectionRange(pos, pos);
							return true;
						}
						return false;
					},
					isValidValue = function (mask, value) {
						var reg = mask
							.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
							.replace(/_/g, '{digit+}')
							.replace(/([0-9]{1})/g, '{digit$1}')
							.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
							.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
						return (new RegExp(reg)).test(value);
					};
				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
					$.each(_options.highlightedDates, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							exDesc,
							hDate = new HighlightedDate(Date.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
							keyDate = hDate.date.dateFormat(options.formatDate);
						if (highlightedDates[keyDate] !== undefined) {
							exDesc = highlightedDates[keyDate].desc;
							if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
								highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
							}
						} else {
							highlightedDates[keyDate] = hDate;
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
					highlightedDates = $.extend(true, [], options.highlightedDates);
					$.each(_options.highlightedPeriods, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							dateTest = Date.parseDate(splitData[0], options.formatDate), // start date
							dateEnd = Date.parseDate(splitData[1], options.formatDate),
							desc = splitData[2],
							hDate,
							keyDate,
							exDesc,
							style = splitData[3];

						while (dateTest <= dateEnd) {
							hDate = new HighlightedDate(dateTest, desc, style);
							keyDate = dateTest.dateFormat(options.formatDate);
							dateTest.setDate(dateTest.getDate() + 1);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.myxdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					dateweekpicker.addClass('myxdsoft_inline');
					input.after(dateweekpicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'myxdsoft_prev';
					options.prev = 'myxdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					_myxdsoft_datetime.setCurrentTime(options.value);
					if (input && input.val) {
						input.val(_myxdsoft_datetime.str);
					}
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.myxdsoftScroller('hide');
				}

				if (options.minDate && /^-(.*)$/.test(options.minDate)) {
					options.minDate = _myxdsoft_datetime.strToDateTime(options.minDate).dateFormat(options.formatDate);
				}

				if (options.maxDate &&  /^\+(.*)$/.test(options.maxDate)) {
					options.maxDate = _myxdsoft_datetime.strToDateTime(options.maxDate).dateFormat(options.formatDate);
				}

				applyButton.toggle(options.showApplyButton);

//				mounth_picker
//					.find('.myxdsoft_today_button')
//						.css('visibility', !options.todayButton ? 'hidden' : 'visible');

//				mounth_picker
//					.find('.' + options.prev)
//						.css('visibility', !options.prevButton ? 'hidden' : 'visible');

//				mounth_picker
//					.find('.' + options.next)
//						.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				if (options.mask) {
					input.off('keydown.myxdsoft');

					if (options.mask === true) {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}

					if ($.type(options.mask) === 'string') {
						if (!isValidValue(options.mask, input.val())) {
							input.val(options.mask.replace(/[0-9]/g, '_'));
						}

						input.on('keydown.myxdsoft', function (event) {
							var val = this.value,
								key = event.which,
								pos,
								digit;

							if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
								pos = getCaretPos(this);
								digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

								if ((key === BACKSPACE || key === DEL) && pos) {
									pos -= 1;
									digit = '_';
								}

								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								val = val.substr(0, pos) + digit + val.substr(pos + 1);
								if ($.trim(val) === '') {
									val = options.mask.replace(/[0-9]/g, '_');
								} else {
									if (pos === options.mask.length) {
										event.preventDefault();
										return false;
									}
								}

								pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								if (isValidValue(options.mask, val)) {
									this.value = val;
									setCaretPos(this, pos);
								} else if ($.trim(val) === '') {
									this.value = options.mask.replace(/[0-9]/g, '_');
								} else {
									input.trigger('error_input.myxdsoft');
								}
							} else {
								if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
									return true;
								}
							}

							event.preventDefault();
							return false;
						});
					}
				}
				if (options.validateOnBlur) {
					input
						.off('blur.myxdsoft')
						.on('blur.myxdsoft', function () {
							if (options.allowBlank && !$.trim($(this).val()).length) {
								$(this).val(null);
								dateweekpicker.data('myxdsoft_datetime').empty();
							} else if (!Date.parseDate($(this).val(), options.format)) {
								var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
									splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

								// parse the numbers as 0312 => 03:12
								if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
									$(this).val([splittedHours, splittedMinutes].map(function (item) {
										return item > 9 ? item : '0' + item;
									}).join(':'));
								} else {
									$(this).val((_myxdsoft_datetime.now()).dateFormat(options.format));
								}

								dateweekpicker.data('myxdsoft_datetime').setCurrentTime($(this).val());
							} else {
								dateweekpicker.data('myxdsoft_datetime').setCurrentTime($(this).val());
							}

							dateweekpicker.trigger('changedatetime.myxdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				dateweekpicker
					.trigger('xchange.myxdsoft')
					.trigger('afterOpen.myxdsoft');
			};

			dateweekpicker
				.data('options', options)
				.on('mousedown.myxdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					
					return false;
				});

			//scroll_element = timepicker.find('.myxdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.myxdsoftScroller();

			dateweekpicker.on('afterOpen.myxdsoft', function () {
				timeboxparent.myxdsoftScroller();
			});

			dateweekpicker
				.append(datepicker)
				.append(timepicker);

			if (options.withoutCopyright !== true) {
				dateweekpicker
					.append(myxdsoft_copyright);
			}

			datepicker
				.append(mounth_picker)
				.append(calendar)
				.append(applyButton);

			$(options.parentID)
				.append(dateweekpicker);

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDateTime(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					if (options.yearOffset) {
						d.setFullYear(d.getFullYear() + options.yearOffset);
					}

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
					}
					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime) {
					_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
					dateweekpicker.trigger('xchange.myxdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function (dTime) {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.myonChangeMonth && $.isFunction(options.myonChangeMonth)) {
						options.myonChangeMonth.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.myonChangeYear)) {
						options.myonChangeYear.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}

					dateweekpicker.trigger('xchange.myxdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.myonChangeMonth && $.isFunction(options.myonChangeMonth)) {
						options.myonChangeMonth.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}
					dateweekpicker.trigger('xchange.myxdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					var onejan = new Date(datetime.getFullYear(), 0, 1);
					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [], timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
					if (tmpDate) {
						tmpDate[2] = Date.parseDate(tmpDate[2], options.formatDate);
					}
					if (tmpDate  && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? Date.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? Date.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? Date.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					return _this.currentTime.dateFormat(options.format);
				};
				_this.currentTime = this.now();
			};

			_myxdsoft_datetime = new XDSoft_datetime();

			applyButton.on('click', function (e) {//pathbrite
                e.preventDefault();
                dateweekpicker.data('changed', true);
                _myxdsoft_datetime.setCurrentTime(getmyCurrentValue());
                input.val(_myxdsoft_datetime.str());
                dateweekpicker.trigger('close.myxdsoft');
            });
			mounth_picker
				.find('.myxdsoft_today_button')
				.on('mousedown.myxdsoft', function () {
                                   // console.log("wayliiii");
					dateweekpicker.data('changed', true);
					_myxdsoft_datetime.setCurrentTime(0);
					dateweekpicker.trigger('afterOpen.myxdsoft');
				}).on('dblclick.myxdsoft', function () {
                                    var currentDate = _myxdsoft_datetime.getCurrentTime();
					currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
					var minDate = _myxdsoft_datetime.strToDate(options.minDate);
					minDate = new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
					if(currentDate < minDate) {
						return;
					}
					var maxDate = _myxdsoft_datetime.strToDate(options.maxDate);
					maxDate = new Date(maxDate.getFullYear(),maxDate.getMonth(),maxDate.getDate());
					if(currentDate > maxDate) {
						return;
					}
					input.val(_myxdsoft_datetime.str());
					dateweekpicker.trigger('close.myxdsoft');
				});
			mounth_picker
				.find('.myxdsoft_prev,.myxdsoft_next')
				.on('mousedown.myxdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_myxdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_myxdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([document.body, window]).on('mouseup.myxdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window]).off('mouseup.myxdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.myxdsoft_prev,.myxdsoft_next')
				.on('mousedown.myxdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						timeboxparent.trigger('scroll_element.myxdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([document.body, window]).on('mouseup.myxdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window])
							.off('mouseup.myxdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			dateweekpicker
				.on('xchange.myxdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_myxdsoft_datetime.currentTime === undefined || _myxdsoft_datetime.currentTime === null) {
							_myxdsoft_datetime.currentTime = _myxdsoft_datetime.now();
						}

						var table =	'',
                                                        start = new Date(_myxdsoft_datetime.currentTime.getFullYear(), 0, 1, 12, 0, 0),
							i = 0,
							j,
							today = _myxdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							hDate,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h = '',
							line_time,
							description;

//						while (start.getDay() !== options.dayOfWeekStart) {
//							start.setDate(start.getDate() - 1);
//						}

//						table += '<table><thead><tr>';

//						if (options.weeks) {
//							table += '<th></th>';
//						}

//						for (j = 0; j < 7; j += 1) {
//							table += '<th>' + options.i18n[options.lang].dayOfWeek[(j + options.dayOfWeekStart) % 7] + '</th>';
//						}

//						table += '</tr></thead>';
						table += '<tbody>';

//						if (options.maxDate !== false) {
//							maxDate = _myxdsoft_datetime.strToDate(options.maxDate);
//							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
//						}

//						if (options.minDate !== false) {
//							minDate = _myxdsoft_datetime.strToDate(options.minDate);
//							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
//						}
                                                        //ici
                                                        
                                                        i=0;
						while (i<56) {
							classes = [];
							i += 1;

							d = start.getDate();
                                                        y = start.getFullYear();
							m = start.getMonth();
							//w = _myxdsoft_datetime.getWeekOfYear(start);
                                                     w =_myxdsoft_datetime.getWeekOfYear( new Date(y,m,d) );
                                                      
                                                      
							description = '';
""
							//classes.push('myxdsoft_date');

//							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
//								customDateSettings = options.beforeShowDay.call(dateweekpicker, start);
//							} else {
//								customDateSettings = null;
//							}
//
//							if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
//								classes.push('myxdsoft_disabled');
//							} else if (options.disabledDates.indexOf(start.dateFormat(options.formatDate)) !== -1) {
//								classes.push('myxdsoft_disabled');
//							}

                                                        if ( i>53 ) {
								classes.push('myxdsoft_disabled');
							}
//							if (customDateSettings && customDateSettings[1] !== "") {
//								classes.push(customDateSettings[1]);
//							}

//							if (_myxdsoft_datetime.currentTime.getMonth() !== m) {
//								classes.push('myxdsoft_other_month');
//							}

                                                            // #fixme
						//	if (( dateweekpicker.data('changed')) && _myxdsoft_datetime.currentTime.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
						// w =_myxdsoft_datetime.getWeekOfYear( new Date(y,m,d) );	
                                                if (( dateweekpicker.data('changed')) && _myxdsoft_datetime.getWeekOfYear( _myxdsoft_datetime.currentTime ) === w ) {
                                                    //console.log(_myxdsoft_datetime.getWeekOfYear( _myxdsoft_datetime.currentTime )+' ---> '+ w);
                                                    console.log(_myxdsoft_datetime.currentTime);   
                                                    classes.push('myxdsoft_current');
							}

							//if (today.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
							if (  _myxdsoft_datetime.getWeekOfYear( new Date(today) ) === w  ) {
                                                            //console.log(today+' - '+start);
                                                            classes.push('myxdsoft_today');
							}
//
//							if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(start.dateFormat(options.formatDate)) !== -1) {
//								classes.push('myxdsoft_weekend');
//							}

//							if (options.highlightedDates[start.dateFormat(options.formatDate)] !== undefined) {
//								hDate = options.highlightedDates[start.dateFormat(options.formatDate)];
//								classes.push(hDate.style === undefined ? 'myxdsoft_highlighted_default' : hDate.style);
//								description = hDate.desc === undefined ? '' : hDate.desc;
//							}
//
//							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
//								classes.push(options.beforeShowDay(start));
//							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
//								if (options.weeks) {
//									table += '<th id="idWeeks"  data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"   " >' + w + '</th>';
//								}
							}

//							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="myxdsoft_date myxdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
//										'<div>' + d + '</div>' +
//									'</td>';
//                                                                        table += '<th id="idWeeks" data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="myxdsoft_date myxdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
//										'<div>' + ( w)  + '</div>' +
//									'</th>';
//									
									 table += '<th id="idWeeks"  data-week="' + w + '" data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="myxdsoft_date myxdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
										'<div>' + w  + '</div>' +
									'</th>';
                                                                
							//if (start.getDay() == options.dayOfWeekStartPrev) {
                                                //console.log("i="+i);       
                                                if(i%8==0){
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 7);
						}
						table += '</tbody></table>';

						calendar.html(table);

						mounth_picker.find('.myxdsoft_label span').eq(1).text(_myxdsoft_datetime.currentTime.getFullYear());

						// generate timebox
						time = '';
						h = '';
						m = '';
//						line_time = function line_time(h, m) {
//							var now = _myxdsoft_datetime.now(), optionDateTime, current_time;
//							now.setHours(h);
//							h = parseInt(now.getHours(), 10);
//							now.setMinutes(m);
//							m = parseInt(now.getMinutes(), 10);
//							optionDateTime = new Date(_myxdsoft_datetime.currentTime);
//							optionDateTime.setHours(h);
//							optionDateTime.setMinutes(m);
//							classes = [];
//							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _myxdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _myxdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
//								classes.push('myxdsoft_disabled');
//							}
//
//							current_time = new Date(_myxdsoft_datetime.currentTime);
//							current_time.setHours(parseInt(_myxdsoft_datetime.currentTime.getHours(), 10));
//							current_time.setMinutes(Math[options.roundTime](_myxdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
//
//							if ((options.initTime || options.defaultSelect || dateweekpicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && (options.step > 59 || current_time.getMinutes() === parseInt(m, 10))) {
//								if (options.defaultSelect || dateweekpicker.data('changed')) {
//									classes.push('myxdsoft_current');
//								} else if (options.initTime) {
//									classes.push('myxdsoft_init_time');
//								}
//							}
//							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
//								classes.push('myxdsoft_today');
//							}
//							time += '<div class="myxdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + now.dateFormat(options.formatTime) + '</div>';
//						};
//
//						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
//							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
//								for (j = 0; j < 60; j += options.step) {
//									h = (i < 10 ? '0' : '') + i;
//									m = (j < 10 ? '0' : '') + j;
//									line_time(h, m);
//								}
//							}
//						} else {
//							for (i = 0; i < options.allowTimes.length; i += 1) {
//								h = _myxdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
//								m = _myxdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
//								line_time(h, m);
//							}
//						}

//						timebox.html(time);

						opt = '';
						i = 0;

						for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
							opt += '<div class="myxdsoft_option ' + (_myxdsoft_datetime.currentTime.getFullYear() === i ? 'myxdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
						
                                            }       
						yearselect.children().eq(0).html(opt);

//						for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
//							opt += '<div class="myxdsoft_option ' + (_myxdsoft_datetime.currentTime.getMonth() === i ? 'myxdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[options.lang].months[i] + '</div>';
//						}
						//monthselect.children().eq(0).html(opt);
						$(dateweekpicker)
							.trigger('generate.myxdsoft');
					}, 10);
					event.stopPropagation();
				})
                                
//				.on('afterOpen.myxdsoft', function () {
//					if (options.timepicker) {
//						var classType, pheight, height, top;
//						if (timebox.find('.myxdsoft_current').length) {
//							classType = '.myxdsoft_current';
//						} else if (timebox.find('.myxdsoft_init_time').length) {
//							classType = '.myxdsoft_init_time';
//						}
//						if (classType) {
//							pheight = timeboxparent[0].clientHeight;
//							height = timebox[0].offsetHeight;
//							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
//							if ((height - pheight) < top) {
//								top = height - pheight;
//							}
//							timeboxparent.trigger('scroll_element.myxdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
//						} else {
//							timeboxparent.trigger('scroll_element.myxdsoft_scroller', [0]);
//						}
//					}
//				});

			timerclick = 0;
                        
                        
                        
                            calendar
				.on('click.myxdsoft', 'th#idWeeks', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _myxdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_myxdsoft_datetime.currentTime = _myxdsoft_datetime.now();
						currentTime = _myxdsoft_datetime.currentTime;
					}

//					if ($this.hasClass('myxdsoft_disabled')) {
//						return false;
//					}

					
                                        var    yy = $this.data('year');
                                        var    mm = $this.data('month');
                                       var    dd  =  $this.data('date');
                                        
                                        
                                        var   ww  =  $this.data('week');
                                        
                                      //  var    ww = _myxdsoft_datetime.getWeekOfYear(new Date(yy,mm-1,dd));
                                        
                                        
                                      //  currentTime.setDate(1);
					currentTime.setFullYear(yy);
					currentTime.setMonth(mm);
					currentTime.setDate(dd);
                                        
                                       console.log("Week = "+ww+" "+dd+"/"+mm+"/"+yy);
                                       
                                       
                                    dateweekpicker.trigger('select.myxdsoft', [currentTime]);

					input.val(_myxdsoft_datetime.str());
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === 0 && !options.timepicker))) && !options.inline) {
						dateweekpicker.trigger('close.myxdsoft');
					}

					if (options.myonSelectDate &&	$.isFunction(options.myonSelectDate)) {
						options.myonSelectDate.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'), xdevent);
					}


                                       dateweekpicker.data('changed', true);
					dateweekpicker.trigger('xchange.myxdsoft');
					dateweekpicker.trigger('changedatetime.myxdsoft');
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});


                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
			calendar
				.on('click.myxdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _myxdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_myxdsoft_datetime.currentTime = _myxdsoft_datetime.now();
						currentTime = _myxdsoft_datetime.currentTime;
					}

					if ($this.hasClass('myxdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					dateweekpicker.trigger('select.myxdsoft', [currentTime]);

					input.val(_myxdsoft_datetime.str());
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === 0 && !options.timepicker))) && !options.inline) {
						dateweekpicker.trigger('close.myxdsoft');
					}

					if (options.myonSelectDate &&	$.isFunction(options.myonSelectDate)) {
						options.myonSelectDate.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'), xdevent);
					}

					dateweekpicker.data('changed', true);
					dateweekpicker.trigger('xchange.myxdsoft');
					dateweekpicker.trigger('changedatetime.myxdsoft');
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

                    







			timebox
				.on('click.myxdsoft', 'div', function (xdevent) {
					xdevent.stopPropagation();
					var $this = $(this),
						currentTime = _myxdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_myxdsoft_datetime.currentTime = _myxdsoft_datetime.now();
						currentTime = _myxdsoft_datetime.currentTime;
					}

					if ($this.hasClass('myxdsoft_disabled')) {
						return false;
					}
					currentTime.setHours($this.data('hour'));
					currentTime.setMinutes($this.data('minute'));
					dateweekpicker.trigger('select.myxdsoft', [currentTime]);

					dateweekpicker.data('input').val(_myxdsoft_datetime.str());

                    if (options.inline !== true && options.closeOnTimeSelect === true) {
                        dateweekpicker.trigger('close.myxdsoft');
                    }

					if (options.myonSelectTime && $.isFunction(options.myonSelectTime)) {
						options.myonSelectTime.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'), xdevent);
					}
					dateweekpicker.data('changed', true);
					dateweekpicker.trigger('xchange.myxdsoft');
					dateweekpicker.trigger('changedatetime.myxdsoft');
				});


//			datepicker
//				.on('mousewheel.myxdsoft', function (event) {
//					if (!options.scrollMonth) {
//						return true;
//					}
//					if (event.deltaY < 0) {
//						_myxdsoft_datetime.nextMonth();
//					} else {
//						_myxdsoft_datetime.prevMonth();
//					}
//					return false;
//				});

//			input
//				.on('mousewheel.myxdsoft', function (event) {
//					if (!options.scrollInput) {
//						return true;
//					}
//					if (!options.datepicker && options.timepicker) {
//						current_time_index = timebox.find('.myxdsoft_current').length ? timebox.find('.myxdsoft_current').eq(0).index() : 0;
//						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
//							current_time_index += event.deltaY;
//						}
//						if (timebox.children().eq(current_time_index).length) {
//							timebox.children().eq(current_time_index).trigger('mousedown');
//						}
//						return false;
//					}
//					if (options.datepicker && !options.timepicker) {
//						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
//						if (input.val) {
//							input.val(_myxdsoft_datetime.str());
//						}
//						dateweekpicker.trigger('changedatetime.myxdsoft');
//						return false;
//					}
//				});

			dateweekpicker
				.on('changedatetime.myxdsoft', function (event) {
					if (options.myonChangeDateTime && $.isFunction(options.myonChangeDateTime)) {
						var $input = dateweekpicker.data('input');
						options.myonChangeDateTime.call(dateweekpicker, _myxdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.myxdsoft', function () {
					if (options.myonGenerate && $.isFunction(options.myonGenerate)) {
						options.myonGenerate.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'));
					}
					if (triggerAfterOpen) {
						dateweekpicker.trigger('afterOpen.myxdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.myxdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			setPos = function () {
				var offset = dateweekpicker.data('input').offset(), top = offset.top + dateweekpicker.data('input')[0].offsetHeight - 1, left = offset.left, position = "absolute";
				if (options.fixed) {
					top -= $(window).scrollTop();
					left -= $(window).scrollLeft();
					position = "fixed";
				} else {
					if (top + dateweekpicker[0].offsetHeight > $(window).height() + $(window).scrollTop()) {
						top = offset.top - dateweekpicker[0].offsetHeight + 1;
					}
					if (top < 0) {
						top = 0;
					}
					if (left + dateweekpicker[0].offsetWidth > $(window).width()) {
						left = $(window).width() - dateweekpicker[0].offsetWidth;
					}
				}
				dateweekpicker.css({
					left: left,
					top: top,
					position: position
				});
			};
			dateweekpicker
				.on('open.myxdsoft', function (event) {
					var myonShow = true;
					if (options.myonShow && $.isFunction(options.myonShow)) {
						myonShow = options.myonShow.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'), event);
					}
					if (myonShow !== false) {
						dateweekpicker.show();
						setPos();
						$(window)
							.off('resize.myxdsoft', setPos)
							.on('resize.myxdsoft', setPos);

//						if (options.closeOnWithoutClick) {
//							$([document.body, window]).on('mousedown.myxdsoft', function arguments_callee6() {
//								dateweekpicker.trigger('close.myxdsoft');
//								$([document.body, window]).off('mousedown.myxdsoft', arguments_callee6);
//							});
//						}
					}
				})
				.on('close.myxdsoft', function (event) {
					var myonClose = true;
					
                                        mounth_picker
						.find('.myxdsoft_year')
							.find('.myxdsoft_select')
								.hide();
                                                        
					if (options.myonClose && $.isFunction(options.myonClose)) {
						myonClose = options.myonClose.call(dateweekpicker, _myxdsoft_datetime.currentTime, dateweekpicker.data('input'), event);
					}
					if (myonClose !== false && !options.opened && !options.inline) {
						dateweekpicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.myxdsoft', function (event) {
					if (dateweekpicker.is(':visible')) {
						dateweekpicker.trigger('close.myxdsoft');
					} else {
						dateweekpicker.trigger('open.myxdsoft');
					}
				})
				.data('input', input);

			timer = 0;
			timer1 = 0;

			dateweekpicker.data('myxdsoft_datetime', _myxdsoft_datetime);
			dateweekpicker.setOptions(options);

			function getmyCurrentValue() {
				var ct = false, time;

				if (options.startDate) {
					ct = _myxdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _myxdsoft_datetime.strToDateTime(ct);
					} else if (options.defaultDate) {
						ct = _myxdsoft_datetime.strToDateTime(options.defaultDate);
						if (options.defaultTime) {
							time = _myxdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _myxdsoft_datetime.isValidDate(ct)) {
					dateweekpicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			_myxdsoft_datetime.setCurrentTime(getmyCurrentValue());

			input
				.data('myxdsoft_datetimepicker', dateweekpicker)
//				.on('open.myxdsoft focusin.myxdsoft mousedown.myxdsoft', function (event) {
//					if (input.is(':disabled') || (input.data('myxdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
//						return;
//					}
//					clearTimeout(timer);
//					timer = setTimeout(function () {
//						if (input.is(':disabled')) {
//							return;
//						}
//
//						triggerAfterOpen = true;
//						_myxdsoft_datetime.setCurrentTime(getmyCurrentValue());
//
//						dateweekpicker.trigger('open.myxdsoft');
//					}, 100);
//				})
//				
                            .on('keydown.myxdsoft', function (event) {
					var val = this.value, elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible");
						dateweekpicker.trigger('close.myxdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						dateweekpicker.trigger('close.myxdsoft');
						return true;
					}
				});
		};
		destroyDateTimePicker = function (input) {
			var dateweekpicker = input.data('myxdsoft_datetimepicker');
			if (dateweekpicker) {
				dateweekpicker.data('myxdsoft_datetime', null);
				dateweekpicker.remove();
				input
					.data('myxdsoft_datetimepicker', null)
					.off('.myxdsoft');
				$(window).off('resize.myxdsoft');
//				$([window, document.body]).off('mousedown.myxdsoft');
//				if (input.unmousewheel) {
//					input.unmousewheel();
//				}
			}
		};
		$(document)
			.off('keydown.myxdsoftctrl keyup.myxdsoftctrl')
			.on('keydown.myxdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
				}
			})
			.on('keyup.myxdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
				}
			});
		return this.each(function () {
			var dateweekpicker = $(this).data('myxdsoft_datetimepicker'), $input;
			if (dateweekpicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
					case 'show':
						$(this).select().focus();
						dateweekpicker.trigger('open.myxdsoft');
						break;
					case 'hide':
						dateweekpicker.trigger('close.myxdsoft');
						break;
					case 'toggle':
						dateweekpicker.trigger('toggle.myxdsoft');
						break;
					case 'destroy':
						destroyDateTimePicker($(this));
						break;
					case 'reset':
						this.value = this.defaultValue;
						if (!this.value || !dateweekpicker.data('myxdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format))) {
							dateweekpicker.data('changed', false);
						}
						dateweekpicker.data('myxdsoft_datetime').setCurrentTime(this.value);
						break;
					case 'validate':
						$input = dateweekpicker.data('input');
						$input.trigger('blur.myxdsoft');
						break;
					}
				} else {
					dateweekpicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});
	};
	$.fn.dateweekpicker.defaults = default_options;
}(jQuery));

function HighlightedDate(date, desc, style) {
	"use strict";
	this.date = date;
	this.desc = desc;
	this.style = style;
}

(function () {

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

// Parse and Format Library
//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */
Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(b){if(b=="unixtime"){return parseInt(this.getTime()/1000);}if(Date.formatFunctions[b]==null){Date.createNewFormat(b);}var a=Date.formatFunctions[b];return this[a]();};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var codePrefix="Date.prototype."+funcName+" = function() {return ";var code="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;code+="'"+String.escape(ch)+"' + ";}else{code+=Date.getFormatCode(ch);}}}if(code.length==0){code="\"\"";}else{code=code.substring(0,code.length-3);}eval(codePrefix+code+";}");};Date.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + ";}};Date.parseDate=function(a,c){if(c=="unixtime"){return new Date(!isNaN(parseInt(a))?parseInt(a)*1000:0);}if(Date.parseFunctions[c]==null){Date.createParser(c);}var b=Date.parseFunctions[c];return Date[b](a);};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;regex+=String.escape(ch);}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c;}}}}code+="if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$",'i');eval(code);};Date.formatCodeToRegex=function(b,a){switch(b){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:1,c:"z = parseInt(results["+a+"], 10);\n",s:"(\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+a+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+a+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+a+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+a+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+a+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(b)};}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+String.leftPad(Math.abs(this.getTimezoneOffset())%60,2,"0");};Date.prototype.getDayOfYear=function(){var a=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=Date.daysInMonth[b];}return a+this.getDate();};Date.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);return String.leftPad(Math.ceil((b-c)/7)+1,2,"0");};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)));};Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a;};Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a;};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()];};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1");};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" ";}while(a.length<b){a=c+a;}return a;};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};
}());
