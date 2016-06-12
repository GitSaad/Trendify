app.directive('trendGraph', function () {
    return {
        restrict: 'E',
        scope: {
            val: '='
        },
        link: function (scope, element, attrs) {
            var width = parseInt($('#trendGraphContainer').css('width'));
            var height = parseInt($('#trendGraphContainer').css('height'));
            var padding = 60;

            var svgContainer = d3.select('#trendGraph').append('svg')
                .attr('id', 'graphSvg')
                .attr('width', '100%')
                .attr('height', '100%');

            var histogramArray = [];
            for (i = -100; i <= 100; i += 10) {
                histogramArray.push({
                    x: String(i),
                    y: 0
                });
            }

            scope.val.forEach(function(i) {
                var bucket = 0;
                if (i.sentiment >= 0) {
                    bucket = Math.floor(i.sentiment*10)*10;
                } else {
                    bucket = -Math.ceil(-i.sentiment*10)*10;
                }
                histogramArray.forEach(function(j) {
                    if (String(bucket) == j.x) {
                        j.y++;
                    }
                });
            });

            var xAxisScale = d3.scale.ordinal()
                .domain(histogramArray.map(function(i) { return i.x; }))
                .rangePoints([padding, width - padding]);

            var yAxisScale = d3.scale.linear()
                .domain([0, d3.max(histogramArray.map(function(i) { return i.y; }))])
                .range([height - padding, padding]);

            var xAxis = d3.svg.axis()
                .scale(xAxisScale);

            var yAxis = d3.svg.axis()
                .scale(yAxisScale)
                .orient('left');

            var xAxisGroup = svgContainer.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + (height - padding) + ')')
                .call(xAxis);

            var yAxisGroup = svgContainer.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + padding + ',0)')
                .call(yAxis);

            svgContainer.selectAll('rect')
                .data(histogramArray)
                .enter()
                .append('rect')
                .attr('class', 'graphDataRects')
                .attr('x', function(d) {
                    return xAxisScale(d.x) + 1;
                })
                .attr('y', function(d) {
                    console.log(height - yAxisScale(d.y), height, yAxisScale(d.y), d.y);
                    return yAxisScale(d.y);
                })
                .attr('width', function() {
                    return (width - 2*padding)/20 - 2;
                })
                .attr('height', function(d) {
                    return height - yAxisScale(d.y) - padding;
                })
                .attr('fill', function(d) {
                    if (d.x >= 0) {
                        return '#00FF00';
                    } else {
                        return '#FF0000';
                    }
                });
        }
    };
});