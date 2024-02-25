
const dir = [ //2d directions y,x <-!!
    [-1,0], //test up
    [1,0],  //test right
    [0,-1], //test down
    [0,1]   //test left
];
type Point = {
    x:number,
    y:number
}
let mazeAnimation: Array<string>[] = []; 
let tempMaze: Array<string>; 
function setCharAt(str:string,index:number,chr:string) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
function drawThat(curr:Point, maze: string[], char:string, path: Point[] = []){   
    if(mazeAnimation.length === 0)
        tempMaze = [...maze]; 
    
    let newMaze = [...tempMaze];

    const newMazeLine = setCharAt(newMaze[curr.y],curr.x,char);
    for (let i = 0; i < newMaze.length; i++) {
        if(curr.y==i){
            //console.log(newMazeLine);
            newMaze[i] = newMazeLine;
        }
    }
    
    for (let j = 0; j < path.length; j++) {
        tempMaze[path[j].y] = setCharAt(tempMaze[path[j].y],path[j].x,'.'); 
    }
    
    mazeAnimation.push(newMaze);
}

function walk(maze: string[], wall: string[], curr:Point, end:Point, seen : boolean[][], path: Point[]): boolean {
    //base case of the map starts
    if( curr.x < 0 || curr.x >= maze[0].length ||   //width of the maze can be taken from first row length
        curr.y < 0 || curr.y >= maze.length){       //height is maze's (arrays) length
        //console.log("Out of bounds!");
        return false; //i should not be here
    }

    //its a wall
    if(maze[curr.y][curr.x] == wall[0] || maze[curr.y][curr.x] == wall[1]){   //found a wall (#) from that spot 
        drawThat(curr,maze,'🟧');
        return false; // i should not be here eighter
    }

    //found the exit
    if(curr.x == end.x && curr.y == end.y){
        path.push(end)
        drawThat(curr,maze,'🏁');
        return true;
    }

    //seen tile
    if(seen[curr.y][curr.x]){
        drawThat(curr,maze,'🙂');
        return false; //i should not go here again
    }
    //base case of the map ends

    //3 recurse
    //pre
    seen[curr.y][curr.x] = true;
    path.push(curr);
    drawThat(curr,maze,'😊');
    

    //recurse
    //testing true from top,right,bottom and left
    for (let i = 0; i < dir.length; i++) {
        const [x,y]= dir[i];
        
        //recursive (call your self) function call
        //if returns true (end found) return home
        if( walk(maze,wall,{
                x:curr.x+x,
                y:curr.y+y,
            },end,seen,path)
        ){
            drawThat(curr,maze,'😎',path); //this goes back to beginning
            return true;
        }
    }

    //post
    path.pop(); //removes "wrong way" point from path

    drawThat(curr,maze,'⛔');
    return false;
}

//export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
export default function solve(maze: string[], wall: string[], start: Point, end: Point): any {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push( new Array(maze[0].length).fill(false) )
    }

    walk(maze,wall,start,end,seen,path);
    return mazeAnimation;
}