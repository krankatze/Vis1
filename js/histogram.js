class Histogram{
    constructor(width, height, volumeVoxels) {
        this.height = height;
        this.width = width;
        this.volumeVoxels = volumeVoxels
    }

    createHistogram() {
        // Compute bins.
        const bins = d3.bin().thresholds(40)(this.volumeVoxels);

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
        this.svg = d3.select("#histogram")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        this.svg.append("g")
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => this.x(d.x0) + 1)
            .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
            .attr("y", d => this.y(d.length))
            .attr("height", d => this.y(0) - this.y(d.length))
            .attr("fill", "white");
    }


}