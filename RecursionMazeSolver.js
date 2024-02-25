import solve from "./day1/MazeSolver.js";
const maze = [
    "########## ####################",
    "#      #       ####    ###   ##",
    "#      #   ###      ## ### # ##",
    "########   ######## ## ### # ##",
    "#      #            ##     # ##",
    "# ####     ################# ##",
    "# ############# ###          ##",
    "#d####       ## ### ###########",
    "#    #       ## ### ####      #",
    "#### #   a   ##d### ######### #",
    "####         ## ###           #",
    "############### ########## ####",
    "#                        # ####",
    "## ################ #### # ####",
    "##        ########  #### # ####",
    "######### #     #  ##### # ####",
    "######### ##  ### ###### # ####",
    "######### ##   ##   #### # ####",
    "########  ######### #### # ####",
    "#######             ####   ####",
    "######## ######################",
];
// const maze = [
//     "########## #",
//     "#        # #",
//     "#        # #",
//     "# ######## #",
//     "#          #",
//     "# ##########",
// ];
const startAndEnd = [];
startAndEnd.push({ x: maze[0].indexOf(' '), y: 0 }); //start
startAndEnd.push({ x: maze[maze.length - 1].indexOf(' '), y: maze.length - 1 }); //end
const mazeAnimation = solve(maze, ["#", "d"], startAndEnd[0], startAndEnd[1]);
function recursiveForLoop(i) {
    setTimeout(function () {
        console.clear();
        //console.log('hello'); //  your code here 
        for (let j = 0; j < mazeAnimation[i].length; ++j) {
            const tiled = mazeAnimation[i][j]
                .replaceAll(" ", "⬛")
                .replaceAll("#", "🧱")
                .replaceAll("a", "👸")
                .replaceAll("d", "🚪")
                .replaceAll(".", "⚪");
            console.log(tiled);
        }
        console.log("Time to solve: " + i / 10);
        if (i < mazeAnimation.length - 1)
            recursiveForLoop(++i); //  decrement i and call myLoop again if i > 0
    }, 100);
}
;
setTimeout(() => {
    console.log("Beginning the animation (lenght:" + mazeAnimation.length + ") " + maze.length);
    console.log("Example frame:");
    for (let j = 0; j < mazeAnimation[5].length; j++) {
        console.log(mazeAnimation[5][j]);
    }
}, 100);
setTimeout(() => recursiveForLoop(0), 1000);
/*
Recurion:

base case
1. its a wall
2. off the map
3. it is the end
4. i have seen this tile already
*/ 
