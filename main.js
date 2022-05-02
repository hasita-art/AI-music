song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;


function preload(){
    song1 = loadSound("gogo.mp3");
    song2 = loadSound("134340.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video.createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftwristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(
        "rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 400, 400);

    fill("#703451");
    stroke("#703451");

    song1 = song1.isPlaying();

        if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1 == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Gogo";
        }
        }

    song2 = song2.isPlaying();

        if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2 == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "134340";
        }
        }
}
