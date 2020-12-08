//Chris Hunt
//balls.h

class balls { //class prototype for balls.cpp and main DodgeTheseBalls.cpp
	public:
		balls(); //default constructor
		~balls(); //empty constructor
		void setxpos(int); //sets position of x
		void setypos(int); //sets position of y
		void setxspeed(int); //sets speed of x
		void setyspeed(int); //sets speed of y
		int getxpos(); //returns position of x
		int getypos(); //returns position of y
		int getxspeed(); //returns velocity of x
		int getyspeed(); //returns velocity of y
		void wallbounce(int,int); //bounces off the walls
	 /* void collide(int,int,int,int,int,int,int,int);*/
	private:
		int xpos;
		int ypos;
		int xspeed;
		int yspeed;
};
