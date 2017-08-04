multipleClick_clickTime = null;
multipleClick_target = null;

function showControlPanel() {
    $("#control_panel").css("display", "block")
    $("#page_content").removeClass("bg1").addClass("bg2")
}

function preventMultipleClick(id) {
    sameTarget = false;
    if (id == multipleClick_target) {
        sameTarget = true;
    }
    multipleClick_target = id;
    fastClick = false;
    var currentClickTime = new Date();
    if (currentClickTime - multipleClick_clickTime < 500) {
        fastClick = true;
    }
    multipleClick_clickTime = currentClickTime;
    return (sameTarget && fastClick);
};

var current_item = null;
var current_timeout = null;

function display(id) {
    new_menu = $(id);
    if (current_item == null) {
        current_item = new_menu;
        new_menu.fadeIn();
    } else if (current_item == new_menu) {
        return;
    } else {
        current_item.stop(true, true).fadeOut(complete = function () {
            current_item = new_menu;
            new_menu.fadeIn();
        });
    }
};

var subscriberName = "acando-remote-webpage";
var theVideoDevice;
var historyPages = [];

$(document).ready(function (e) {

    session.service("ALMemory").then(function (mem) {
        mem.raiseEvent("AcandoRemote/DisableMovements", 1);
    });


    $('#speak_button_0').click(function () {
        if (preventMultipleClick("speak_button_0")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 0);
        });
    });

    $('#speak_button_1').click(function () {
        if (preventMultipleClick("speak_button_1")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 1);
        });
    });
    $('#speak_button_2').click(function () {
        if (preventMultipleClick("speak_button_2")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 2);
        });
    });
    $('#speak_button_3').click(function () {
        if (preventMultipleClick("speak_button_3")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 3);
        });
    });
    $('#speak_button_4').click(function () {
        if (preventMultipleClick("speak_button_4")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 4);
        });
    });
    $('#speak_button_5').click(function () {
        if (preventMultipleClick("speak_button_5")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 5);
        });
    });
    $('#speak_button_6').click(function () {
        if (preventMultipleClick("speak_button_6")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 6);
        });
    });
    $('#speak_button_7').click(function () {
        if (preventMultipleClick("speak_button_7")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 7);
        });
    });
    $('#speak_button_8').click(function () {
        if (preventMultipleClick("speak_button_8")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 8);
        });
    });
    $('#speak_button_9').click(function () {
        if (preventMultipleClick("speak_button_9")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 9);
        });
    });
    $('#speak_button_10').click(function () {
        if (preventMultipleClick("speak_button_10")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 10);
        });
    });
    $('#speak_button_11').click(function () {
        if (preventMultipleClick("speak_button_11")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 11);
        });
    });
    $('#speak_button_12').click(function () {
        if (preventMultipleClick("speak_button_12")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 12);
        });
    });
    $('#speak_button_13').click(function () {
        if (preventMultipleClick("speak_button_13")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 13);
        });
    });
    $('#speak_button_14').click(function () {
        if (preventMultipleClick("speak_button_14")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 14);
        });
    });
    $('#speak_button_15').click(function () {
        if (preventMultipleClick("speak_button_15")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", 15);
        });
    });

    $('#anim_button_laugh3').click(function () {
        if (preventMultipleClick("anim_button_laugh3")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Emotions/Positive/Laugh_2");
        });
    });

    $('#anim_button_song').click(function () {
        if (preventMultipleClick("anim_button_song")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/HappyBirthday_1");
        });
    });

    $('#anim_button_laugh1').click(function () {
        if (preventMultipleClick("anim_button_laugh1")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Emotions/Positive/Laugh_1");
        });
    });

    $('#anim_button_laugh2').click(function () {
        if (preventMultipleClick("anim_button_laugh2")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Emotions/Positive/Laugh_3");
        });
    });

    $('#anim_button_oops').click(function () {
        if (preventMultipleClick("anim_button_oops")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/KnockEye_1");
        });
    });
    $('#anim_button_drivecar').click(function () {
        if (preventMultipleClick("anim_button_drivecar")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/DriveCar_1");
        });
    });

    $('#anim_button_mystical').click(function () {
        if (preventMultipleClick("anim_button_mystical")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/MysticalPower_1");
        });
    });
    $('#anim_button_angry').click(function () {
        if (preventMultipleClick("anim_button_angry")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Emotions/Negative/Angry_1");
        });
    });

    $('#anim_button_exhausted').click(function () {
        if (preventMultipleClick("anim_button_exhausted")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Gestures/Wings_1");
        });
    });
    $('#anim_button_sneeze').click(function () {
        if (preventMultipleClick("anim_button_sneeze")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/AirGuitar_1");
        });
    });

    $('#anim_button_calm').click(function () {
        if (preventMultipleClick("anim_button_calm")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/Binoculars_1");
        });
    });
    $('#anim_button_kisses').click(function () {
        if (preventMultipleClick("anim_button_kisses")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Waiting/Helicopter_1");
        });
    });
    $('#anim_button_salute').click(function () {
        if (preventMultipleClick("anim_button_salute")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Anim", "animations/Stand/Gestures/Salute_1");
        });
    });



    function moveForward() {
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "forward");
        });
    }

    function moveBack() {
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "back");
        });
    }

    function moveLeft() {
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "left");
        });
    }

    function moveRight() {
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "left");
        });
    }

    function moveStop() {
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "stop");
        });
    }

    $('#move_forward').click(function () {
        if (preventMultipleClick("move_forward")) return;
        moveForward()
    });

    $('#move_back').click(function () {
        if (preventMultipleClick("move_back")) return;
        moveBack()
    });

    $('#move_left').click(function () {
        if (preventMultipleClick("move_left")) return;
        moveLeft()
    });

    $('#move_right').click(function () {
        if (preventMultipleClick("move_right")) return;
        moveRight()
    });

    $('#move_stop').click(function () {
        if (preventMultipleClick("move_stop")) return;
        moveStop()
    });

    $('#move_turnleft').click(function () {
        if (preventMultipleClick("move_turnleft")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "turnleft");
        });
    });

    $('#move_turnright').click(function () {
        if (preventMultipleClick("move_turnright")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Move", "turnright");
        });
    });


    // Exit Button
    $('#title_exit').click(function () {
        if (preventMultipleClick("title_exit")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Exit", 1);
        });
    });

    // Exit Button
    $('#title_back_arrow').click(function () {
        if (preventMultipleClick("title_back_arrow")) return;
        prev = historyPages.pop();
        if (prev) {
            display(prev)
        } else {
            display("#scan_card");
        }
    });


    session.then(
        function (session) {
            console.log('Qimessaging: connected!');
        },
        function () {
            console.error('Qimessaging: disconnected!');
            display("#loading_menu");
        }
    );

    display("#scan_card");
    historyPages.push("#scan_card");


    session.subscribeToEvent("AcandoRemote/TabletPage", function (page) {
        display("#" + page);
        historyPages.push("#" + page);
    });

    session.subscribeToEvent("AcandoRemote/TextPage", function (text) {
        $("#text_page_content").text(text);
    });

    session.subscribeToEvent("AcandoRemote/ImagePage", function (image) {
        $("#image_page_content").css("background-image", "url(img/" + image + ".png)");
    });

    session.subscribeToEvent("AcandoRemote/RecommendedProductImage", function (product_image) {
        $("#image_page_content").css("background-image", "url(img/" + product_image + ".png)");
    });

    window.onbeforeunload = function () {
        VideoUtils.unsubscribeCamera(theVideoDevice, handle)(subscriberName).then(function () {
            console.log("exited +");
        }, function () {
            console.log("exited -");
        });
    };

});