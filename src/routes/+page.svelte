<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { nodeData } from "./data.js";
    console.log(nodeData);

    // Colors
    export const colors = ["#011627", "#FDE74C", "#FF3366", "#2EC4B6"];
    export const color = d3.scaleOrdinal(colors);
    export let width, height;
    export let svg, arc, slice;

    // Code that interacts with the DOM or uses window
    onMount(() => {
        // creating svg with dynamic dimensions
        width = window.innerWidth;
        height = window.innerHeight;
        svg = d3
            .select("svg")
            .attr("width", width) // svg
            .attr("height", height) // svg
            .append("g") //
            .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")",
            ); // center sunburst

        // Compute the layout
        const root = d3
            .hierarchy(nodeData)
            .sum(function (d) {
                return d.size;
            }) // Prepare the root node
            .sort(function (a, b) {
                return b.value - a.value;
            }); // sort the slices
        const radius = Math.min(width, height) / 2.3; // radius of sunburst
        const partition = d3.partition().size([2 * Math.PI, radius]); // Structure data over a full circle, 2pi radians
        partition(root);

        // Structure the arcs
        arc = d3
            .arc()
            //.startAngle(function (d) { return d.x0 })
            //.endAngle(function (d) { return d.x1 })
            .startAngle(function (d) {
                d.x0s = d.x0;
                return d.x0;
            })
            .endAngle(function (d) {
                d.x1s = d.x1;
                return d.x1;
            })
            .innerRadius(function (d) {
                return d.y0 + 20;
            })
            .outerRadius(function (d) {
                return d.y1 + 20;
            });

        // Data join the arcs
        slice = svg
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("class", "node") //another g to group path and text
            .append("path")
            .attr("display", function (d) {
                return d.depth ? null : "none";
            }) // hide parent
            .attr("d", arc)
            .style("stroke", colors[0])
            .style("stroke-width", "3px")
            .style("fill", function (d) {
                return color((d.children ? d : d.parent).data.name);
            })
            .attr("opacity", 0.55);
    });
</script>

<svg></svg>
