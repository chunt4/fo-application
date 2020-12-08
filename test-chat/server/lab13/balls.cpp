//Chris Hunt
//balls.cpp

#include <iostream>
#include "balls.h"
#include "gfx.h"
#include <unistd.h>
#include <cstdlib>
#include <vector>
#include <cmath>

using namespace std;

const int r = 15; //radius of the circle
const int w = 800; //width of the window
const int h = 600; //height of the window

balls::balls(){ //default constructor, no need for regular constructor
	xspeed = 0;
	yspeed = 0;
	xpos = 0;
	ypos = 0;
}
balls::~balls(){} //empty destructor
void balls::setxpos(int x){ //stores the position with respect to the x axis
	xpos = x; 
}
void balls::setypos(int y){ //stores the position with respect to the y axis
	ypos = y;
}
void balls::setxspeed(int x){ //stores the velocity in the x direction
	xspeed = x;
}
void balls::setyspeed(int y){ //stores the velocity in the y direction
	yspeed = y;
}
int balls::getxpos(){ //returns the stored position with respect to the x axis
	return xpos;
}
int balls::getypos(){ //returns the stored position with respect to the y axis
	return ypos;
}
int balls::getxspeed(){ //returns the velocity in the x direction
	return xspeed;
}
int balls::getyspeed(){ //returns the velocity in the y direction
	return yspeed;
}
void balls::wallbounce(int x,int y){ //for when a ball hits the edge, similar to bounce.cpp
	if (x <= r || x >= w-(r)) //changes the direction of the x component
		xspeed = -xspeed;
	if (y <= r || y >= h-(r)) //changes the direction of they y component
		yspeed = -yspeed;
}
/*
void balls::collide(int vx1,int vy1,int vx2,int vy2,int x1,int y1,int x2,int y2){
	double theta,theta2,thetar,slope,slopeprime,galvx,galvy,ox,oy,newx,newy,v1i,v2i,V2FX,V2FY;
	//FIND V2FX and V2FY ON EACH
	v1i = sqrt((vx1*vx1)+(vy1*vy1));
	v2i = sqrt((vx2*vx2)+(vy2*vy2));
	galvx = vx2-vx1;
	galvy = vy2-vy1;
	ox = x1-x2;
	oy = y1-y2;
	theta2 = atan2(galvy,galvx);
	if (vx2==0){
		if (vy2>0)
			theta2 = M_PI/2;
		else if (vy2<0)
			theta2 = 3*M_PI/2;
	}
	if (cos(theta2)<0)
	theta2 = M_PI-theta2;
	thetar = M_PI/2-theta2;
	newx = (ox*cos(thetar)) - (oy*sin(thetar));
	newy = (ox*sin(thetar)) - (oy*cos(thetar));
	slope = newy/newx;
	slopeprime = -1/slope;
	theta = atan(slopeprime);
	//use theta for quadratic equations that involve conservation of momentum AND energy to find a common answer between x and y. that is the velocity of 2, then use backwards rotational shift and gallilean to find the true velocity. A painstaking process that is too time consuming, so I decided to leave collision physics out.
	xspeed = vx2+vx1-V2FX;
	yspeed = vy2+vy1-V2FY;
}
*/
