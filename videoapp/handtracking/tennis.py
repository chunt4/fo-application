#Chris Hunt

#Victor Dibia, HandTrack: A Library For Prototyping Real-time Hand Tracking
#Interfaces using Convolutional Neural Networks, https://github.com/victordibia/handtracking
import numpy as np
import math
import cv2
from utils import detector_utils as du
from imutils.imutils import convenience
import time
import pygame, sys
import constants
#import aiohttp
import asyncio
import acapture

class SpriteSheet(object):
    def __init__(self, file_name):
        self.sprite_sheet = pygame.image.load(file_name).convert_alpha()
    
    def get_image(self, x, y, width, height):
        image = pygame.Surface([width, height], pygame.SRCALPHA)
        image.set_colorkey((255,255,255))
        image.blit(self.sprite_sheet, (0,0), (x,y,width,height))
        return image

class Bot(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        sprite_sheet = SpriteSheet("images/bot.png")
        self.playerframes = []
        image = sprite_sheet.get_image(0, 0, 64, 64)
        self.playerframes.append(pygame.transform.scale(image,(150,150)))
        self.image = self.playerframes[0]
        self.rect = self.image.get_rect()
        self.change_x = 0
        self.change_y = 0
        self.savepointx = 0
        self.savepointy = 0
        self.bound_x1 = 600
        self.bound_x2 = 100
        self.bound_y = 300

    def update(self):
        if self.rect.x+self.change_x < self.bound_x1 and self.rect.x+self.change_x > self.bound_x2:
            self.rect.x += self.change_x
        if self.rect.y < self.bound_y and self.rect.y > 20:
            self.rect.y += self.change_y
        if abs(self.rect.x-self.savepointx) < 5 or abs(self.rect.y-self.savepointy) < 20:
            self.stop_x()
            self.stop_y()

    def stop_x(self):
        self.change_x = 0

    def stop_y(self):
        self.change_y = 0

    def findintersect(self, ballposx, ballposy, ballspeedx, ballspeedy):

        # Save initial ball position data
        ogx = ballposx
        ogy = ballposy

        # Determine future ball position at net level
        while ballposy > self.bound_y:
            ballposx += ballspeedx
            ballposy += ballspeedy

        # Calculate distance ball takes to net
        balldist = (math.sqrt(((ballposx-ogx)*(ballposx-ogx))+((ballposy-ogy)*(ballposy-ogy))))

        # Calculate distance bot takes to net
        botdist = (math.sqrt(((self.rect.x-ogx)*(self.rect.x-ogx))+((self.rect.y-ogy)*(self.rect.y-ogy))))

        # Calculate distance between amplified vectors (ballspeed*balldistance - botspeed*botdistance)
        maxCalc = (math.sqrt((ballspeedx*ballspeedx)+(ballspeedy*ballspeedy)))*balldist - MAXBOTSPEED*botdist

        while ballposy > 10:
            ballposx += ballspeedx
            ballposy += ballspeedy
            balldist = (math.sqrt(((ballposx-ogx)*(ballposx-ogx))+((ballposy-ogy)*(ballposy-ogy))))
            botdist = (math.sqrt(((self.rect.x-ballposx)*(self.rect.x-ballposx))+((self.rect.y-ballposy)*(self.rect.y-ballposy))))
            nextCalc = (math.sqrt((ballspeedx*ballspeedx)+(ballspeedy*ballspeedy)))*balldist - MAXBOTSPEED*botdist
            if nextCalc > maxCalc:
                maxCalc = nextCalc
                #print(ballposx)
                #print(ballposy)
                self.savepointx = ballposx
                self.savepointy = ballposy

        #print("MADE IT")

        angle = math.atan2((self.savepointx*self.rect.y)-(self.savepointy*self.rect.x), (self.savepointx*self.rect.x)-(self.savepointy*self.rect.y))
        if self.savepointx >= self.rect.x and self.savepointy >= self.rect.y:
            self.change_x = MAXBOTSPEED*math.cos(angle)
            self.change_y = -MAXBOTSPEED*math.sin(angle)
        if self.savepointx >= self.rect.x and self.savepointy < self.rect.y:
            self.change_x = MAXBOTSPEED*math.cos(angle)
            self.change_y = MAXBOTSPEED*math.sin(angle)
        if self.savepointx < self.rect.x and self.savepointy >= self.rect.y:
            self.change_x = -MAXBOTSPEED*math.cos(angle)
            self.change_y = -MAXBOTSPEED*math.sin(angle)
        if self.savepointx < self.rect.x and self.savepointy < self.rect.y:
            self.change_x = -MAXBOTSPEED*math.cos(angle)
            self.change_y = MAXBOTSPEED*math.sin(angle)

    def adjusttomiddle(self):
        #angle = math.atan2((self.savepointx*self.rect.y)-(self.savepointy*self.rect.x), (self.savepointx*self.rect.x)-(self.savepointy*self.rect.y))
        if RETURNSPOTX >= self.rect.x and RETURNSPOTY >= self.rect.y:
            print("One")
            #self.change_x = MAXBOTSPEED*math.cos(angle)
            #self.change_y = -MAXBOTSPEED*math.sin(angle)
            self.change_x = 2
            self.change_y = -3
        if RETURNSPOTX >= self.rect.x and RETURNSPOTY < self.rect.y:
            print("Two")
            #self.change_x = MAXBOTSPEED*math.cos(angle)
            #self.change_y = MAXBOTSPEED*math.sin(angle)
            self.change_x = 2
            self.change_y = 3
        if RETURNSPOTX < self.rect.x and RETURNSPOTY >= self.rect.y:
            print("Three")
            #self.change_x = -MAXBOTSPEED*math.cos(angle)
            #self.change_y = -MAXBOTSPEED*math.sin(angle)
            self.change_x = -2
            self.change_y = -3
        if RETURNSPOTX < self.rect.x and RETURNSPOTY < self.rect.y:
            print("Four")
            #self.change_x = -MAXBOTSPEED*math.cos(angle)
            #self.change_y = MAXBOTSPEED*math.sin(angle)
            self.change_x = -2
            self.change_y = 3

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        sprite_sheet = SpriteSheet("images/friendoverboy.png")
        self.playerframes = []
        image = sprite_sheet.get_image(0, 0, 32, 32)
        self.playerframes.append(pygame.transform.scale(image,(120,120)))
        image2 = sprite_sheet.get_image(32, 0, 32, 32)
        self.playerframes.append(pygame.transform.scale(image2,(120,120)))
        self.image = self.playerframes[0]
        self.rect = self.image.get_rect()
        self.change_x = 0
        self.change_y = 0
        self.bound_x = 370
        self.bound_y = 370

    def update(self):
        self.rect.x += self.change_x
        if self.rect.y+self.change_y > self.bound_y:
            self.rect.y += self.change_y

        if SWINGLEFT or SWINGRIGHT:
            self.image = self.playerframes[1]
        else:
            self.image = self.playerframes[0]

    def go_left(self):
        self.change_x = -MOVERATE

    def go_right(self):
        self.change_x = MOVERATE

    def go_up(self):
        self.change_y = -MOVERATE
    
    def go_down(self):
        self.change_y = MOVERATE

    def stop_x(self):
        self.change_x = 0

    def stop_y(self):
        self.change_y = 0

class BallCourt(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        sprite_sheet = SpriteSheet("images/court.png")
        image = sprite_sheet.get_image(0,0,1000,1000)
        image.set_alpha(100)
        self.background = pygame.transform.scale(image,(800,800))
        #self.background = pygame.image.load("images/court.png").convert()

class Ball(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        sprite_sheet = SpriteSheet("images/ballsheet.png")
        self.ballframes = []
        image = sprite_sheet.get_image(0, 0, 32, 32)
        self.ballframes.append(pygame.transform.scale(image,(100,100)))
        image2 = sprite_sheet.get_image(32, 0, 64, 32)
        self.ballframes.append(pygame.transform.scale(image2,(200,100)))
        self.image = self.ballframes[0]
        self.rect = self.image.get_rect()
        self.flip = True

    def update(self):
        if self.flip:
            self.image = self.ballframes[0]
            self.flip = False
        else:
            self.image = self.ballframes[1]
            self.flip = True

    #def update(self):
        #self.image = self.playerframes[0]

# def capture_click(event, x, y, flags, param):
#     global drawcircleone, drawcircletwo, ix, iy
#     if event == cv2.EVENT_LBUTTONDOWN:
#         ix,iy = x,y
#         drawcircleone = True
#         drawcircletwo = True

def hitball(circlex, circley, ballx, bally, ballspeedx, ballspeedy):
    #print(circlex)
    #print(circley)
    #print(ballx)
    #print(bally)
    angle = math.atan2((circlex*bally)-(circley*ballx),(circlex*ballx)+(circley*bally))
    Vperp_one = ballspeedx*math.cos(angle)
    Vpall_one = ballspeedx*math.sin(angle)
    Vperp_two = ballspeedy*math.sin(angle)
    Vpall_two = ballspeedy*math.cos(angle)
    Vperp = Vperp_one + Vperp_two
    Vpall = Vpall_one + Vpall_two
    ballspeedy_one = Vperp*math.sin(angle)
    ballspeedx_one = Vperp*math.cos(angle)
    ballspeedy_two = Vpall*math.cos(angle)
    ballspeedx_two = Vpall*math.sin(angle)
    ballspeedy = ballspeedy_one + ballspeedy_two
    ballspeedx = ballspeedx_one + ballspeedx_two
    #print(angle)
    #print(ballspeedx)
    #print(ballspeedy)
    # if ballspeedy < 0:
    #     ballspeedy -= 0.3
    # else:
    #     ballspeedy += 0.3
    ballspeedy = -ballspeedy
    if ballx < circlex and ballspeedx > 0:
        ballspeedx = -ballspeedx
    if ballx > circlex and ballspeedx < 0:
        ballspeedx = -ballspeedx
    #print("\n")
    #ballspeedy = -ballspeedy
    return (ballspeedx, ballspeedy)

def switchdirectionsx(ballspeedx):
    return -ballspeedx

def switchdirectionsy(ballspeedy):
    return -ballspeedy

def checkbounds(circlex, circley, ballposx, ballposy):
    if circley < 380:
        if (circley-ballposy) < 50 and (circley-ballposy) > -50 and (circlex - ballposx) < 70 and (circlex-ballposx) > -70:
            return True
        else:
            return False
    else:
        if (circley-ballposy) < 50 and (circley-ballposy) > -50 and (circlex - ballposx) < 90 and (circlex-ballposx) > -70:
            return True
        else:
            return False

def checknet(ballposx, ballposy, ballspeedx, ballspeedy):
    if ballspeedy < 0:
        while ballposy > 380:
            ballposx += ballspeedx
            ballposy += ballspeedy
    if ballspeedy > 0:
        while ballposy < 380:
            ballposx += ballspeedx
            ballposy += ballspeedy
    if ballposx < 180 or ballposx > 520:
        print("Out of bounds!")
        return True
    else:
        return False

drawcircleone = False
drawcircletwo = False
SWINGLEFT = False
SWINGRIGHT = False
MOVERATE = 8
MAXBOTSPEED = 7
NETFAILPLAYER = False
NETFAILBOT = False
RETURNSPOTX = 300
RETURNSPOTY = 300
#cap = cv2.VideoCapture(0)
cap = acapture.open(0)
#if cap is None or not cap.isOpened():
    #TODO: Figure out how to inherit the video capture already existing in the browser
    #pass
#cap.set(CV_CAP_PROP_BUFFERSIZE, 3)
calibrated = False
hitswitchleft = False
hitswitchright = False
hit = False
ballspeedy = 15
ballspeedx = 3
circlex = 0
circley = 0
firstFrame = None
detection_graph, sess = du.load_inference_graph()
pygame.init()
BASICFONT = pygame.font.Font('freesansbold.ttf', 32)
WINFONT = pygame.font.Font('freesansbold.ttf', 90)

# court = 255 * np.ones(shape=[1000, 1000, 3], dtype=np.uint8)
# cv2.namedWindow('court')
# cv2.setMouseCallback('court',capture_click)

PLAYER = pygame.image.load('images/friendoverboy.png')
BOY = cv2.imread('images/friendoverboy.png')
#WHITE = (255,255,255)
DISPLAYSURF = pygame.display.set_mode((800,800))
TURN = True
player = Player()
bot = Bot()
player.rect.x = 450
player.rect.y = 650
bot.rect.x = 250
bot.rect.y = 50
ballposx = bot.rect.x+20
ballposy = bot.rect.y+50
tcourt = BallCourt()
ball = Ball()
active_sprite_list = pygame.sprite.Group()
active_sprite_list.add(player)
active_sprite_list.add(ball)
active_sprite_list.add(bot)
FPSCLOCK = pygame.time.Clock()
timeout = 0
BOTSERVE = True
PLAYERSERVE = False
SCOREBOT = 0
SCOREPLAYER = 0
pygame.display.set_caption('Tennis')
pygame.display.set_icon(pygame.image.load('images/friendoverboy.png'))
servefont = WINFONT.render('Serve!', True, (0,0,0))
DISPLAYSURF.blit(servefont,(260,300))
pygame.display.update()
time.sleep(3)

#loop = asyncio.get_event_loop(chunt)
#try:
#   loop.run_until_complete(main())
#finally:
#   loop.close()
#async def main():
while(1):
    try:
        if firstFrame is not None:
            firstFrame = gray

        ret, frame = cap.read()
        frame = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
        frame = cv2.flip(frame,1) 

        height, width, _ = frame.shape

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(hsv,(21,21),0)

        boxes, scores = du.detect_objects(frame, detection_graph, sess)

        #build court OPENCV
        # cv2.line(court,(180,50),(180,750),(0,0,0),1)
        # cv2.line(court,(180,50),(720,50),(0,0,0),1)
        # cv2.line(court,(720,50),(720,750),(0,0,0),1)
        # cv2.line(court,(180,750),(720,750),(0,0,0),1)

        # cv2.line(court,(240,50),(240,750),(0,0,0),1)
        # cv2.line(court,(660,50),(660,750),(0,0,0),1)
        # cv2.line(court,(150,400),(750,400),(0,0,0),2)

        # cv2.line(court,(240,225),(660,225),(0,0,0),1)
        # cv2.line(court,(240,575),(660,575),(0,0,0),1)

        # cv2.line(court,(450,225),(450,575),(0,0,0),1)

        #check for walls
        # if ballposy <= 0 or ballposy >= 800:
        #     ballspeedy = switchdirectionsy(ballspeedy)

        # if ballposx <= 0 or ballposx >= 800:
        #     ballspeedx = switchdirectionsx(ballspeedx)

        # Max FPS set to 30
        FPSCLOCK.tick(30)

        # Action and resets when ball goes out of bounds
        if ballposx <= -10 or ballposx >= 810 or ballposy <= -10 or ballposy >= 810:
            if ballspeedy < 0:
                if NETFAILPLAYER:
                    SCOREBOT += 1
                else:
                    SCOREPLAYER += 1
            else:
                if NETFAILBOT:
                    SCOREPLAYER += 1
                else:
                    SCOREBOT += 1

            if SCOREBOT == 7:
                DISPLAYSURF.fill((255,255,255))
                DISPLAYSURF.blit(tcourt.background,(0,0))
                DISPLAYSURF.blit(ball.image, (ballposx, ballposy))
                DISPLAYSURF.blit(player.image, (player.rect.x,player.rect.y))
                DISPLAYSURF.blit(bot.image, (bot.rect.x-30, bot.rect.y-10))
                keycont = BASICFONT.render('Press space to continue', True, (0,0,0))
                botwin = WINFONT.render('You lose!', True, (0,0,0))
                scorefont = BASICFONT.render('%i-%i' % (SCOREPLAYER, SCOREBOT), True, (0,0,0))
                DISPLAYSURF.blit(scorefont,(50,50))
                SCOREPLAYER = 0
                SCOREBOT = 0
                DISPLAYSURF.blit(botwin,(220,300))
                DISPLAYSURF.blit(keycont,(220,420))
                pygame.display.update()
                time.sleep(2)
                CONTINUE = False
                while CONTINUE == False:
                    ret, frame = cap.read()
                    frame = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
                    frame = cv2.flip(frame,1) 
                    cv2.imshow('frame',frame)
                    for event in pygame.event.get():
                        if event.type == pygame.KEYDOWN:
                            if event.key == pygame.K_SPACE:
                                DISPLAYSURF.fill((255,255,255))
                                DISPLAYSURF.blit(tcourt.background,(0,0))
                                DISPLAYSURF.blit(ball.image, (ballposx, ballposy))
                                DISPLAYSURF.blit(player.image, (player.rect.x,player.rect.y))
                                DISPLAYSURF.blit(bot.image, (bot.rect.x-30, bot.rect.y-10))
                                DISPLAYSURF.blit(scorefont,(50,50))
                                CONTINUE = True

            if SCOREPLAYER == 7:
                DISPLAYSURF.fill((255,255,255))
                DISPLAYSURF.blit(tcourt.background,(0,0))
                DISPLAYSURF.blit(ball.image, (ballposx, ballposy))
                DISPLAYSURF.blit(player.image, (player.rect.x,player.rect.y))
                DISPLAYSURF.blit(bot.image, (bot.rect.x-30, bot.rect.y-10))
                keycont = BASICFONT.render('Press space to continue', True, (0,0,0))
                playerwin = WINFONT.render('You win!', True, (0,0,0))
                scorefont = BASICFONT.render('%i-%i' % (SCOREPLAYER, SCOREBOT), True, (0,0,0))
                DISPLAYSURF.blit(scorefont,(50,50))
                SCOREPLAYER = 0
                SCOREBOT = 0
                DISPLAYSURF.blit(playerwin,(230,300))
                DISPLAYSURF.blit(keycont,(220,420))
                pygame.display.update()
                time.sleep(2)
                CONTINUE = False
                while CONTINUE == False:
                    ret, frame = cap.read()
                    frame = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
                    frame = cv2.flip(frame,1) 
                    cv2.imshow('frame',frame)
                    for event in pygame.event.get():
                        if event.type == pygame.KEYDOWN:
                            if event.key == pygame.K_SPACE:
                                DISPLAYSURF.fill((255,255,255))
                                DISPLAYSURF.blit(tcourt.background,(0,0))
                                DISPLAYSURF.blit(ball.image, (ballposx, ballposy))
                                DISPLAYSURF.blit(player.image, (player.rect.x,player.rect.y))
                                DISPLAYSURF.blit(bot.image, (bot.rect.x-30, bot.rect.y-10))
                                DISPLAYSURF.blit(scorefont,(50,50))
                                CONTINUE = True

            BOTSERVE = not BOTSERVE
            PLAYERSERVE = not PLAYERSERVE
            if BOTSERVE:
                TURN = True
            else:
                TURN = False
            NETFAILPLAYER = False
            NETFAILBOT = False
            bot.rect.x = 250
            bot.rect.y = 50
            player.rect.x = 450
            player.rect.y = 650
            bot.change_x = 0
            bot.change_y = 0
            bot.savepointx = 0
            bot.savepointy = 0
            if BOTSERVE == True:
                ballspeedy = 15
                ballspeedx = 3
                ballposx = bot.rect.x+20
                ballposy = bot.rect.y+70
            if PLAYERSERVE == True:
                ballspeedy = -15
                ballspeedx = -3
                ballposx = player.rect.x-20
                ballposy = player.rect.y-20
                bot.findintersect(ballposx, ballposy, ballspeedx, ballspeedy)
            pygame.display.update()
            servefont = WINFONT.render('Serve!', True, (0,0,0))
            DISPLAYSURF.blit(servefont,(260,300))
            pygame.display.update()
            time.sleep(1)

        # update ball position
        ballposy += math.ceil(ballspeedy)
        ballposx += math.ceil(ballspeedx)

        #compare recent-most frame to detect motion
        if firstFrame is None:
            firstFrame = gray

        frameDelta = cv2.absdiff(firstFrame, gray)
        thresh = cv2.threshold(frameDelta, 70, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = convenience.grab_contours(cnts)

        # In multiplayer, there will be another boolean called playerswitch. playerswitch will toggle between each players turn to hit the ball.
        # If playerswitch is true for you, then only you can hit the ball

        #check for detected motion and swing timer to measure swing/hit

        if timeout>1:
            hitswitchleft = False
            hitswitchright = False
            SWINGLEFT=False
            SWINGRIGHT=False
        if len(cnts)<=0:
            text = "No swing"
        if len(cnts)>0:
            c = max(cnts, key=cv2.contourArea) #O(n)
            (x,y,w,h) = cv2.boundingRect(c)
            if x>450 and not hitswitchleft:
                intime = time.time()
                hitswitchleft = True
                timeout = 0
            elif x<250 and not hitswitchright:
                intime = time.time()
                hitswitchright = True
                timeout = 0
            if x>450 and hitswitchright and timeout<1:
                text = "Swing to the right"
                #print(text)
                SWINGRIGHT = True
                hitswitchleft = False
                hitswitchright = False
                if checkbounds(player.rect.x,player.rect.y,ballposx,ballposy) and TURN:
                    (ballspeedx, ballspeedy) = hitball(player.rect.x, player.rect.y, ballposx, ballposy, ballspeedx, ballspeedy)
                    TURN = False
                    if not NETFAILBOT and not NETFAILPLAYER:
                        NETFAILPLAYER = checknet(ballposx, ballposy, ballspeedx, ballspeedy)
                        bot.findintersect(ballposx, ballposy, ballspeedx, ballspeedy)

            elif x<250 and hitswitchleft and timeout<1:
                #THE RIGHT WORKS BUT NOT THE LEFT. WEIRD
                text = "Swing to the left"
                #print(text)
                SWINGLEFT = True
                hitswitchleft = False
                hitswitchright = False
                #Problem. Checkbounds does not get called. Or it does but it doesn't make it to the first line. Only for left side. What?
                if checkbounds(player.rect.x,player.rect.y,ballposx,ballposy) and TURN:
                    (ballspeedx, ballspeedy) = hitball(player.rect.x, player.rect.y, ballposx, ballposy, ballspeedx, ballspeedy)
                    TURN = False
                    if not NETFAILBOT and not NETFAILPLAYER:
                        NETFAILPLAYER = checknet(ballposx, ballposy, ballspeedx, ballspeedy)
                        bot.findintersect(ballposx, ballposy, ballspeedx, ballspeedy)
            elif hitswitchleft or hitswitchright:
                endtime = time.time()
                timeout = endtime-intime

        # Bot will hit the ball if it is in range
        if checkbounds(bot.rect.x,bot.rect.y,ballposx,ballposy) and not TURN:
            (ballspeedx,ballspeedy) = hitball(bot.rect.x+60,bot.rect.y+60,ballposx,ballposy,ballspeedx,ballspeedy)
            TURN = True
            #bot.adjusttomiddle()
            if not NETFAILBOT and not NETFAILPLAYER:
                NETFAILBOT = checknet(ballposx, ballposy, ballspeedx, ballspeedy)

        # Pygame event loop to move character
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    player.go_left()
                if event.key == pygame.K_RIGHT:
                    player.go_right()
                if event.key == pygame.K_UP:
                    player.go_up()
                if event.key == pygame.K_DOWN:
                    player.go_down()
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_LEFT and player.change_x < 0:
                    player.stop_x()
                if event.key == pygame.K_RIGHT and player.change_x > 0:
                    player.stop_x()
                if event.key == pygame.K_UP and player.change_y < 0:
                    player.stop_y()
                if event.key == pygame.K_DOWN and player.change_y > 0:
                    player.stop_y()

        # Update the sprites
        active_sprite_list.update()

        # Show player swing and direction
        cv2.putText(frame, text, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        #newcourt = PLAYER + court

        #cv2.imshow('boy',BOY)
        # cv2.imshow('court',court)
        cv2.imshow('frame',frame)
        cv2.imshow('thresh', thresh)
        cv2.moveWindow('thresh',0,388)
        cv2.moveWindow('frame',0,0)
        # cv2.moveWindow('court',642,0)
        #cv2.moveWindow('mask',0,388)
        #cv2.moveWindow('edge_detect',0,388)

        DISPLAYSURF.fill((255,255,255))

        DISPLAYSURF.blit(tcourt.background,(0,0))
        DISPLAYSURF.blit(ball.image, (ballposx, ballposy))
        DISPLAYSURF.blit(player.image, (player.rect.x,player.rect.y))
        DISPLAYSURF.blit(bot.image, (bot.rect.x-30, bot.rect.y-10))
        scorefont = BASICFONT.render('%i-%i' % (SCOREPLAYER, SCOREBOT), True, (0,0,0))
        DISPLAYSURF.blit(scorefont,(50,50))
        #DISPLAYSURF.blit(player.image, (circlex, circley))
        pygame.display.update()
        # court = 255 * np.ones(shape=[1000, 1000, 3], dtype=np.uint8)

    except:
        k = cv2.waitKey(5) & 0xFF
        if k == 27: # ESC (escape) key
            break

    k = cv2.waitKey(5) & 0xFF
    if k == 27: # ESC (escape) key
        break

pygame.quit()
cv2.destroyAllWindows()
#cap.release()