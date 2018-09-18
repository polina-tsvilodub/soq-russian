   var must_trials = [{picture: "images/0red_dots_a.png",
	 questionRightPart: "точек - красного цвета.",
	 questionRightPart2: "точки - красного цвета."} , {picture: "images/432red_dots_a.png",
	 questionRightPart: "точек - красного цвета.",
	 questionRightPart2: "точки - красного цвета."}];
	 var main_trials = _.map(_.shuffle(_.range(24)), function(i) {
	 	var addition = _.random(1,18);
		var PicNumber = addition + i*18;
	 	var variant = _.shuffle(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"])[0]
	 	var PicString = "images/" + PicNumber + "red_dots_" + variant + ".png"
	 	return { picture: PicString,
	 	 questionRightPart: "точек - красного цвета.",
	 	 questionRightPart2: "точки - красного цвета." } }).concat(must_trials);
