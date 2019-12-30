function chartUpdate(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","../json/chart.json",true);
    xhttp.send("");
    xhttp.onload = chartData;
}
function chartData(){
    var sum = 0;
    var response1 = JSON.parse(this.responseText);
    var options = {
        fullWidth: true,
        width: 900,
        height: 350, 
        chartPadding:{
            right: 50
        },
        axisY: {
            onlyInteger: true,
            offset: 20,
            labelOffset: {
                x: -5,
                y: 8
            }
        },
        axisX: {
            labelOffset: {
                x: -15,
                y: 5
            }
        },
        low: 0,
        high: 50
    };
    var category = document.querySelector('span.categories');
    var week = document.querySelector('div#reportrange');
    var values = '';
    if(category.innerText == "Working On"){
        if(week.innerText == "23 Dec - 29 Dec"){
            values = response1.chartDetails.week1[0];
            var chart = new Chartist.Line('.ct-chart', values ,options );    
        }
        else{
            values = response1.chartDetails.week2[0];
            var chart = new Chartist.Line('.ct-chart', values ,options );    
        }
    }
    else if(category.innerText == "Requested"){
        if(week.innerText == "23 Dec - 29 Dec"){
            values = response1.chartDetails.week1[1];
            var chart = new Chartist.Line('.ct-chart', values ,options );    
        }
        else{
            values = response1.chartDetails.week2[1];
            var chart = new Chartist.Line('.ct-chart', values ,options );    
        }
    }
    else if(category.innerText == "Completed"){
        if(week.innerText == "23 Dec - 29 Dec"){
            values = response1.chartDetails.week1[2];
            for(var i =0 ; i<values.series[0].length;i++){
                sum += values.series[0][i];
            }
            document.querySelector('.total-peers').innerText = `${sum} peers`;
            document.querySelector('.total-min').innerText = `${sum*20} minutes`;
            document.querySelector('.total-points').innerText = `${sum*13} points`;
            var chart = new Chartist.Line('.ct-chart', values ,options );
        }
        else{
            values = response1.chartDetails.week2[2];
            for(var i =0 ; i<values.series[0].length;i++){
                sum += values.series[0][i];
            }
            document.querySelector('.total-peers').innerText = `${sum} peers`;
            document.querySelector('.total-min').innerText = `${sum*20} minutes`;
            document.querySelector('.total-points').innerText = `${sum*13} points`;
            var chart = new Chartist.Line('.ct-chart', values ,options );    
        }
    }
    chart.on('created', function(bar) {
        $('.ct-point').on('mouseover', function() {
            $('#tooltip').css('display','block');
            $('#tooltip').html( $(this).attr('ct:value') + '<b> Peers</b><div class="triangle-down"></div>');
            var left = '';
            var top = '';
            left = $(this).attr("x2");
            top = $(this).attr("y2");
            $('#tooltip').css('top',top+'px');
            $('#tooltip').css('left',left+'px');
        });
    
        $('.ct-point').on('mouseout', function() {
        $('#tooltip').css('display','none');
        });
    });

    var seq = 0,
    delays = 40,
    durations = 300;

    chart.on('created', function() {
    seq = 0;
    });

    // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    chart.on('draw', function(data) {
    seq++;

    if(data.type === 'line') {
        // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
        data.element.animate({
        opacity: {
            // The delay when we like to start the animation
            begin: seq * delays + 1000,
            // Duration of the animation
            dur: durations,
            // The value where the animation should start
            from: 0,
            // The value where it should end
            to: 1
        }
        });
    } else if(data.type === 'label' && data.axis === 'x') {
        data.element.animate({
        y: {
            begin: seq * delays,
            dur: durations,
            from: data.y + 100,
            to: data.y,
            // We can specify an easing function from Chartist.Svg.Easing
            easing: 'easeOutQuart'
        }
        });
    } else if(data.type === 'label' && data.axis === 'y') {
        data.element.animate({
        x: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 100,
            to: data.x,
            easing: 'easeOutQuart'
        }
        });
    } else if(data.type === 'point') {
        data.element.animate({
        x1: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart'
        },
        x2: {
            begin: seq * delays,
            dur: durations,
            from: data.x - 10,
            to: data.x,
            easing: 'easeOutQuart'
        },
        opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'easeOutQuart'
        }
        });
    } else if(data.type === 'grid') {
        // Using data.axis we get x or y which we can use to construct our animation definition objects
        var pos1Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '1'] - 30,
        to: data[data.axis.units.pos + '1'],
        easing: 'easeOutQuart'
        };

        var pos2Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '2'] - 100,
        to: data[data.axis.units.pos + '2'],
        easing: 'easeOutQuart'
        };

        var animations = {};
        animations[data.axis.units.pos + '1'] = pos1Animation;
        animations[data.axis.units.pos + '2'] = pos2Animation;
        animations['opacity'] = {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
        };

        data.element.animate(animations);
    }
    });

    // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
    chart.on('created', function() {
    if(window.__exampleAnimateTimeout) {
        clearTimeout(window.__exampleAnimateTimeout);
        window.__exampleAnimateTimeout = null;
    }
    // window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
    });
}
chartUpdate();