class Frogger{

    constructor(){
        this.spriteWidth= 250;
        this.spriteHeight= 250;
        this.width= this.spriteWidth/5;
        this.height= this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }

    update()
    {
        
        // console.log('update');
        if(keys[38]){ //up
            this.frameY=0;
            if (this.moving === false){
                this.y -= grid;
                this.moving = true;
            }
        }

        if(keys[40]){ //down
            this.frameY=3;

            if (this.moving === false && this.y < canvas.height - this.height *2 ){
                this.y += grid;
                this.moving = true;
            }
        }

        if(keys[37]){ //left
            this.frameY=2; 
            if (this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
            }
        }

        if(keys[39]){ //right
            this.frameY=1;
            if (this.moving === false && this.x < canvas.width - this.width *2){
                this.x += grid;
                this.moving = true;
            }
        }

        if(this.y < 0)
        {
            scoring();
        }
    }

    draw(){
        // c3.fillStyle = 'green';
        // c3.fillRect(this.x, this.y, this.width, this.height);
        // c3.strokeRect(this.x, this.y, this.width, this.height);
        c3.drawImage(frog, this.frameX*this.spriteWidth, this.frameY*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-24, this.y-24, this.width*2, this.height*2);

    }

    jump()
    {
        if(this.moving === false) this.frameX = 1;
        else if (this.frameX ===1) this.frameY=0;
    }
}

const frogger = new Frogger();

class Obstacles{
    constructor(x, y, width, height, speed, type,lane){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.lane = lane;
    }

    draw(){

        // c1.fillrect(0,0,600, 200);

        if(this.type === 'turtle'){
            
            // c1.fillStyle = 'black';
            // c1.fillRect(this.x, this.y, this.width, this.height);
            c1.drawImage(turtle, 0, 0, 70, 70, this.x, this.y, this.width, this.height);
        }

        else if (this.type === 'log')
        {
            // c1.fillStyle = 'gold';
            //c1.fillRect(this.x, this.y, this.width, this.height);
            c1.drawImage(log_image, 0, 0, 1200, 1200, this.x-13, this.y-25, this.width*1.17, this.height*1.5);

        }
        else{
        // c1.fillStyle = 'black';
        // c1.fillRect(this.x, this.y, this.width, this.height);
        // c1.strokeRect(this.x, this.y, this.width, this.height);
            if (this.lane === 1 || this.lane ===3)
            {
                c1.drawImage(car3, 0, 0, 2400, 1190, this.x, this.y, this.width, this.height);

            }
            if (this.lane===2){
                c1.drawImage(car4, 0, 0, 3265, 1656, this.x, this.y, this.width, this.height);
             }
        
    }
    }

    update(){
        
        this.x += this.speed*gameSpeed;
        // this.speed *= gameSpeed;
        // this.x += this.speed;
        
        if (this.speed > 0) {
            if(this.x > canvas.width + this.width){
                    this.x = 0-this.width;
                }
        }
        if (this.speed < 0) {
            if(this.x < 0-this.width){
                    this.x = canvas.width + this.width;
                }
        }

    }

}

function addingObstacles()
{
    for ( let i=0; i<2; i++)
    {
        let x=i*400;
        carsArray.push(new Obstacles(x,canvas.height - (2*grid) - 20, grid*2 -10, grid, 1,'car' ,1));
    }

    for ( let i=0; i<2; i++)
    {
        let y=i*300;
        carsArray.push(new Obstacles(y,canvas.height - (3*grid) - 25, grid*2 -10, grid, -1.2,'car', 2 ));
    }

    for ( let i=0; i<2; i++)
    {
        let z=i*400;
        carsArray.push(new Obstacles(z,canvas.height - (4*grid) - 30, grid*2 -10, grid, 1.2,'car',3 ))
    }
    for ( let i=0; i<3; i++)
    {
        let a=i*300;
        logsArray.push(new Obstacles(a,canvas.height - (5*grid) - 35, grid*2 -10, grid, -1.4,'log',null ))
    }
    for ( let i=0; i<4; i++)
    {
        let a=i*190;
        logsArray.push(new Obstacles(a,canvas.height - (6*grid) - 40, grid, grid, 1,'turtle',null ))
    }

    

}

addingObstacles();

function handleObstacles()
{
    for (let i=0; i<carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
        
    }
    for (let i=0; i<logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
        
    }
    for (let i=0; i<carsArray.length; i++) {
        if (collisionDetect(frogger, carsArray[i])){
            c4.drawImage(collisions, 0, 100,100,100, frogger.x, frogger.y, 50,50);
            crash_sound.play();
            resetGame();
        }
    }

    if (frogger.y < 250 && frogger.y>80)
        { 
            isAlive = false;
            for (i=0; i<logsArray.length; i++)
            {
                
                if (collisionDetect(frogger, logsArray[i]))
                {
                    frogger.x+=(logsArray[i].speed * gameSpeed);
                    isAlive = true;
                    //console.log('collide');
                }  
            }
                
                if (!isAlive) { 
                    c4.drawImage(collisions, 0,0,100,100, frogger.x, frogger.y, 50,50);
                    //console.log('dead')
                    sink_sound.play();
                    resetGame();
                }
            }

            
    }