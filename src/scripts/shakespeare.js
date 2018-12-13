/*

All plays courtesy of 'shakespeare.mit.edu'
we thank them for democratizing this
literature that has changed the world!

*/

$.ajax({
    url:'https://cphalen.github.io/Shakespeare/plays/The Tempest_ Entire Play.html',
        type:'GET',
        success: function(data){
            main(data);
        }
});


// We will continue to pull lines from content, so we
// keep it global to ensure that it persists
content = {}

// Cut out head becuase some of the links that are left unopen
// cause problems for the parser
function cutHead(text) {
    start = text.indexOf("<head>");
    end = text.indexOf("</head>")
    return (text.substring(0, start) + text.substring(end + "</head>".length));
}

// Cut out <br> becuase it is unclosed and messes with parser
function cutBrs(text) {
    index = 0
    while(true) {
        index = text.indexOf("<br>");
        if(index == -1) {
            return text;
        }

        text =  (text.substring(0, index) + text.substring(index + "<br>".length));
    }
}

function main(text) {
    console.log(text);
    text = cutHead(text);
    text = cutBrs(text);

    parser = new DOMParser();
    play = parser.parseFromString(text,"text/xml");

    console.log(play);

    // Get body of html page containing play data
    body = play.getElementsByTagName("body")[0];

    console.log(body);

    act = "";
    scene = "";
    pass = true;
    currentSpeech = 0
    for(var i = 0; i < body.children.length; i++) {
        // Go from blockquote -> a -> h3 because
        // this is the order of frequency that the
        // tags occur. This increases efficency for
        // by having less checks that we know are
        // going to be incorrect

        current = body.children[i]
        if(current.tagName == "BLOCKQUOTE" && pass == false) {
            lines = current.getElementsByTagName("a");
            content[currentSpeech]["BeginningLine"] = lines[0].name;
            content[currentSpeech]["EndingLine"] = lines[lines.length - 1].name;
            for(var j = 0; j < lines.length; j++) {
                content[currentSpeech]["Text"] += lines[j].textContent + "\n";
            }
        } else if(current.tagName == "A"){
            currentSpeech++;
            content[currentSpeech] = {
                "ACT": act,
                "SCENE": scene,
                "Speaker": current.textContent,
                "BeginningLine": "",
                "EndingLine": "",
                "Text": "\n" //Initalize to start with an endline -- just removes some issues
            }
            pass = false;
        } else if(current.tagName == "H3") {
            if(current.textContent.includes("ACT")) {
                // This works because the numeral 'I', 'II', 'IV', etc.
                // Always comes directly after the first space
                words = current.textContent.split(" ");
                act = words[1];
            } else if(current.textContent.includes("SCENE")) {
                // This works because the numeral 'I', 'II', 'IV', etc.
                // Always comes directly after the first space
                words = current.textContent.split(" ");
                scene = words[1];
            }

            // Pass the blockquote that comes after a new scene
            // or a new act because these ones are normally just
            // scene descriptions
            pass = true;
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getDifficulty(line) {
    numbers  = line["BeginningLine"].split(".");
    start    = parseInt(numbers[numbers.length - 1]);
    numbers  = line["EndingLine"].split(".");
    end      = parseInt(numbers[numbers.length - 1]);
    length   = end - start;

    if(length < 3) {
        return 3;
    } else if (length < 8) {
        return 2;
    } else {
        return 1;
    }
}

function getLine(difficulty) {
    // Continue searching until we get a line
    // of the proper difficulty
    while(true) {
        max = Object.keys(content).length;
        random = getRandomInt(max);
        if (getDifficulty(content[random]) == difficulty) {
            console.log(random)
            console.log(content[random])
            console.log(difficulty)
            console.log(max)
            return content[random];
        };
    }
}

currentLine = null;

function populateQuote(difficulty) {
    line = getLine(difficulty);
    // So that the solution persists
    currentLine = line;

    pre = $("pre#quoteSpace")[0];
    pre.textContent = line["text"];
}
