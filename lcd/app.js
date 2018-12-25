var five = require("johnny-five"),
    board, lcd;

board = new five.Board();

board.on("ready", function () {

    lcd = new five.LCD({
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 7    8   9   10  11  12
        pins: [7, 8, 9, 10, 11, 12],
        backlight: 2,
        rows: 2,
        cols: 20


        // Options:
        // bitMode: 4 or 8, defaults to 4
        // lines: number of lines, defaults to 2
        // dots: matrix dimensions, defaults to "5x8"
    });

    // Tell the LCD you will use these characters:
    lcd.useChar("check");
    lcd.useChar("heart");
    lcd.useChar("duck");

    lcd.clear();

    lcd.cursor(1, 0);
    
    // Line 1: Hi rmurphey & hgstrp!
    setTimeout(function() {
        lcd.clear().print("OH HEY...");
    }, 1000)

    // Line 2: I <3 johnny-five
    // lcd.print("I").write(7).print(" johnny-five");
    // can now be written as:
    setTimeout(function() {
        lcd.clear().print("FOCKOODOO! :check:");
    }, 3000)

    this.repl.inject({
        lcd: lcd
    });
});