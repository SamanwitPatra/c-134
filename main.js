img="";
status="";
objects =[];
alarm ="";

function preload(){
    load = emergency_alert.mp3
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('Cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting objects";
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : Baby Found";
document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        alarm.stop("emergency_alert");
        }
    }
    else {
    document.getElementById("status").innerHTML = "Status : Baby not detected";
    alarm.play("emergency_alert");
}
 if(status < 0){
    document.getElementById("status").innerHTML = "Status : Baby not detected";
    alarm.play("emergency_alert");
}
 }
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

