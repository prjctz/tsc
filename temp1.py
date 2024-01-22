from deepface import DeepFace
import time

############
##########
#найти модель проверяющую голые фотки и протестить
#############

# Путь к изображениям
#img_path1 = "dataset/img1.jpg"
#img_path2 = "dataset/img2.jpg"
img_path1 = "dataset/i1.jpg"
img_path2 = "dataset/i2.jpg"

result = DeepFace.verify(img1_path = img_path1, img2_path = img_path2)
print(result)

backends = [
  'opencv', 
  'ssd', 
  'dlib', 
  'mtcnn', 
  'retinaface', 
  'mediapipe',
  'yolov8',
  'yunet',
  'fastmtcnn',
]

for i in range(len(backends)):
    print(backends[i])
    start_time = time.time()
    
    for j in range(1):
        # Сравнение двух изображений
        result = DeepFace.verify(img_path1, img_path2, detector_backend=backends[i])
        print("Эти лица одинаковые: ", result["verified"])
        
    elapsed_time = time.time() - start_time
    print(f"Время выполнения цикла {backends[i]}: {elapsed_time} секунд")



models = [
  "VGG-Face", 
  "Facenet", 
  "Facenet512", 
  "OpenFace", 
  "DeepFace", 
  "DeepID", 
  "ArcFace", 
  "Dlib", 
  "SFace",
]

for i in models:
    print(i)
    start_time = time.time()
    
    for j in range(1):
        #face verification
        result = DeepFace.verify(img1_path = img_path1, 
              img2_path = img_path2, 
              model_name = i
        )
        print("Эти лица одинаковые: ", result["verified"])
    
    elapsed_time = time.time() - start_time
    print(f"Время выполнения цикла {i}: {elapsed_time} секунд")
    


