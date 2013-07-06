var fs = require('fs')

fs.readFile('./'+process.argv[2], function(err, file){
	if(!err){
		parseGcode(file)
	}
});

function parseGcode(file){
	var segments = file.toString().split('\n')
	//console.log(segments[1])
	for(var i=0; i<segments.length; i++){
		var newSeg = {}
		var chunks = segments[i].split(' ')
		for (var x=0; x<chunks.length; x++){
			var key = chunks[x].slice(0,1)
			var value =parseFloat( chunks[x].slice(1, chunks[x].length-1))
			newSeg[key] = value
		}
		segments[i] = newSeg
	}
	//console.log(JSON.stringify(segments, null, '\t'))
	var center = centerOf(segments)
	
	var average = findMean(segments, center)

	var trueCount = 0

	//We got the average, now for the variance & std. deviation:
	var varianceTotal = 0
	segments.forEach(function(segment){
		if(segment.D){
			segment.Variance = Math.pow(segment.D-average, 2)
			console.log("Variance: "+segment.Variance)
			varianceTotal+=segment.Variance	
			if(segment.D) trueCount++
		}
	})			 	
	console.log("Standard deviation: "+Math.sqrt(varianceTotal/trueCount))	
}

function findMean(set, center){
	var total = 0
	var trueCount = 0
	var varianceTotal = 0
	set.forEach(function(segment){
		segment.D = distance(segment, center)
	//	console.log("Distance: "+segment.D)
		if(segment.D){
			
			total+=segment.D
			trueCount++
			
			varianceTotal+=segment.Variance	
		}
	})
	console.log("Average: "+total/set.length)
	return total/trueCount

}

function distance(a,b){
//	console.log(JSON.stringify(a)+JSON.stringify(b))
	var answer =  Math.sqrt(Math.pow(a.X-b.X, 2)+Math.pow(a.Y-b.Y, 2))
//	console.log(answer)
	return answer
}

function centerOf(points){
	var farthest = 0
	var farthestPoint = {}
	points.forEach(function(point){
		if(distance(point, points[0])>farthest){
			farthest = distance(point, points[0])
			farthestPoint = point
		}
	})
//	console.log("Farthest: "+JSON.stringify(farthestPoint)+" origin point: "+JSON.stringify(points[0]))

	return centerBetweenPoints(farthestPoint, points[0])	
}

function centerBetweenPoints(a, b){
	console.log("Seeking center between: "+JSON.stringify(a)+" and "+JSON.stringify(b)+ " and "+ a.X+a.Y+b.X+b.Y)
	console.log("A test: "+((a.X+b.Y)/2))
	var theCenter = {
		"X": (a["X"]+b["X"])/2,
		"Y": (a.Y+b.Y)/2
	}
	console.log("Center: "+JSON.stringify(theCenter))
	return theCenter
}
	
