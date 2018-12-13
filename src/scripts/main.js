states = ["Projects", "Activities", "Work"];
ACTIVE_CLASSNAME = "nav-link active";
INACTIVE_CLASSNAME = "nav-link";

function setState(state) {
    for(var i = 0; i < states.length; i++) {
        stateElement = document.getElementsByClassName(states[i])[0];
        buttonClassName = states[i] + "-button";
        button = document.getElementsByClassName(buttonClassName)[0];
        if(states[i] == state) {
            stateElement.style.display = "block";
            button.className = ACTIVE_CLASSNAME + " " + buttonClassName;
        } else {
            stateElement.style.display = "none";
            button.className = INACTIVE_CLASSNAME + " " + buttonClassName;
        }
    }
}

// Start with projects visible
setState("Projects");
