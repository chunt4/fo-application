#!/c/Users/chris/.windows-build-tools/python27/python
#Simon Says, no timer interrupts
import sys
import random
import time

def error(message, status=1):
    print(message)
    sys.exit(status)

def main():
    keyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    #fakenames = ["Sally","Susie","Sammy","Robert","Bob","Alonzo","Shannon","The cookie monster","Your mom"]
    print("Welcome to Simon Says!")
    time.sleep(3)
    play = True
    while play == True:
        iter = random.randint(3,6)
        while iter != 0:
            if iter != 1:
                print("Simon says...")
                time.sleep(2)
            AlphIndex = random.randint(0, len(keyboard))
            Alph = keyboard[AlphIndex]
            print("Press " + Alph)
            intime = time.time()
            guess = raw_input("- ")
            endtime = time.time()
            ttime = endtime-intime
            if iter != 1:
                if ttime < 3 and guess == Alph:
                    print("Correct!")
                    time.sleep(2)
                elif ttime > 3 and guess == Alph:
                    print("Too slow!")
                    iter = 1
                else:
                    print("Wrong answer!")
                    iter = 1
            else:
                if ttime > 3 and guess == "None":
                    print("Good job!")
                else:
                    print("Got em!")
            iter = iter - 1
            guess = None

        option = raw_input("Type n to quit, any other key to play again: ")
        if option == "n":
            play=False

    print("See ya!")
    return 0

if __name__ == '__main__':
    main()
    