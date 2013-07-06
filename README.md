Marlin Gcode Circle Analyzer

A node.js script for analyzing Marlin-style Gcode for circular consistency.

Requires a series of Marlin-style Gcode instructions, creating at least a half circle.  The program then picks the first point, finds the most distant point, uses them to approximate a circle center, then measures the distance of all points from this center, averages those distances, and records the variance and standard deviation of those points from the circle.

Was originally conceived to see if there was a pattern to the circular deviation I was experiencing with my Reprap.  While there was some strangely sporadic deviance, it wasn't consistent enough to explain what I was observing.  Just the same, I'm saving it here for posterity and to help explain my Reprap situation to others.

Usage:
node app.js gcode_file_name
