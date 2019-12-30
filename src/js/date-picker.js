$(function() {
	var start = moment().subtract(6, 'days');
	var end = moment();
	function cb(start, end) {
		$('#reportrange span').html(start.format('D MMM') + ' - ' + end.format('D MMM'));
		chartUpdate();
	}

	$('#reportrange').daterangepicker({
		startDate: start,
		endDate: end,
		opens: 'left',
		maxSpan: {
			days: 7
		},
		ranges: {
		'Present week': [moment().subtract(6, 'days'), moment()],
		'Last week': [moment().subtract(13, 'days'), moment().subtract(6, 'days')],
		// 'This Month': [moment().startOf('month'), moment().endOf('month')],
		// 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	}, cb);

	cb(start, end);
});