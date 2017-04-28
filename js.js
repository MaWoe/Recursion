function Stift(ctx, x, y, winkel) {
    
    var x = x || 100, y = y || 100, winkel = winkel || 0;
    
    this.drehDich = function(_winkel) {
        winkel = (winkel + _winkel) % 360;
    }
    
    this.gehe = function(strecke) {
        var deg;
                
        ctx.moveTo(x, y);
        
        deg = winkel / 360 * 2 * Math.PI;
        x = x + strecke * Math.cos(deg);
        y = y + strecke * Math.sin(deg);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

var canvas;
var ctx;
var s;
var maxRekursion = 0;

function init() {
    var button = document.getElementById('draw');
    var rekursionInput = document.getElementById('rekursion');

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    
    ctx.canvas.width  = window.innerWidth - 50;
    ctx.canvas.height = window.innerHeight - 100;
        
    rekursionInput.addEventListener('change', function() {
        maxRekursion = parseInt(rekursionInput.value);
        if (maxRekursion > 5) {
            maxRekursion = 5;
            rekursionInput.value = "5";
        }
        draw();
    }, false);
    
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    s = new Stift(ctx, 1400, 600, 180);
    macheZacke(1300);
    
    ctx.closePath();
}

function macheZacke(laenge, rekursion) {

    var schritt;
    
    rekursion = rekursion || 0;
    
    if (rekursion >= maxRekursion) {
        s.gehe(laenge);
        return;
    }
    
    schritt = laenge / 3;
    
    macheZacke(schritt, rekursion + 1);

    s.drehDich(  60);

    macheZacke(schritt, rekursion + 1);

    s.drehDich(-120);

    macheZacke(schritt, rekursion + 1);

    s.drehDich(  60);

    macheZacke(schritt, rekursion + 1);
}
