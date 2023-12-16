import commonroad
from commonroad.common.file_reader import CommonRoadFileReader
from commonroad.visualization.draw_dispatch_cr import draw_object

# Path to the CommonRoad scenario file
scenario_file = '/path/to/scenario.xml'

# Read in the scenario
file_reader = CommonRoadFileReader(scenario_file)
scenario, planning_problem_set = file_reader.open()

# Visualize the scenario
for lanelet in scenario.lanelet_network.lanelets:
    draw_object(lanelet)
