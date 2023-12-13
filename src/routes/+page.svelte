<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { nodeData } from "./data.js";

    onMount(createSVG() );
        console.log(nodeData);

        // Colors
        const colors = ["#011627", "#FDE74C", "#FF3366", "#2EC4B6"];
        const color = d3.scaleOrdinal(colors);


        function createSVG () {
    
        // creating svg with dynamic dimensions
        // Colors
        const width = window.innerWidth;
        const height = window.innerHeight;

        // @ts-ignore
        const svg = d3
            .select("svg")
            .attr("width", width) // svg
            .attr("height", height) // svg
            .append("g")
            .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")",
            ); // center sunburst
        }


        // Compute the layout
        const root = d3
            .hierarchy(nodeData)
            .sum(function (d) {
                // @ts-ignore
                return d.size;
            }) // Prepare the root node
            .sort(function (a, b) {
                // @ts-ignore
                return b.value - a.value;
            }); // sort the slices
        const radius = Math.min(width, height) / 2.3; // radius of sunburst
        const partition = d3.partition().size([2 * Math.PI, radius]); // Structure data over a full circle, 2pi radians
        partition(root);
        console.log(root);

        // Structure the arcs
        const arc = d3
            .arc()
            //.startAngle(function (d) { return d.x0 })
            //.endAngle(function (d) { return d.x1 })
            .startAngle(function (d) {
                // @ts-ignore
                d.x0s = d.x0;
                // @ts-ignore
                return d.x0;
            })
            .endAngle(function (d) {
                // @ts-ignore
                d.x1s = d.x1;
                // @ts-ignore
                return d.x1;
            })
            .innerRadius(function (d) {
                // @ts-ignore
                return d.y0 + 20;
            })
            .outerRadius(function (d) {
                // @ts-ignore
                return d.y1 + 20;
            });

        // Data join the arcs
        // @ts-ignore
        const slice = d3
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("class", "node"); //another g to group path and text
        
        slice.append("path")
            .attr("display", function (d) {
                return d.depth ? null : "none";
            }) // hide parent
            // @ts-ignore
            .attr("d", arc)
            .style("stroke", colors[0])
            .style("stroke-width", "5px")
            // @ts-ignore
            .style("fill", function (d) {
                return color((d.children ? d : d.parent).data.name);
            })
            .attr("opacity", 0.8);
    
</script>

<svg></svg>
