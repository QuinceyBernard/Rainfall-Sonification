var raindata; //declaring our raindata
var year = []; // array for the year variable
var winter = []; //array for the winter variable
var spring = [];
var summer = [];
var winter = [];
var innercirc = 150; //variable for the size of the inner circle
var outercirc = 1300 + innercirc; //variable for the size of the outer circle
var radius = outercirc/2; //variable that divides outercirc by two to get the "radius"
var  rainfallyear;
var winterrain; //variable for my specified data from the table
var springrain;
var summerrain;
var autumnrain;
var buttonwinter;
var buttonspring;
var buttonsummer;
var buttonautumn;
var buttonyear;
var w = 0;
var f = 0;
var tick = 0;
var winterShow = true;
var springShow = true;
var summerShow = true;
var autumnShow = true;
var yearShow = false;
var winterosc;
var springosc;
var summerosc;
var autumnosc;
var scaleArray = [60,62,64,67,71,72,74,77];               //creating an array for different notes on a scale value
var waveArray = ['sine','square','sawtooth','triangle'];  //creating an array for different tipes of wave for the oscillator

function preload(){
    raindata = loadTable("loadJSON.php","csv","header"); //preloading in my table of data
}

function setup() {
  createCanvas(1500,1500); //creating the canvas 
  angleMode(DEGREES); //setting the anglemode to degrees rather than radians

  frameRate(15);

  buttonwinter = createButton('WINTER');      //creating the buttons to filter my data displayed
  buttonwinter.position(1250,27.5);
  buttonwinter.style('background-color',color(140,173,167));
  buttonwinter.mousePressed(getWinter)

  buttonspring = createButton('SPRING');
  buttonspring.position(1250,47.5);
  buttonspring.style('background-color',color(163,177,138));
  buttonspring.mousePressed(getSpring)    //when button pressed it will run the getSpring function

  buttonsummer = createButton('SUMMER');
  buttonsummer.position(1250,67.5);
  buttonsummer.style('background-color',color(226,194,198));
  buttonsummer.mousePressed(getSummer)

  buttonautumn = createButton('AUTUMN');
  buttonautumn.position(1250,87.5);
  buttonautumn.style('background-color',color(142,68,61));
  buttonautumn.mousePressed(getAutumn)

  buttonyear = createButton('DISPLAY YEAR');
  buttonyear.position(1250,107.5);
  buttonyear.mousePressed(getYear);

  rainfallyear = raindata.getColumn('Year');
  winterrain = raindata.getColumn('Winter');    //grabbing the relevant column from our database
  springrain = raindata.getColumn('Spring');
  summerrain = raindata.getColumn('Summer');
  autumnrain = raindata.getColumn('Autumn');

 winterosc = new p5.Oscillator('sine');    //creates an oscillator that randomly picks a wave from the array earlier
 winterosc.start();                                                                   //starts the oscillator

 springosc = new p5.Oscillator('square');
 springosc.start();

 summerosc = new p5.Oscillator('sawtooth');
 summerosc.start();

 autumnosc = new p5.Oscillator('triangle');
 autumnosc.start();


}


function getWinter(){
    winterShow =!winterShow;                                                    //checks whether winterShow is true or false
}

function getSpring(){
  springShow = !springShow;
}

function getSummer(){
    summerShow = !summerShow;
}

function getAutumn(){
    autumnShow = !autumnShow;
}

function getYear(){
    yearShow = !yearShow;
}

function draw() {
    background(4,35,53);


                push();
                translate(750,750); //translating the canvas to be 0,0 at centre
                stroke(53,66,92);
                strokeWeight(1);
                fill(4,35,53);
                ellipse(0,0,innercirc); //drwaing an ellipse with radius innercirc defined earlier
                noFill();
                ellipse(0,0,(outercirc));   //drawing an ellipse with radius outercirc defined earlier

                fill(0);
                strokeWeight(1);
                x = (radius)*(sin([tick]));   //creates a line that moves around the circle at the speed of tick variable
                y = (radius)*(cos([tick]));
                line(0,0,x,y);
                tick +=0.25;

                if(tick >= 360){
                    tick = 0; //if tick is greater than or equal to 360 then reset it to 0
                }
                pop();

                push();
                translate(750,750); //translating the point of origin to the middle of the canvas

                    for(j=0; j<rainfallyear.length; j++){// a for loop to run through my rainfall table of data

                      
                        if(winterShow){
                            var winterlen = map(winterrain[j],56,611,0,725);      //mapping the winterrain array between certain values
                                var c1 = (winterlen)*(sin([w])); //variable to calculate the mapped length multiplied by the sine angle
                                var d1 = (winterlen)*(cos([w])); //variable to calculate the mapped length multiplied by the cosine angle
                                var c2 = (radius)*(sin([w]));
                                var d2 = (radius)*(cos([w]));
                                    stroke(140,173,167);
                                    strokeWeight(1);
                                    line(0,0,c1,d1);    //drawing a line with origin 0,0 and second point at c1,d1 our calculated mapped values
                                    noFill();
                                    stroke(140,173,167);
                                    strokeWeight(1);
                                    ellipse(c1,d1,2.5,2.5);//drawing an ellipse at the end of our mapped line to assist with visualisation
                                    var winternote = round(map(winterrain[j],56,611,0,7));
                                    var winterdecay = (map(springrain[j],56,611,0.1,0.7));
                                if (w == tick){
                                    var wintermusic = winterrain[j]
                                    winterenvelope = new p5.Envelope(); //creating a unique envelope for winter values
                                    winterenvelope.setADSR(0.001,winterdecay,0.05,0.9); //sets the attackTime, decayTime, sustainLevel, releaseTime
                                    note = winternote;  //pulls the rounded value for the note to run through the note array
                                    winterenvelope.setRange(0.5,0); //set volume range on the envelope
                                    winterosc.amp(winterenvelope); //map amplitude of envelope to the oscillator
                                    freqValue = midiToFreq(scaleArray[note]); // convert our MIDI note to a frequency value for the oscillator
                                    winterosc.freq(freqValue); //set the oscillator frequency
                                    winterenvelope.play(winterosc,0,0.1); //play the winterenvelope through the oscillator


                                }else{
              
                                }
                        }
                                w += 1;

                        if(springShow){
                            var springlen = map(springrain[j],56,611,0,725);3
                                var e1 = (springlen)*(sin([w]));
                                var f1 = (springlen)*(cos([w]));
                                var e2 = (radius)*(sin([w]));
                                var f2 = (radius)*(cos([w]));
                                    stroke(163,177,138);
                                    strokeWeight(1);
                                    line(0,0,e1,f1);    //drawing a line with origin 0,0 and second point at c1,d1 our calculated mapped values
                                    noFill();
                                    stroke(163,177,138);
                                    strokeWeight(1);
                                    ellipse(e1,f1,2.5,2.5);
                                    var springnote = round(map(springrain[j],56,611,0,7));
                                    var springdecay = (map(springrain[j],56,611,0.1,0.7));
                                      if (w == tick){
                                       var springmusic = springrain[j]
                                        springenvelope = new p5.Envelope();
                                        springenvelope.setADSR(0.001,springdecay,0.05,0.9);
                                        note = springnote;
                                        springenvelope.setRange(0.5,0);
                                        springosc.amp(springenvelope);
                                        freqValue = midiToFreq(scaleArray[note]);
                                        springosc.freq(freqValue);
                                        springenvelope.play(springosc,0,0.1);

                                }else{

                                }
                        }
                                    w += 1;

                            if(summerShow){
                            var summerlen = map(summerrain[j],56,611,0,725);
                                var g1 = (summerlen)*(sin([w]));
                                var h1 = (summerlen)*(cos([w]));
                                var g2 = (radius)*(sin([w]));
                                var h2 = (radius)*(cos([w]));
                                    stroke(226,194,198);
                                    strokeWeight(1);
                                    line(0,0,g1,h1);    //drawing a line with origin 0,0 and second point at c1,d1 our calculated mapped values
                                    noFill();
                                    stroke(226,194,198);
                                    strokeWeight(1);
                                    ellipse(g1,h1,2.5,2.5);
                                    var summernote = round(map(summerrain[j],56,611,0,7));
                                    var summerdecay = (map(springrain[j],56,611,0.1,0.7));
                                    if (w == tick){
                                       summerenvelope = new p5.Envelope();
                                        summerenvelope.setADSR(0.001,summerdecay,0.05,0.9);
                                        note = summernote;
                                        summerenvelope.setRange(0.5,0);
                                        summerosc.amp(summerenvelope);
                                        freqValue = midiToFreq(scaleArray[note]);
                                        summerosc.freq(freqValue);
                                        summerenvelope.play(summerosc,0,0.1);

                                    }else{

                                }
                            }
                                    w += 1;

                            if(autumnShow){
                            var autumnlen = map(autumnrain[j],56,611,0,725);
                                var i1 = (autumnlen)*(sin([w]));
                                var j1 = (autumnlen)*(cos([w]));
                                var i2 = (radius)*(sin([w]));
                                var j2 = (radius)*(cos([w]));
                                    stroke(142,68,61);
                                    strokeWeight(1);
                                    line(0,0,i1,j1);    //drawing a line with origin 0,0 and second point at c1,d1 our calculated mapped values
                                    noFill();
                                    stroke(142,68,61);
                                    strokeWeight(1);
                                    ellipse(i1,j1,2.5,2.5);
                                    var autumnnote = round(map(autumnrain[j],56,611,0,7));
                                    var autumndecay = (map(springrain[j],56,611,0.1,0.7));
                                      if (w == tick){
                                        autumnenvelope = new p5.Envelope();
                                        autumnenvelope.setADSR(0.001,autumndecay,0.05,0.9);
                                        note = autumnnote;
                                        autumnenvelope.setRange(0.5,0);
                                        autumnosc.amp(autumnenvelope);
                                        freqValue = midiToFreq(scaleArray[note]);
                                        autumnosc.freq(freqValue);
                                        autumnenvelope.play(autumnosc,0,0.1);

                                    }else{

                                }
                            }
                                    w += 1;

                        if (yearShow){
                            var k1 = (radius)*(sin([f]));
                            var l1 = (radius)*(cos([f]));
                            noStroke();
                            fill(0);
                            textSize(10);
                            text(rainfallyear[j],k1,l1);

                            stroke(255,0,0,25);
                            line(0,0,k1,l1);
                        }
                    f +=4;

                        textSize(25);
                        fill(255);
                        stroke(255);
                        text ('Rainfall in mm per season 1929 to 2018', 300,730);

                    }
                    w=0;
                    f=0;
                pop();

}