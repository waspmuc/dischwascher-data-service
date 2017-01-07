from ouimeaux.environment import Environment


if __name__ == "__main__":
    print("")
    print("WeMo Randomizer")
    print("---------------")
    env = Environment()
    try:
        env.start()
        env.discover(3)
        print(env.list_switches())
        print("---------------")
        wemo = env.get_switch('WeMo Insight Wasp')
        while True:
            print("insight.today_kwh: {var}".format(var=wemo.today_kwh))
            print("today_on_time: {var}".format(var=wemo.today_on_time))
            print("insight.on_for: {var}".format(var=wemo.on_for))
            print("insight.current_power: {var}".format(var=wemo.current_power))
            print("insight.today_standby_time: {var}".format(var=wemo.today_standby_time))
            print("---------------")
            env.wait(1)




    except (KeyboardInterrupt, SystemExit):
        print("---------------")
        print("Goodbye!")
        print("---------------")
