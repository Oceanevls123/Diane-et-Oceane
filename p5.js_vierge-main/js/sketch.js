
let video;
let precision;
// let ascii = ['.','*','#','@']

let imgPrecedante;

let augmentation=0;

function setup() {
  colorMode(HSL)
  angleMode(DEGREES)
  createCanvas(windowWidth,windowHeight)
  video = createCapture(VIDEO)
  video.hide()
  imgPrecedante = video.get();
}
// function mousePressed(){
//   video.loadPixels()
//   let x = getPixel(mouseX,mouseY,video)
//   print(x)
// }


function draw() {
  background(242, 76, 39,0.05)
// tint(255,0,1200)
//  image(video,0,0)

let mouvement = mouvementDetect(video,imgPrecedante,10,54)
augmentation+= mouvement
print(augmentation)
augmentation = constrain (augmentation, 0, 30)
video.loadPixels()
let largeurVideo = video.width
let hauteurVideo = video.height

let precision = 4;

for (let x = 0; x <largeurVideo; x+=precision) {
for (let y = 0; y <hauteurVideo; y+=precision) {
let c = getPixel(x,y,video)
let r = c[0] 
let g = c[1]
let b = c[2]

  // noStroke()
  // fill(color(c))
  let aleatoire = random(2)
// fill(0,100)
let xConverti = map(x,0,largeurVideo,0,height)
let yConverti = map(y, 0, hauteurVideo, 0, height)

// let taille = map(r,0,255,ascii.length-1,0)
// taille =int(taille)

// fill(200,80,l)
//  square(xConverti,yConverti,20)
// textSize(17)
// text(ascii[taille],xConverti,yConverti)

// fill(20,augmentation,0)
// let taille= map(r,0,255,0,30)
// ellipse(xConverti(),yConverti,taille)


push()
 if(aleatoire>1){

let l = map(r,0,255,15,0.01)
 stroke((frameCount*7)%360, 81, 68)
 strokeWeight(l)
 noFill()
//  square(xConverti,yConverti,20)
 line(xConverti,yConverti,xConverti*2,yConverti)

}else{
  noStroke()
fill(242, 76, 39,0.05)
if(augmentation>5){
square(xConverti,yConverti,xConverti,yConverti)
}

}
pop()

// push()
// if(aleatoire>1){
// fill(325, 100, 71,50)
// ellipse(xConverti,yConverti,frameCount*0.5%10)
// }else{
// fill(174, 96, 56,50)
// square(xConverti,yConverti,frameCount*0.5%15)
// }
// pop()



}
}

// fill(299, 91, 54,0.37)
// noStroke()
// ellipse(width/2,height/2,augmentation)

imgPrecedante = video.get();

}


function getPixel(x, y, img) {
  let i = 4 * (y * img.width + x);
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}
function mouvementDetect(_cam,_previousFrame,threshold,vitesse){
    precisionAnalyse = 30
      _cam.loadPixels();//ajouter
  _previousFrame.loadPixels(); //ajouter
      let diffGlobale = 0;
    for (let y = 0; y < _cam.height; y += precisionAnalyse) {
    for (let x = 0; x < _cam.width; x += precisionAnalyse) {
     let pixel =  getPixel(x,y,_cam)
      let r1 = pixel[0];
      let g1 = pixel[1];
      let b1 = pixel[2];

    let pixel2 =  getPixel(x,y,_previousFrame)
      let r2 = pixel2[0];
      let g2 = pixel2[1];
      let b2 = pixel2[2];

      let diff = dist(r1, g1, b1, r2, g2, b2);

      if (diff > threshold) {
        diffGlobale += diff;
      }
    }
    
  }

  let aug = map(diffGlobale, 0, video.width * video.height/precisionAnalyse, -vitesse,vitesse);

 aug = constrain(aug,-vitesse,vitesse)
  return aug


}