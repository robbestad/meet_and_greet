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

$(document).ready(function (e) {

    session.service("ALMemory").then(function (mem) {
        mem.raiseEvent("AcandoRemote/DisableMovements", 1);
    });

    $('.speak_button_generic').click(function (e) {
        if (preventMultipleClick("speak_button_generic")) return;
        session.service("ALMemory").then(function (mem) {
            mem.raiseEvent("AcandoRemote/Say", e.target.textContent);
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

    session.then(
        function (session) {
            console.log('Qimessaging: connected!');
        },
        function () {
            console.error('Qimessaging: disconnected!');
            // display("#loading_menu");
        }
    );

    session.subscribeToEvent("AcandoRemote/TabletPage", function (page) {
        // display("#" + page);
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


});