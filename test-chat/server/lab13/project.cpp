//Chris Hunt
//project.cpp

#include <iostream>
#include <string>
#include <cmath>
#include "gfx.h"
#include "balls.h"
#include <sstream>
#include <unistd.h>
#include <cstdlib>
#include <vector>
#include <time.h> //clock_t,time,clock()

using namespace std;

const int r = 15; //radius of circle
const int h = 600; //height of window
const int w = 800; //width of window

void start(int,int);//beginning animation of program
void randspeed();
bool moveballs(vector<balls>&,clock_t&,int&,int,int);//always moves the balls no matter the input or lack of input

int main(){
	clock_t t; //clock_t capable of time counting
	t = clock(); //grabs the current time, passes to moveballs
	int xspeed,yspeed,xrand,yrand; //component velocity, determined by one of two values for rand
	bool GamePlay = false; //game has not started, but turns to true when it does
	gfx_open(w,h,"Dodge These Balls"); //opens the window
	char c = 0; //grabs input based on wait value
	balls Ball; //object Ball of the defined class balls
	vector<balls> allballs; //vector of objects under the class balls
	gfx_text(340,300,"Dodge These Balls!"); //directional text
	gfx_text(270,320,"Press Any Space to Begin. Press Q to exit.");
	gfx_text(280,520,"A - Left, W - Up, S - Down, D - Right");
	c = gfx_wait();
	gfx_clear();
	int circleposx = w/2; //beginning position of orange user circle
	int circleposy = h/2;
	int count = 0; //counts every time a ball is added so that time intervals will still subtract to .15
	while(c!='q'){
		srand(time(0)); //initializes rand function to get different rand values
		start(w,h); //starts the animation of the beginning
		gfx_clear();
		gfx_color(255,100,0);
		circleposx = w/2;
		circleposy = h/2;
		gfx_circle(circleposx,circleposy,r); //creates the user circle
		//then creates three "enemy" circles to avoid. location same each game, but velocity vectors could be much different
		gfx_color(100,100,255); 
		gfx_circle(100,100,r);
		Ball.setxpos(100); //stores position
		Ball.setypos(100);
		xspeed = rand()%6+2; //grabs random speed from 2 to 7
		yspeed = rand()%6+2;
		xrand = rand()%2; //grabs either a 0 or a 1
		yrand = rand()%2;
		if (xrand==1) //50 percent chance to be negative
			xspeed = -xspeed;
		if (yrand==1)
			yspeed = -yspeed;
		Ball.setxspeed(xspeed); //stores the speed
		Ball.setyspeed(yspeed);
		allballs.push_back(Ball); //all variables are stored so the Ball is pushed back into the vector
		gfx_circle(100,500,r);
		Ball.setxpos(100); //does this three times with balls at different positions
		Ball.setypos(500);
	 	xspeed = rand()%6+2;
		yspeed = rand()%6+2;
		xrand = rand()%2;
		yrand = rand()%2;
		if (xrand==1)
	 		xspeed = -xspeed;
		if (yrand==1)
			yspeed = -yspeed;
		Ball.setxspeed(xspeed);
		Ball.setyspeed(yspeed);
		allballs.push_back(Ball);
		gfx_circle(600,500,r);
		Ball.setxpos(600);
		Ball.setypos(500);
		xspeed = rand()%6+2;
		yspeed = rand()%6+2;
		xrand = rand()%2;
		yrand = rand()%2;
		if (xrand==1)
			xspeed = -xspeed;
		if (yrand==1)
			yspeed = -yspeed;
		Ball.setxspeed(xspeed);
		Ball.setyspeed(yspeed);
		allballs.push_back(Ball);
		gfx_flush(); //flushes all balls to the screen
		GamePlay = true; //begins the game
		while (GamePlay==true){
			GamePlay = moveballs(allballs,t,count,circleposx,circleposy); //balls move no matter if there is user input or not. takes in the vector,time,and user position and returns if the user's ball is too close to one of the balls on the screen
			gfx_color(255,100,0);
			gfx_circle(circleposx,circleposy,r);
			gfx_flush();
			usleep(15000);
			if (gfx_event_waiting()){ //immediately returns 1 if there is user input
				c = gfx_wait();
				while(c==97){ //left, or a on the keyboard
					GamePlay = moveballs(allballs,t,count,circleposx,circleposy);
					gfx_color(255,100,0);
					if (circleposx>r) //boundary applied. cannot go past r.
						circleposx+=-10; //user moves by 10 in specified direction
					gfx_circle(circleposx,circleposy,r);
					gfx_flush();
					usleep(15000);
					if (~gfx_event_waiting()) //immediately picks up when user stops pressing key. changes c's value to exit the while loop
						c=0;
				}
				while(c==119){ //up, or w on the keyboard
					GamePlay = moveballs(allballs,t,count,circleposx,circleposy);
					gfx_color(255,100,0);
					if (circleposy>r)
						circleposy+=-10;
					gfx_circle(circleposx,circleposy,r);
					gfx_flush();
					usleep(15000);
					if (~gfx_event_waiting())
						c=0;
				}
				while(c==100){ //right, or d on the keyboard
					GamePlay = moveballs(allballs,t,count,circleposx,circleposy);
					gfx_color(255,100,0);
					if (circleposx<(w-r))
						circleposx+=10;
					gfx_circle(circleposx,circleposy,r);
					gfx_flush();
					usleep(15000);
					if (~gfx_event_waiting())
						c=0;
				}
				while(c==115){ //down, or s on the keyboard
					GamePlay = moveballs(allballs,t,count,circleposx,circleposy);
					gfx_color(255,100,0);
					if (circleposy<(h-r))
						circleposy+=10;
					gfx_circle(circleposx,circleposy,r);
					gfx_flush();
					usleep(15000);
					if (~gfx_event_waiting())
						c=0;
				}
			}		
		}
		gfx_clear();
		int sum = 0; //gets the amount of elements in the balls vector
		string endtext;
		for (auto n = allballs.begin(); n < allballs.end(); n++)
			sum++;
		string tot = to_string(sum); //converts the integer to a string
		endtext = "You Lose! You reached: " + tot + " balls"; //concatenates the string
		const char* end = endtext.c_str(); //changes string to data type compatible with gfx_text()
		gfx_color(255,255,255);
		gfx_text(320,280,end);
		gfx_text(305,320,"Left click to try again, Q to exit");
		c = gfx_wait();
		while(c!=1&&c!='q') //user must either continue or exit
			c = gfx_wait();
		gfx_clear();
		allballs.clear(); //clears the vector so that only three balls will appear again
	}	

	return 0;
}

void start(int w,int h){
	gfx_color(255,100,0); //all timed to show "3..,2..,1.." in actual seconds
	gfx_circle(w/2,h/2,r);
	gfx_color(255,255,255);
	gfx_text(395,200,"3..");
	gfx_flush();
	usleep(1000000);
	gfx_clear();
	gfx_color(255,100,0);
  gfx_circle(w/2,h/2,r);
	gfx_color(255,255,255);
	gfx_text(395,200,"2..");
	gfx_flush();
	usleep(1000000);
	gfx_clear();
	gfx_color(255,100,0);
	gfx_circle(w/2,h/2,r);
	gfx_color(255,255,255);
	gfx_text(395,200,"1..");
	gfx_flush();
	usleep(1000000);
}

bool moveballs(vector<balls> &ballvec,clock_t &timer,int &c,int uposx,int uposy){
 	gfx_color(0,100,255);
	int x,y,xs,ys,xrand,yrand,xs2,ys2,x1,y1,x2,y2;
	bool cont = true; //initialization of "continue" variable
	balls newBall;
	timer = clock()-(c*(.15*CLOCKS_PER_SEC)); //does not get the timer, it gets the DIFFERENCE between the timer and the constant based on the last iteration
	if ((float)timer/CLOCKS_PER_SEC > .15){ //every 15 seconds a new ball appears at the same position, but with new vector. becomes hard to keep track of anyways
		newBall.setxpos(700);
		newBall.setypos(500);
		xs = rand()%6+2;
		ys = rand()%6+2;
		xrand = rand()%2;
		yrand = rand()%2;
		if (xrand==1)
			xs = -xs;
		if (yrand==1)
			ys = -ys;
		newBall.setxspeed(xs);
		newBall.setyspeed(ys);
		ballvec.push_back(newBall);
		c++; //count adds when a new ball is added
	}
	gfx_clear();
	for (auto v = ballvec.begin(); v < ballvec.end(); v++){
		x = (*v).getxpos();
		y = (*v).getypos();
		xs = (*v).getxspeed();
		ys = (*v).getyspeed();
		if (abs(x-uposx)<30&&abs(y-uposy)<30) //when the user ball is in a certain proximity of a ball, returns false so the game ends
			cont = false;
		x = x + xs;
		y = y + ys; //updates velocity of balls
		(*v).wallbounce(x,y); //calls wallbounce to make sure velocities do or don't need to be negative of what they are
		for (auto q = ballvec.begin(); q < ballvec.end(); q++){
			x1 = (*v).getxpos();
			y1 = (*v).getypos();
			x2 = (*q).getxpos();
			y2 = (*q).getypos();
			xs2 = (*q).getxspeed();
			ys2 = (*q).getyspeed();
	/*	  if(v!=q){
				if (abs(x1-x2) < 30 && abs(y1-y2) < 30){
					(*v).collide(xs,ys,xs2,ys2,x1,y1,x2,y2);
					(*q).collide(xs2,ys2,xs,ys,x2,y2,x1,y1);
				}
			} */
		}
		gfx_circle(x,y,r);
		gfx_flush();
		(*v).setxpos(x);
		(*v).setypos(y);
	}
	return cont;
}
