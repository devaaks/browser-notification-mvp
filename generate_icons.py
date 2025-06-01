from PIL import Image
import os

def generate_icons():
    # Ensure the assets directory exists
    assets_dir = os.path.join('ui', 'assets')
    os.makedirs(assets_dir, exist_ok=True)
    
    # Check if the original icon exists
    icon_path = os.path.join(assets_dir, 'icon.png')
    if not os.path.exists(icon_path):
        print(f"Error: {icon_path} not found. Please add your icon file.")
        return
    
    # Open the original image
    try:
        img = Image.open(icon_path)
        
        # Generate 192x192 icon
        size_192 = (192, 192)
        img_192 = img.resize(size_192, Image.Resampling.LANCZOS)
        img_192.save(os.path.join(assets_dir, 'icon-192x192.png'), 'PNG')
        
        # Generate 512x512 icon
        size_512 = (512, 512)
        img_512 = img.resize(size_512, Image.Resampling.LANCZOS)
        img_512.save(os.path.join(assets_dir, 'icon-512x512.png'), 'PNG')
        
        # Ensure the original icon is the right size (144x144 as specified in the manifest)
        size_144 = (144, 144)
        if img.size != size_144:
            img_144 = img.resize(size_144, Image.Resampling.LANCZOS)
            img_144.save(icon_path, 'PNG')
        
        print("Icons generated successfully!")
        
    except Exception as e:
        print(f"Error generating icons: {e}")

if __name__ == "__main__":
    generate_icons()
