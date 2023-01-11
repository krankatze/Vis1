class Histogram{
    bar;
    constructor(width, height) {
        this.height = height;
        this.width = width;
    }

    createHistogram(voxels) {
        d3.select('svg').remove();
        const volumeVoxels =  voxels;
        // Compute bins.
        const bins = d3.bin().thresholds(40)(volumeVoxels);

        this.xDomain = [bins[0].x0, bins[bins.length - 1].x1];
        this.yDomain = [0, d3.max(bins, d => d.length)];

        // X axis
        this.x = d3.scaleLinear()
            .domain(this.xDomain)
            .range([0, this.width - 50]);

        // Y axis
        this.y = d3.scalePow()
            .exponent(0.3)
            .domain(this.yDomain)
            .range([this.height, 0]);

        //chart size and margin
        this.bar = d3.select("#histogram")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        this.bar.append("g")
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => this.x(d.x0) + 1)
            .attr("y", d => this.height)
            .attr("height", d => 0)
            .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
            .attr("fill", "white");

        this.bar.selectAll("rect")
            .transition()
            .duration(2000)
            .attr("y", d => this.y(d.length))
            .attr("height", d => this.height - this.y(d.length))
            .attr("fill", "white");


    }

     makeHist(values) {

        // modify domains of axes, create histogram

        // bind data
        var rect = svg.selectAll('rect')
            .data(histogram);

        // add new elements
        rect.enter().append('rect');

        // update existing elements
        rect.transition()
            .duration(3000)
            .attr('transform', '...');

        // remove old elements
        rect.exit().remove();

    }


}