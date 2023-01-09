class Histogram{
    constructor(height, width, margin, nrBins, domain, domEl) {
        this.height = height;
        this.width = width;
        this.domain = domain;
        this.domEl = domEl;
        this.nrBins = nrBins;

        // X axis
        const x = d3.scaleLinear()
            .domain(this.domain)
            .range([margin.left, width - margin.right]);

        //chart size and margin
        this.svg = domEl
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        let initial = [];
        for(let i = 0; i < nrBins; i++){
            initial.push(1);
        }

        let bins = d3.bin().thresholds(nrBins)(initial);

        // append the bar rectangles to the svg element
        this.histogramChart = this.svg.append("g") //group svg
            .selectAll("rect")
            .data(bins)
            .enter().append("rect");

        // slider
        let sliderMargin = ({top: 0, right: 2, bottom: 0, left: 2});
        this.sliderWidth = this.width / this.nrBins + sliderMargin.left + sliderMargin.right;
        this.currX = 0;
        this.sliderX = 0;


        let drag = d3.drag()
            .on("start", event => this.#dragStart(event))
            .on("drag", event => this.#drag(event))
            .on("stop", event => this.#dragStop(event));

        this.slider = this.svg.append("rect")
            .attr("height", this.height + sliderMargin.top + sliderMargin.bottom)
            .attr("width", this.sliderWidth)
            .attr("x", -sliderMargin.left)
            .attr("y", -sliderMargin.top)
            .attr('stroke-width', '5')
            .attr('stroke', 'black')
            .attr("fill", "white")
            .attr("fill-opacity", 0.5)
            .call(drag);


    }

    #dragStart(event){
        this.slider.attr("stroke", "white");
        this.currX = event.x;
    }
    #dragStop(){
        this.slider.attr("stroke", "black");
    }

    #drag(event){
        let xin = Math.min(Math.max(event.x, 0), this.width - this.sliderWidth);
        let dx = xin - this.currX;
        this.currX = xin;
        this.sliderX += dx;
        this.slider.attr("x", this.sliderX);
    }

    setData(data, scale){
        let that = this;
        let bins = d3.bin()
            .domain(this.domain)
            .thresholds(this.numBins)(data);

        this.y = d3.scalePow()
            .exponent(exp)
            .domain(valueRange).nice()
            .range(this.yRange);

        var y = d3.scalePow()
            .exponent(scale);

        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

        this.histogram.data(bins)
            .join("rect")
            .transition().duration(500)
            .attr("x", d => that.x(d.x0) + 1)
            .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
            .attr("y", d => (that.y(0) - that.y(max)) / 2 - len(d)/2)
            .attr("height", d => len(d))
            .attr("fill", d => color(d.length));

        this.histogram.on("click", function(event){
            this.sliderX = event.x - this.sliderWidth / 2;
            this.slider.attr("stroke", "black");
            this.slider.attr("x", this.sliderX);
        })

    }
}