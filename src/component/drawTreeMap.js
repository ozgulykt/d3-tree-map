import * as d3 from 'd3';

const drawTreeMap = (dataset, props) => {
    const width = 1300;
    const height = 520;
    const margin = 100;
    const innerWidth = width - 1.7 * margin;
    const innerHeight = height - 30;

    const colores_g = ["#3366cc", "#a8614f", "#de9ed6", "#204122", "#967096", "#cedb9c", "#a52751", "#6b6ecf", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#637939", "#5574a6", "#3b3eac"];

    const tooltip = d3
        .select(".treemap")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

    const data = dataset[2];

    const svg = d3.select(".treemap")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const gTitle = svg.append("g")
        .attr("transform", "translate(" + width / 3 + ", " + margin / 2 + ")")
        .attr("text-anchor", "center");

    const title = gTitle.append("text")
        .attr("id", "title")
        .attr("font-size", "30")
        .text("Video Game Sales");

    const description = gTitle.append("text")
        .attr("id", "description")
        .attr("y", 20)
        .attr("font-size", "15")
        .text("Top 100 Most Sold Video Games Grouped by Platform");

    const keys = data.children.map(d => { return d.name });

    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(colores_g);

    const g = svg.append("g")
        .attr("transform", "translate(0, " + (margin) + ")");

    const gLegend = g.append("g")
        .attr("transform", "translate(0, 0");

    const legend = gLegend.append("g")
        .attr("id", "legend")
        .attr("width", 150)
        .attr("height", 380);

    legend.selectAll("rect")
        .data(color.domain())
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("fill", function (d, i) { return colores_g[i]; })
        .attr("x", 10)
        .attr("y", (d, i) => i * 20)
        .attr("height", 15)
        .attr("width", 15);

    legend.selectAll("text")
        .data(keys)
        .enter()
        .append("text")
        .attr("class", "legend-rect-text")
        .attr("x", 30)
        .attr("y", (d, i) => (i + 0.63) * 20)
        .text(d => d)
        .attr("height", 10)
        .attr("width", 15)
        .attr("font-size", "15px");

    const gMap = g.append("g")
        .attr("transform", "translate(130, 0");

    const root = d3.hierarchy(data).sum(d => d.value);

    const treemap = d3.treemap()
        .size([innerWidth, innerHeight])
        (root);

    const gTreeMap = gMap.selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x0 + 150}, ${d.y0})`);

    const tile = gTreeMap.append("rect")
        .attr("class", "tile")
        .attr("width", d => { return (d.x1 - d.x0) })
        .attr("height", d => { return (d.y1 - d.y0) })
        .attr("stroke", "black")
        .attr("fill", (d, i) => { return color(d.data.category) })
        .attr("data-name", d => { return d.data.name })
        .attr("data-category", d => { return d.data.category })
        .attr("data-value", d => { return d.data.value })
        .on("mouseover", function (d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0.7);
            tooltip
                .html(
                    "Name : " + d3.select(this).attr("data-name") + "<br/>" +
                    "Category : " + d3.select(this).attr("data-category") + "<br/>" +
                    "Value : " + d3.select(this).attr("data-value")
                )
                .style("left", d3.event.pageX + 20 + "px")
                .style("top", d3.event.pageY + 20 + "px");
        })
        .on("mouseout", (d) => {
            tooltip
                .transition()
                .duration(400)
                .style("opacity", 0);
        });

    gTreeMap.append("text")
        .selectAll("tspan")
        .data(d => d.data.name.split(/(?=\s[^0-9])/g))
        .enter()
        .append("tspan")
        .attr("class", "label")
        .attr("x", 2)
        .attr("y", (d, i) => 8 + i * 8)
        .text((d, i) => { return d })
        .attr("fill", "rgb(0, 0, 0)")
        .attr("font-size", "10px")
        .attr("stroke", "black");
}

export default drawTreeMap;