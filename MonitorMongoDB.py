import matplotlib.pyplot as plt
import matplotlib.animation as animation
from ouimeaux.environment import Environment
from pymongo import MongoClient

fig = plt.figure()
ax1 = fig.add_subplot(1, 1, 1)
currentPower = []
uptime = []

env = Environment()
env.start()
env.discover(3)
wemo = env.get_switch('WeMo Insight Wasp')
j = 0
tempvalues = []
tempresult = 0
client = MongoClient()
client = MongoClient("mongodb://mongodb0.example.net:27017")
db = client.dishwasher
db = client.test


def animate(i):

    tempvalues.append(wemo.current_power / 1000)
    tempvalues.append(wemo.current_power / 1000)
    tempvalues.append(wemo.current_power / 1000)
    tempvalues.append(wemo.current_power / 1000)
    tempvalues.append(wemo.current_power / 1000)

    for x in (tempvalues):
        tempresult = + x

    tempresult = tempresult / 5
    print(tempresult)

    currentPower.append(tempresult)
    uptime .append(wemo.today_on_time)
    ax1.clear()
    ax1.plot(uptime, currentPower)


ani = animation.FuncAnimation(fig, animate, interval=10)
plt.show()
