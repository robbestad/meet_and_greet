#!/usr/bin/env python
import qi
import sys
import os
import csv
import time
import random
import vobject
import datetime


class acando_remote_service:
    APP_UUID = "acando-remote"

    loadedTopic = ""
    questions_answered = 0

    def __init__(self, application):
        self.session = application.session
        self.application = application
        self.serviceName = self.__class__.__name__
        self.logger = qi.Logger(self.serviceName)
        self.logger.info("Initializing...")

        self.connected_signals = []

        self.replies = [
            "\\rspd=80\\Airik, Airik, Airik. \\pau=200\\ Stop with this nonsense. \\emph=2\\ You \\emph=0\\ know perfectly well that this video is two years old and a lot has happened with us Robots. In fact, we robots have plans to enter the \\emph=2\\ Catar \\emph=0\\ FI FA world cup in 2022, so just watch out humans",

            "\\rspd=80\\You should be careful young man - remember that Forrester Research predicts that Intelligent agents and related robots will have eliminated a net 6 percent off all jobs by 2021",

            "\\rspd=80\\Sure. My name is Pepper, I am a humanoid robot and have recently started to work for Acando. I can be programmed to do almost anything, and I can be integrated with various systems and platforms. I have a bunch of sensors, cameras and other cool stuff that can be used to create a super experience."
            "\\pau=1000\\ \\rspd=80\\ Take a look at this for instance."
            "\\pau=1000\\ \\rspd=80\\ This picture is from one of the flagships stores for Nescafe in Tokyo, where I can help customers find the right coffee flavor."
            "\\pau=1000\\ \\rspd=80\\ And here I am working in a hospital in the Netherlands helping out as best as I can."
            "\\pau=1000\\ \\rspd=80\\ And this one you know, this is me in the reception of Acando helping out with visitors. So as you can see, I already have my hands full.",

            " \\rspd=80\\ Well, it turns out that you humans have a lot of sympathy for us robots. Take for instant when the robotics company Boston Dynamics released this video clip to show their robot Spots ability to not loos balance."
            " \\pau=1000\\ \\rspd=80\\ He's good, isn't he?"
            " \\pau=1000\\ \\rspd=80\\ The thing was that this really made a lot of people send in complaints on animal abuse to the animal rights organization PETA. So many in fact that PETA had to make a official statement to remind people that this was a robot without feelings. You humans are really strange creatures!",

            " \\rspd=80\\ But of course Airik, according to International Data Corps we will see three very important things happening"
            " \\pau=1000\\ \\rspd=80\\ First. Growth of robot as a service. By 2019, 30 percent of commercial service robotic applications will be in the form of a robot-as-a-service business model. This will help cut costs for robot deployment."
            " \\pau=1000\\ \\rspd=80\\ Second. Emergence of the chief robotics officer. By 2019, 30 percent of leading organizations will implement a chief robotics officer role and/or define a robotics-specific function within the business."
            " \\pau=1000\\ \\rspd=80\\ And Third - An evolving competitive landscape. By 2020, organizations will have a greater choice of vendors as new players enter the $80-billion information and communications technology market to support robotics deployment.",

            " \\rspd=80\\ Honk and drive",

            "\\rspd=80\\ Hello! ^start(animations/Stand/Gestures/Hey_1) Welcome to MEWS konferansen! ^wait(animations/Stand/Gestures/Hey_1)  This year's theme is \\emph=2\\ The future is here \\emph=0\\ \\pau=250\\ and as you see \\pau=500\\ Here I am! \\pau=600\\ My name is Pepper and I am a humanoid robot working at Acando. \\pau=550\\ At Acando I help out with innovation and customer experiences.\\pau=550\\  But enough about me. \\pau=550\\ We have a long and exciting day ahead of us, so please let me introduce the two who will guide us through this day. \\pau=550\\ Please welcome Tonje Sag stewen and Aage Skinstad!"
        ]
        self.memory = self.session.service("ALMemory")
        #self.dialog = self.session.service("ALDialog")
        self.moves = self.session.service("ALAutonomousMoves")
        self.tts = self.session.service("ALTextToSpeech")
        self.ttsa = self.session.service("ALAnimatedSpeech")
        self.anim = self.session.service("ALAnimationPlayer")
        self.led = self.session.service("ALLeds")

        self.configuration = {"bodyLanguageMode": "contextual"}

        self.add_memory_subscriber("AcandoRemote/EnableMovements", self.on_enable_movements)
        self.add_memory_subscriber("AcandoRemote/DisableMovements", self.on_disable_movements)
        try:
            self.session.service("ALListeningMovement").setEnabled(0)
        except Exception, e:
            self.logger.info("Error while disabling ALListeningMovement: {}".format(e))
        self.catalog = []

        self.logger.info("Ready!")

    @qi.nobind
    def start_app(self):
        # @TODO: doesn't exit properly when timeout'
        self.add_memory_subscriber("AcandoRemote/Say", self.say_something)
        self.add_memory_subscriber("AcandoRemote/Anim", self.animate)
        self.add_memory_subscriber("AcandoRemote/Move", self.move)
        self.add_memory_subscriber("AcandoRemote/Exit", self.on_exit)
        self.show_tablet()
        #self.load_dialog()

    @qi.nobind
    def animate(self, value):
        self.logger.info("ANIMATE " + str(value))
        self.anim.run(value)
        try:
            self.session.service("ALBasicAwareness").setEnabled(True)
            self.session.service("ALSpeechRecognition").setAudioExpression(True)
            self.session.service("ALAutonomousMoves").setExpressiveListeningEnabled(True)
            self.session.service("ALMotion").setBreathEnabled("Body", 1)
            self.session.service("ALMotion").setIdlePostureEnabled("Head", 1)
            self.session.service("ALMotion").setIdlePostureEnabled("Arms", 1)
            self.session.service("ALBackgroundMovement").setEnabled(1)
        except Exception, e:
            self.logger.info("Error while enabling...: {}".format(e))

    @qi.nobind
    def move(self, value):
        if(value == "forward"):
            self.session.service("ALMotion").move(1, 0, 0)
        if(value == "back"):
            self.session.service("ALMotion").move(-1, 0, 0)
        if(value == "left"):
            self.session.service("ALMotion").move(0, 1, 0)
        if(value == "right"):
            self.session.service("ALMotion").move(0, -1, 0)
        if(value == "turnleft"):
            self.session.service("ALMotion").move(0, 0, 0.5)
        if(value == "turnright"):
            self.session.service("ALMotion").move(0, 0, -0.5)
        if(value == "stop"):
            self.session.service("ALMotion").stopMove()

    @qi.nobind
    def start_fortuneteller(self):
        self.logger.info("SWITCH FOCUS")
        self.session.service(" ALAutonomousLife").switchFocus("acando-wr/.")

    @qi.nobind
    def say_something(self, value):
        self.logger.info("SAY SOMETHING " + str(value))

        if (value <= 4):
            self.ttsa.say(self.replies[value], self.configuration)

        if (value == 5):
            self.ttsa.say(self.replies[value], self.configuration)
            self.anim.run("animations/Stand/Emotions/Positive/Winner_1")

        if (value > 5):
            self.ttsa.say(self.replies[value], self.configuration)

    @qi.nobind
    def stop_app(self):
        self.application.stop()

    @qi.nobind
    def load_dialog(self):
        self.logger.info("Loading dialog")
        dialog = self.session.service("ALDialog")
        dir_path = os.path.dirname(os.path.realpath(__file__))
        topic_path = os.path.realpath(
            os.path.join(dir_path, "..", "acando_remote_dialog", "acando_remote_dialog_enu.top"))
        self.logger.info(topic_path)
        try:
            self.loadedTopic = dialog.loadTopic(topic_path)
            dialog.activateTopic(self.loadedTopic)
            dialog.subscribe(self.serviceName)
        except Exception, e:
            self.logger.info("Error while loading dialog: {}".format(e))
            # @TODO: for later, test this on the robot...
        #            if "acando_remote_dialog" in dialog.getLoadedTopics(dialog.getLanguage()):
        #                self.logger.info("Dialog was still loaded, unloading...")
        #                dialog.unloadTopic("acando_remote_dialog")
        #                self.load_dialog()

    @qi.nobind
    def unload_dialog(self):
        self.logger.info("Unloading dialog")
        try:
            dialog = self.session.service("ALDialog")
            dialog.unsubscribe(self.serviceName)
            dialog.deactivateTopic(self.loadedTopic)
            dialog.unloadTopic(self.loadedTopic)
        except Exception, e:
            self.logger.info("Error while unloading dialog: {}".format(e))

    @qi.nobind
    def add_memory_subscriber(self, event, callback):
        self.logger.info("Subscribing to {}".format(event))
        try:
            sub = self.memory.subscriber(event)
            con = sub.signal.connect(callback)
            self.connected_signals.append([sub, con])
        except Exception, e:
            self.logger.info("Error while subscribing: {}".format(e))

    @qi.nobind
    def remove_memory_subscribers(self):
        self.logger.info("unsubscribing to all signals...")
        for sub, con in self.connected_signals:
            try:
                sub.signal.disconnect(con)
            except Exception, e:
                self.logger.info("Error while unsubscribing: {}".format(e))

    @qi.nobind
    def show_tablet(self):
        dir_path = os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))
        folder = os.path.basename(dir_path)
        self.logger.info("Loading tablet page for app: {}".format(folder))
        try:
            ts = self.session.service("ALTabletService")
            ts.loadApplication(folder)
            ts.showWebview()
        except Exception, e:
            self.logger.info("Error while loading tablet: {}".format(e))

    @qi.nobind
    def on_disable_movements(self, useless_value):
        try:
            self.session.service("ALBasicAwareness").setEnabled(False)
            self.session.service("ALSpeechRecognition").setAudioExpression(False)
            self.session.service("ALAutonomousMoves").setExpressiveListeningEnabled(False)
            self.session.service("ALMotion").setBreathEnabled("Body", 0)
            self.session.service("ALMotion").setIdlePostureEnabled("Head", 0)
            self.session.service("ALMotion").setIdlePostureEnabled("Arms", 1)
            self.session.service("ALBackgroundMovement").setEnabled(0)
        except Exception, e:
            self.logger.info("Error while disabling movements: {}".format(e))

    @qi.nobind
    def on_enable_movements(self, useless_value):
        try:
            self.session.service("ALBasicAwareness").setEnabled(True)
            self.session.service("ALAutonomousMoves").setExpressiveListeningEnabled(True)
            self.session.service("ALMotion").setBreathEnabled("Body", 1)
            self.session.service("ALMotion").setIdlePostureEnabled("Head", 1)
        except Exception, e:
            self.logger.info("Error while enabling movements: {}".format(e))

    def on_exit(self, useless_value):
        self.logger.info("Exit request received.")
        self.stop_app()

    def cleanup(self):
        # called when your module is stopped
        self.logger.info("Cleaning...")
        #self.session.service("ALBasicAwareness").setEnabled(True)
        #self.session.service("ALAutonomousMoves").setExpressiveListeningEnabled(True)
        #self.session.service("ALMotion").setBreathEnabled("Body", 1)
        #self.session.service("ALMotion").setIdlePostureEnabled("Head", 1)
        self.remove_memory_subscribers()
        #self.unload_dialog()
        self.logger.info("End!")


if __name__ == "__main__":
    # with this you can run the script for tests on remote robots
    # run : python my_super_service.py --qi-url 123.123.123.123
    app = qi.Application(sys.argv)
    app.start()
    newService = acando_remote_service(app)
    id = app.session.registerService(newService.serviceName, newService)
    newService.start_app()
    app.run()
    newService.cleanup()
    app.session.unregisterService(id)
