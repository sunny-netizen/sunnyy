<script>
    import * as d3 from "d3";
    import { data } from "./data.js";
    import { sunburst, computeTextRotation } from "./sunburst.js"
    sunburst()
    const width = 800; //window.innerWidth;
    const height = 800; //window.innerHeight;
    const colors = ["#011627", "#FDE74C", "#FF3366", "#2EC4B6"];
    const color = d3.scaleOrdinal(colors);

    // Compute the layout
    const root = d3
        .hierarchy(data)
        .sum(function (d) {
            return d.size;
        }) // Prepare the root node
        .sort(function (a, b) {
            return b.value - a.value;
        }); // sort the slices
    const radius = Math.min(width, height) / 2.3; // radius of sunburst
    const partition = d3.partition().size([2 * Math.PI, radius]); // Structure data over a full circle, 2pi radians
    partition(root);
    const leafs = root.descendants();
    console.log(leafs[6].data.image)

    // Structure the arcs
    const arc = d3
        .arc()
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

    //console.log(arc.centroid(leafs[1])[1]);
    //console.log(computeTextRotation(leafs[1]));


    let filling = (leaf, i) => {return color((leaf.children ? leaf : leaf.parent).data.name)}

    function mouseEnter(leaf, i) {
		filling = (leaf, i) => {return "url(#image"+i+")"}
	}
	function mouseLeave(leaf, i) {
		filling = (leaf, i) => {return color((leaf.children ? leaf : leaf.parent).data.name)};
	}


</script>

<div id="container">
    
    <svg {width} {height} style="background-color: {colors[0]};">
        <g class="centering" transform="translate({width / 2}, {height / 2})">
            {#each leafs as leaf, i}
                <g class="slice">
                    <defs>
                        <pattern id="image{i}" patternUnits="userSpaceOnUse" height="80" width="80">
                            <image href="src/assets/{leaf.data.image}" height="80" width="80">
                        </pattern>
                      </defs>
                      <!--fill={color(
                            (leaf.children ? leaf : leaf.parent).data.name,
                        )}

                        "url(#image{i})"
                    https://stackoverflow.com/questions/3796025/fill-svg-path-element-with-a-background-image
                -->
                    <path
                        d={arc(leaf)}
                        stroke={colors[0]}
                        stroke-width="3"
                        opacity="0.77"
                        display={leaf.depth ? null : "none"}
                        fill={filling(leaf, i)}
                        on:mouseenter={() => {console.log("enter");
                        mouseEnter
                        }}
                        on:mouseleave={() => {console.log("exit");
                        mouseLeave
                        }}
                        on:click={() => {console.log("click")}}
                    >
                    </path>
                    <text
                        fill={color[0]} dx="-4%" dy="1%"
                        transform="translate({arc.centroid(leaf,)})rotate({computeTextRotation(leaf)})"
                    >{leaf.parent ? leaf.data.name : ""}
                    </text>
                </g>
            {/each}
            <g class="center">
            <text text-anchor="middle" fill={colors[1]}>Hi, I'm Sunny</text>
            <rect x='-5em' y='1.5em' width='10em' height='2em' fill={colors[1]}></rect>
            <text text-anchor="middle" y='2em' fill={colors[0]}>Contact me</text>
            </g>
        </g>
    </svg>
</div>
<div>
    <p>sunny.yun.zhao@gmail.com</p>
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Raleway");
    @import url("https://fonts.googleapis.com/css?family=Saira+Semi+Condensed");

    :root {
        --dark: #011627;
        --yellow: #fde74c;
        --magenta: #ff3366;
        --teal: #2ec4b6;
    }

    body {
        background-color: var(--dark);
    }

    text {
        font-family: "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-family: "Saira Semi Condensed";
        font-stretch: expanded;
        font-size: 150%;
        pointer-events: none;
        color: var(--dark);
    }
</style>
