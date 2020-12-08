import numpy as np
import math
import cv2

def capture_click(event, x, y, flags, param):
    global drawcircle, ix, iy
    if event == cv2.EVENT_LBUTTONDOWN:
        ix,iy = x,y
        drawcircle = True

def switchdirections(ballspeedy):
    if ballposy <= 0 or ballposy >= 800:
        return -ballspeedy
    else:
        return ballspeedy

#def hand_histogram(frame):
    #pass

#def draw_rectangle(frame):
    #pass

#def process_image(frame, hand_hist):
    #pass


court = 255 * np.ones(shape=[1000, 1000, 3], dtype=np.uint8)
drawcircle = False
cv2.namedWindow('court')
cv2.setMouseCallback('court',capture_click)
cap = cv2.VideoCapture(0)
calibrated = False
ballposx = 300
ballposy = 300
ballspeedy = 5

while(1):
    try:
        #global hand_hist
        pressed_key = cv2.waitKey(1)
        ret, frame = cap.read()
        frame = cv2.flip(frame,1) 

        kernel = np.ones((2,2),np.uint8)

        edge_detect = cv2.Canny(frame,100,200)
        frame = cv2.GaussianBlur(frame,(5,5),100)

        roi = frame

        hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

        lower_skin = np.array([0,20,70],dtype = np.uint8)
        upper_skin = np.array([20,255,255],dtype = np.uint8)

        #Use HOG so that once a hand-like figure shows up, it follows it around the screen
        mask = cv2.inRange(hsv, lower_skin, upper_skin)
        mask = cv2.dilate(mask,kernel,iterations = 4)
        mask = cv2.GaussianBlur(mask,(5,5),100)
        
        #HOG PSEUDOCODE
        # if hit: hit is registered
        #   switchdirections(ballspeedy)
        #build court
        cv2.line(court,(180,50),(180,750),(0,0,0),1)
        cv2.line(court,(180,50),(720,50),(0,0,0),1)
        cv2.line(court,(720,50),(720,750),(0,0,0),1)
        cv2.line(court,(180,750),(720,750),(0,0,0),1)

        cv2.line(court,(240,50),(240,750),(0,0,0),1)
        cv2.line(court,(660,50),(660,750),(0,0,0),1)
        cv2.line(court,(150,400),(750,400),(0,0,0),2)

        cv2.line(court,(240,225),(660,225),(0,0,0),1)
        cv2.line(court,(240,575),(660,575),(0,0,0),1)

        cv2.line(court,(450,225),(450,575),(0,0,0),1)

        ballspeedy = switchdirections(ballspeedy)
        ballposy += ballspeedy

        cv2.circle(court,(ballposx,ballposy),3,(0,255,0),2)
        if drawcircle == True:
            cv2.circle(court,(ix,iy),15,(255,255,0),-1)

        #if pressed_key & 0xFF == ord('z'):
            #calibrated = True
            #hand_hist = hand_histogram(frame)

        #if calibrated == True:
            #process_image(frame, hand_hist)

        #else:
            #frame = draw_rectangle(frame)


        
        #cv2.imshow('mask',mask)
        cv2.imshow('edge',edge_detect)
        cv2.imshow('court',court)
        cv2.imshow('frame',frame[60:420,0:1000])

        cv2.moveWindow('frame',0,0)
        cv2.moveWindow('court',642,0)
        #cv2.moveWindow('mask',0,388)
        cv2.moveWindow('edge_detect',0,388)

        court = 255 * np.ones(shape=[1000, 1000, 3], dtype=np.uint8)

    except:
        k = cv2.waitKey(5) & 0xFF
        if k == 27: # ESC (escape) key
            break

    k = cv2.waitKey(5) & 0xFF
    if k == 27: # ESC (escape) key
        break

cv2.destroyAllWindows()
cap.release()

