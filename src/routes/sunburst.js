// https://denjn5.github.io/ 
// great explanations https://gist.github.com/denjn5/e1cdbbe586ac31747b4a304f8f86efa5
// zoomable https://observablehq.com/@d3/zoomable-sunburst
// widths https://stackoverflow.com/questions/4787527/how-to-find-the-width-of-a-div-using-vanilla-javascript 
// defs https://stackoverflow.com/questions/25881186/d3-fill-shape-with-image-using-pattern


export function sunburst() {
    const wwidth = 800;
    console.log(wwidth)
} 


// Function to rotate text
export function computeTextRotation(d) {
    const angle = ((d.x0 + d.x1) / Math.PI) * 90; // <-- 1

    // Avoid upside-down labels
    return angle < 90 || angle > 270 ? angle : angle + 180; // <--2 "labels aligned with slices"

    // Alternate label formatting
    //return (angle < 180) ? angle - 90 : angle + 90;  // <-- 3 "labels as spokes"
}


/*
import * as d3 from 'd3';
import { data } from './data.js';

export let width = 500  //window.innerWidth;
export let height = 500 //window.innerHeight;
export let root, leafs, arc;
export const colors =  ["#011627", "#FDE74C", "#FF3366", "#2EC4B6"]
export const color = d3.scaleOrdinal(colors)

export function sunburst() {
// Compute the layout
root = d3.hierarchy(data)
    .sum(function (d) { return d.size }) // Prepare the root node
    .sort(function (a, b) { return b.value - a.value; }); // sort the slices
const radius = Math.min(width, height) / 2.3; // radius of sunburst
const partition = d3.partition().size([2 * Math.PI, radius]); // Structure data over a full circle, 2pi radians
partition(root);
leafs = root.descendants()

// Structure the arcs
const arc = d3.arc()
    .startAngle(function (d) { d.x0s = d.x0; return d.x0; })
    .endAngle(function (d) { d.x1s = d.x1; return d.x1; })
    .innerRadius(function (d) { return d.y0 + 20 })
    .outerRadius(function (d) { return d.y1 + 20 });
}

*/
