function togglePause()
{
    if (!isPaused)
    {
        isPaused = true;
    } else if (isPaused)
    {
       isPaused= false;
       animate();
    }

}

// window.addEventListener('keydown', function (e) {;
//     if (e.key === ' ')
//     {
        
//     }
//     });

function animate()
{
    
    c1.clearRect(0, 0, canvas.width, canvas.height);
    c2.clearRect(0, 0, canvas.width, canvas.height);
    c3.clearRect(0, 0, canvas.width, canvas.height);
    c4.clearRect(0, 0, canvas.width, canvas.height);
    c5.clearRect(0, 0, canvas.width, canvas.height);
    c1.fillStyle = '#a87d3d';
    c1.fillRect(0,0,600,78);
    c1.fillStyle = '#292929';
    c1.fillRect(0,246,600,600);
    c1.drawImage(water, 0, 8, 387, 130, 0, 79, 600, 200);
    c1.drawImage(road, 0, 0, 1280, 720, 0, 245, 600, 260);
    frogger.update();    
    frogger.draw();
    frame++;
    handleObstacles();
    handleScoreBoard();
    if (isPaused)
    {
        c5.fillStyle = 'white';
        c5.fillRect(7, 30, 7,20);
        c5.fillRect(17, 30, 7,20);
        return;
    }
    if(gameOver){
        return;
    }
    requestAnimationFrame(animate);
}

animate();


window.addEventListener('keydown', function(e){
    keys = [];
    if(gameOver){
        { if(e.key === 'p')
            {gameOver = false;
                score = 0;
            animate();}
         else resetGame();
        }
            
    }
    else {
        switch(e.key)
        {
            case 'ArrowUp':
                if(!isPaused) jump_sound.play();
                keys[38] = true;
                frogger.jump();
                break;
            case 'ArrowDown':
                if(!isPaused) jump_sound.play();
                keys[40] = true;
                frogger.jump();
                break;
            case 'ArrowLeft':
                if(!isPaused) jump_sound.play();
                keys[37] = true;
                frogger.jump();
                break;
            case 'ArrowRight':
                if(!isPaused) jump_sound.play();
                keys[39] = true;
                frogger.jump();
                break;
            case ' ':
                togglePause();
                break;
        
        }
}

})

window.addEventListener('keyup', function(e){
    frogger.moving = false;
    frogger.frameX=0;
    
    switch(e.key)
    {
        case 'ArrowUp':
            delete keys[38]
            break;
        case 'ArrowDown':
            delete keys[40];
            break;
        case 'ArrowLeft':
            delete keys[37];
            break;
        case 'ArrowRight':
            delete keys[39];
            break;
    }

})

function scoring(){
    score_sound.play();
    score +=10;
    if (score > high_value)
     {
        hs = score;
        localStorage.setItem('high', hs);
        high_value = JSON.parse(localStorage.getItem('high'));
     }
    gameSpeed += 0.1;
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;

}

function handleScoreBoard()
{
    c4.fillStyle = 'white';
    c4.strokeStyle = 'white';
    c4.font = '25px Verdana';
    c4.strokeText ('Score:', 440, 22);
    c4.fillText ('Score:', 440, 22);
    c4.font = '25px Verdana';
    c4.fillText(score, 523,23);
    c4.strokeStyle = 'black';
    c4.font = '25px Verdana';
    c4.strokeText ('Game Speed:', 5, 22);
    c4.fillText ('Game Speed:', 5, 22);
    c4.fillText(gameSpeed.toFixed(1), 180,23);
    c4.strokeText ('High Score:', 5, 590);
    c4.fillText ('High Score:', 5, 590);
    c4.strokeText (high_value, 160, 591);
    c4.fillText (high_value, 160, 591);
}

function collisionDetect (rect1, rect2){
    if (rect1.x >= rect2.x + rect2.width || 
        rect1.x + rect1.width <= rect2.x ||
        rect1.y >= rect2.y + rect2.height ||
        rect1.y + rect1.height <= rect2.y){
            return false;
        }

    else return true;

}

function resetGame()
{
    //frogger.draw();
    gameOver = true;
    c5.fillStyle = '#a87d3d';
    c5.fillRect(0,0,600,78);
    c5.fillStyle = '#024230'
    c5.fillStyle='white';
    c5.font = '30px Verdana';
    c5.fillText('GAME OVER!', 210,30);
    c5.font = '20px Verdana';
    c5.fillText('Press \'P\' to restart the game\t\t\tScore:', 100,60);
    c5.fillText(score, 480,60);

    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
    gameSpeed = 1;
    
    frogger.frameX =0;
    frogger.frameY =0;
}
