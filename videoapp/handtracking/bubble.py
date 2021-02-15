#Chris Hunt

#Victor Dibia, HandTrack: A Library For Prototyping Real-time Hand Tracking
#Interfaces using Convolutional Neural Networks, https://github.com/victordibia/handtracking

# Python Libraries
import numpy as np
import math
import cv2
import random
import time
import asyncio
import threading
import pygame, sys
from utils import detector_utils as du

# Sprite Class
class SpriteSheet(object):
    # Regular Constructor
    def __init__(self, file_name):
        # Load sprite sheet with transparent background
        self.sprite_sheet = pygame.image.load(file_name).convert_alpha()
    
    # Uses parameters to grab an individual image from the sprite sheet
    def get_image(self, x, y, width, height):
        image = pygame.Surface([width, height], pygame.SRCALPHA)
        image.set_colorkey((255,255,255))
        image.blit(self.sprite_sheet, (0,0), (x,y,width,height))
        return image

# Bubble Class
class Bubble(pygame.sprite.Sprite):

    # Regular Constructor
    def __init__(self, radx, rady):

        super().__init__()

        # Load bubble sprite sheet
        sprite_sheet = SpriteSheet("images/bubblepop.png")

        # Create array to store all bubble frames
        self.bubbleframes = []

        # Generate random bubble location
        self.radnum = random.randint(200,300)

        # Bubble position
        self.radx = radx
        self.rady = rady

        # Populate array with individual images
        image = sprite_sheet.get_image(0, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image,(self.radnum,self.radnum)))
        image2 = sprite_sheet.get_image(64, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image2,(self.radnum,self.radnum)))
        image3 = sprite_sheet.get_image(128, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image3,(self.radnum,self.radnum)))
        image4 = sprite_sheet.get_image(192, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image4,(self.radnum,self.radnum)))
        image5 = sprite_sheet.get_image(256, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image5,(self.radnum,self.radnum)))
        image6 = sprite_sheet.get_image(320, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image6,(self.radnum,self.radnum)))
        image7 = sprite_sheet.get_image(384, 0, 64, 64)
        self.bubbleframes.append(pygame.transform.scale(image7,(self.radnum,self.radnum)))

        # Initialize first bubble image
        self.image = self.bubbleframes[0]
        self.rect = self.image.get_rect()

# Pop the bubble by running through the animation vector
def pop(bubble, surface, cap, count, record):

    for i in range(1,7):

        # Grab new image, display on video frame
        bubble.image = bubble.bubbleframes[i]
        surface.blit(bubble.image,(bubble.radx-100,bubble.rady-100))

        # Keep video frame running
        ret, frame = cap.read()
        frame = cv2.flip(frame,1) 
        frame = cv2.resize(frame, (1200, 800))
        DISPLAYSURF.fill([255,255,255])
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame.swapaxes(0,1)

        # Keep timer, count, and record showing
        DISPLAYSURF.blit(counttime, (50, 85))
        DISPLAYSURF.blit(count, (50, 50))
        DISPLAYSURF.blit(record, (1000, 50))

        # Display new image, display on pygame surface, update
        pygame.surfarray.blit_array(DISPLAYSURF,frame)
        DISPLAYSURF.blit(bubble.image,(radx-100,rady-100))
        pygame.display.update()

# Time player for 60 seconds
def timer(init, surface):

    # Global timecount
    global counttime

    # Grab current time
    current = time.time()

    # Subtract with initial time
    diff = int(current - init)

    # Count down from 60
    timecount = 60 - diff
    counttime = BASICFONT.render('%i' % timecount, True, (0,0,0))

    # Display time on frame
    surface.blit(counttime, (50, 85))
    pygame.display.update()

    # Return if time runs out or not
    if timecount > 0:
        return False
    if timecount <= 0:
        return True

# End of game
def win(frame, num, record):

    # Run indefinitely
    while(1):

        # Keep video frame running
        ret, frame = cap.read()
        frame = cv2.flip(frame,1) 
        frame = cv2.resize(frame, (1200, 800))
        DISPLAYSURF.fill([255,255,255])

        # Convert video frame to pygame surface
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame.swapaxes(0,1)
        pygame.surfarray.blit_array(DISPLAYSURF,frame)

        # Render fonts
        winText = WINFONT.render('You popped %i bubbles!' % num,True,(0,0,0))
        spaceText = BASICFONT.render('Press space to play again',True,(0,0,0))

        # Update record
        if num > record:
            record = num

        # Pygame event loop to play another game
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    init = time.time()
                    num = 0
                    return (init, num, record)

        # Display text
        DISPLAYSURF.blit(winText,(50,300))
        DISPLAYSURF.blit(spaceText,(350,400))

        # Update display
        pygame.display.update()

# Randomize bubble placement
def plantcircle(frame):
    radx = random.randint(150,1050)
    rady = random.randint(150,650)
    return (int(radx), int(rady))

# Inherited from detector_utils.py. Does not actually draw a box, but instead I used this function
# to calculate the center position of the hand
def draw_box_on_image(num_hands_detect, score_thresh, scores, boxes, im_width, im_height, image_np):
    for i in range(num_hands_detect):
        if (scores[i] > score_thresh):
            (left, right, top, bottom) = (boxes[i][1] * im_width, boxes[i][3] * im_width,
                                          boxes[i][0] * im_height, boxes[i][2] * im_height)
            p1 = (int(left), int(top))
            p2 = (int(right), int(bottom))
            #cv2.rectangle(image_np, p1, p2, (77, 255, 9), 3, 1)

            # Calculates center of hand x and y
            cx = math.floor((int(left)+int(right))/2)
            cy = math.floor((int(top)+int(bottom))/2)
            return (cx, cy)

# Create message frame with text
message = 255 * np.ones(shape=[1000, 1000, 3], dtype=np.uint8)
cv2.namedWindow('message')
text = "Place hand in front of the screen to calibrate"
cv2.putText(message, text, (130, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (221, 247, 47), 2)
cv2.imshow('message',message)
cv2.moveWindow('message',270,0)

# Turn on camera, initialize pygame, load handtracking
cap = cv2.VideoCapture(0)
calibrated = False
detection_graph, sess = du.load_inference_graph()
pygame.init()
FPSCLOCK = pygame.time.Clock()
RECORD = 0

# Loop to calibrate (test) hand detection
while(calibrated==False):

    # Opens video frame
    ret, frame = cap.read()
    frame = cv2.flip(frame,1) 

    # Detect hand
    boxes, scores = du.detect_objects(frame, detection_graph, sess)

    # Hand must reach a confidence score of at least 0.7
    if scores[0] > 0.7:
        calibrated=True

# Delete message frame
cv2.destroyWindow('message')

# Initialize grab logic
grab = False
grabbed = True

# Initialize main surface, fonts, title, and icon
DISPLAYSURF = pygame.display.set_mode([1200,800])
pygame.display.set_caption('Bubbles!')
pygame.display.set_icon(pygame.image.load('images/bubble.png'))
BASICFONT = pygame.font.Font('freesansbold.ttf', 32)
WINFONT = pygame.font.Font('freesansbold.ttf', 90)

# Turn on video frame
ret, frame = cap.read()
frame = cv2.flip(frame,1) 
frame = cv2.resize(frame, (1200, 800))

# Randomize first bubble
(radx, rady) = plantcircle(frame)
bubble = Bubble(radx, rady)

# Initialize count and time
circlecount = 0
init = time.time()

# Enter main loop
while(1):
    try:
        
        # Open video frame and adjust
        ret, frame = cap.read()
        frame = cv2.flip(frame,1) 
        frame = cv2.resize(frame, (1200, 800))
        height, width, _ = frame.shape
        boxes, scores = du.detect_objects(frame, detection_graph, sess)

        # Max FPS
        FPSCLOCK.tick(30)

        # Recognize hand, grab coordinates
        if boxes is not None and scores is not None:
            if scores[0] > 0.1:
                (cx, cy) = draw_box_on_image(1, 0.1, scores, boxes, width, height, frame)
                grab = True
        
        # If the hand is recognize and over the bubble
        if grabbed is True:

            # Make a new bubble
            (radx, rady) = plantcircle(frame)
            bubble = Bubble(radx, rady)
            grabbed = False

        # Convert video frame to pygame surface and display all images        
        DISPLAYSURF.fill([255,255,255])
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame.swapaxes(0,1)
        pygame.surfarray.blit_array(DISPLAYSURF,frame)
        DISPLAYSURF.blit(bubble.image,(radx-100,rady-100))
        countsurf = BASICFONT.render('%i' % circlecount, True, (0,0,0))
        recordnum = BASICFONT.render('Record: %i' % RECORD, True, (0,0,0))
        DISPLAYSURF.blit(countsurf,(50,50))
        DISPLAYSURF.blit(recordnum,(1000,50))
        pygame.display.update()

        # When hand is recognized
        if grab is True:

            # If the hand is recognized and in the coordinate range of the bubble
            if abs(cx-radx)<100 and abs(cy-rady)<100:

                # Pop the bubble, up the count
                circlecount += 1
                pop(bubble, DISPLAYSURF, cap, countsurf, recordnum)
                grabbed = True
                grab = False

        # If the timer returns true, finish the game
        finish = timer(init, DISPLAYSURF)
        if finish:
            (init, circlecount, RECORD) = win(frame, circlecount, RECORD)

    except:
        k = cv2.waitKey(5) & 0xFF
        if k == 27: # ESC (escape) key
            break

    k = cv2.waitKey(5) & 0xFF
    if k == 27: # ESC (escape) key
        break

# Quit the game
pygame.quit()
cv2.destroyAllWindows()
cap.release()

