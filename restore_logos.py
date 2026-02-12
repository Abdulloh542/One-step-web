import shutil
import os

src_dark = r'C:\Users\user\.gemini\antigravity\brain\ddadd848-8d68-421f-af9c-38eb4539ca45\uploaded_image_0_1770917099998.png'
src_light = r'C:\Users\user\.gemini\antigravity\brain\ddadd848-8d68-421f-af9c-38eb4539ca45\uploaded_image_1_1770917099998.png'
dest_dir = r'c:\Users\user\Downloads\orchids-website-clone-project-main\orchids-website-clone-project-main\public'

shutil.copy(src_dark, os.path.join(dest_dir, 'logo-dark.png'))
shutil.copy(src_light, os.path.join(dest_dir, 'logo-light.png'))
print("Logos copied successfully")
