#!/c/Users/chris/.windows-build-tools/python27/python
#Mafia
class Player:
    player Name (e.g. Chris)
    bool assigned
    inherit Title(Mafia, Medic, Detective, Citizen, Narrator)

class Mafia:
    bool sleep
    bool alive
    mute = False

class Medic:
    bool sleep
    alive = True
    mute = False

class Dentist:
    bool sleep
    alive = True
    mute = False

class Citizen:
    bool sleep
    alive = True
    mute = False

class Narrator:
    bool playerNarrator

def main():
    numPlayers = waitforjoin()
    numMM = createObjectPlayers(numPlayers)
    while (checkCitizenAlive > 0 || checkMafiaAlive > 0):
        print("Welcome to mafia!")
        print("Choose a narrator style: ")
        print("Player or Computer")
        if Narrator.playerNarrator:
            print("Who would you like to be narrator?")
            input a name
            if list(getPlayerNames) = input Name: #will choose with a button, so don't need while loop
                Narrator.assignNarrator(self)
            

        

    if checkCitizenAlive > 0:
        print("Citizens win!")

    if checkMafiaAlive > 0:
        print("The mafia wins!")


def createObjectPlayers(players)
    MandM = floor(players%5)
    Mafia.assignMafias(self,MandM)
    Medic.assignMedics(self,MandM)
    Detective.assignDetectives(self)
    Citizen.assignCitizens(self)
    #For each assign, randomize list of players and loop through them
    #If they have already been assigned, skip them
    #Use MandM for amount of players that should be assigned. For 10 players,
    #   there are two mafias and two medics
    #   Whoever was not picked becomes citizens
    return MandM

def waitforjoin():
    button = False
    players = 0
    minplayers = 5
    while (!button && (players >= minplayers)):
        if (join)
            players += 1
        if (button.press)
            if players < minplayers:
                print("Need at least 5 players")
            else:
                button = True

    return players

if __name__ == '__main__':
    main()