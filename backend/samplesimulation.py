import cv2
import numpy as np
import pygame
import sys

# Load the image using OpenCV
image_path = './testbed_purple.png'
original_image = cv2.imread(image_path)


# Rotate the image 90 degrees counterclockwise
original_image = cv2.rotate(original_image, cv2.ROTATE_90_COUNTERCLOCKWISE)


gray_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)

# Apply adaptive thresholding to isolate the road
thresholded_image = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                          cv2.THRESH_BINARY_INV, 11, 2)

# Find contours of the road
contours, _ = cv2.findContours(thresholded_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Assuming there's a single large contour for the road
road_contour = max(contours, key=cv2.contourArea)
path_points = road_contour.squeeze()

# Reduce the number of points in the path
path_points = cv2.approxPolyDP(road_contour, epsilon=1, closed=False).squeeze()

# Convert contour points to a list of tuples
path_points = list(map(tuple, path_points.tolist()))

# Initialize Pygame
pygame.init()

# Set up display to the size of the track image
width, height = original_image.shape[0], original_image.shape[1]
screen = pygame.display.set_mode((width, height))

# Convert the original image to a format suitable for Pygame
track_surface = pygame.surfarray.make_surface(cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB))
# track_surface = pygame.transform.rotate(track_surface, 270)

# Optionally rotate the track surface if needed
# track_surface = pygame.transform.rotate(track_surface, rotation_angle)

# Load and resize car image
car_image = pygame.image.load('car.png')  # Replace with the correct path to your car image
car_image = pygame.transform.scale(car_image, (car_image.get_width() // 20, car_image.get_height() // 20))

car_rect = car_image.get_rect()
car_speed = 5
car_path_index = 0
# Function to analyze the pixel intensity in the direction of the car
# Function to check if the car is on a gray path
def is_on_gray_path(gray_image, car_rect):
    car_x, car_y = car_rect.center
    pixel_intensity = gray_image[car_y, car_x]
    return 150 < pixel_intensity < 250  # Adjust the range as needed

# Function to find the nearest gray pixel
def find_nearest_gray(gray_image, start_x, start_y, search_radius=50):
    for r in range(1, search_radius):
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                x, y = start_x + dx, start_y + dy
                if 0 <= x < gray_image.shape[1] and 0 <= y < gray_image.shape[0]:
                    pixel_intensity = gray_image[y, x]
                    if 100 < pixel_intensity < 200:  # Adjust as needed
                        return x, y
    return start_x, start_y  # Return original position if no gray found

# Updated function to move the car
def move_car(car_rect, path_points, index, gray_image):
    if index < len(path_points) - 1:
        car_x, car_y = car_rect.center
        if not is_on_gray_path(gray_image, car_rect):
            # Find the nearest gray path and teleport the car
            nearest_x, nearest_y = find_nearest_gray(gray_image, car_x, car_y)
            car_rect.center = (nearest_x, nearest_y)
        else:
            next_point = path_points[index]
            car_rect.center = next_point
            return index + car_speed
    return index
# Convert the path points to Pygame coordinates
path_points = [(x, y) for x, y in path_points]


# Hardcoded directions: 'up', 'right', 'down', 'left'
# Each tuple in the list represents a direction and the number of steps to move in that direction
directions = [
    ('right', 10),
    ('down', 17),
    ('right', 160),
    ('rightdown', 10),
    ('leftdown', 13),
    ('rightishdown', 75),
    ('left', 15),
    # ('leftup', 160),
    ('leftupish', 135),

    # Add more tuples as needed to follow the track
]

def move_car_hardcoded(car_rect, directions):
    global car_path_index
    if car_path_index < len(directions):
        direction, steps = directions[car_path_index]
        print(f"{direction, steps, car_path_index=}")
        if direction == 'right':
            car_rect.x += car_speed
        if direction == 'rightdown':
            car_rect.x += car_speed
            car_rect.y += car_speed
        if direction == 'rightishdown':
            car_rect.x += car_speed / 3
            car_rect.y += car_speed
        if direction == 'leftdown':
            car_rect.x -= car_speed
            car_rect.y += car_speed
        if direction == 'leftup':
            car_rect.x -= car_speed
            car_rect.y -= car_speed
        if direction == 'leftupish':
            car_rect.x -= car_speed
            car_rect.y -= 2 * car_speed / 3
        elif direction == 'left':
            car_rect.x -= car_speed
        elif direction == 'up':
            car_rect.y -= car_speed
        elif direction == 'down':
            car_rect.y += car_speed
        
        # Decrease steps and update the index if steps are done
        steps -= 1
        directions[car_path_index] = (direction, steps)
        if steps == 0:
            car_path_index += 1
        

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Move the car along the path using hardcoded directions
    move_car_hardcoded(car_rect, directions)

    # Blit the track onto the screen
    screen.blit(track_surface, (0, 0))
    
    # Draw the car
    screen.blit(car_image, car_rect)
    
    # Update the display
    pygame.display.flip()

    # Cap the frame rate
    pygame.time.Clock().tick(60)

# Quit Pygame
pygame.quit()
sys.exit()