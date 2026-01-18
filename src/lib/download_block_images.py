#!/usr/bin/env python3
"""
Download Minecraft block item PNGs from minecraft.wiki
"""

import requests
from bs4 import BeautifulSoup
import os
import time
from urllib.parse import urljoin, urlparse
import re

def download_image(url, filepath):
    """Download an image from URL to filepath"""
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def get_full_resolution_url(thumbnail_url):
    """Convert thumbnail URL to full resolution URL"""
    # The thumbnail URLs look like: /images/thumb/filename.png/30px-filename.png?hash
    # We want: /images/filename.png
    
    # Remove query parameters first
    if '?' in thumbnail_url:
        thumbnail_url = thumbnail_url.split('?')[0]
    
    # Replace /thumb/ with / and remove the size prefix
    if '/thumb/' in thumbnail_url:
        # Split by /thumb/ to get the parts
        parts = thumbnail_url.split('/thumb/')
        if len(parts) >= 2:
            base_path = parts[0]  # /images
            file_part = parts[1]  # filename.png/30px-filename.png
            
            # Extract just the filename from the file_part
            if '/' in file_part:
                filename = file_part.split('/')[0]  # filename.png
                full_url = base_path + '/' + filename
            else:
                full_url = thumbnail_url
        else:
            full_url = thumbnail_url
    else:
        full_url = thumbnail_url
        
    return full_url

def main():
    base_url = "https://minecraft.wiki"
    page_url = "https://minecraft.wiki/w/Block"
    
    print("Fetching Minecraft Block page...")
    
    try:
        response = requests.get(page_url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the "List of blocks" section
        list_header = soup.find('span', id='List_of_blocks')
        if not list_header:
            print("Could not find 'List of blocks' section")
            return
        
        # Find the parent heading and get the content after it
        heading = list_header.find_parent(['h2', 'h3', 'h4'])
        if not heading:
            print("Could not find heading containing 'List of blocks'")
            return
        
        print("Found 'List of blocks' section")
        
        # Get all content until the next major heading
        content_elements = []
        current = heading.next_sibling
        
        while current:
            if current.name in ['h2', 'h3'] and current != heading:
                break
            if hasattr(current, 'find_all'):
                content_elements.append(current)
            current = current.next_sibling
        
        # Find all image links in the content
        images = []
        for element in content_elements:
            # Look for image links
            img_links = element.find_all('a', href=re.compile(r'/w/File:.*\.png', re.I))
            for link in img_links:
                img_tag = link.find('img')
                if img_tag and img_tag.get('src'):
                    # Get the file name from the link
                    file_match = re.search(r'/w/File:(.+)', link.get('href', ''))
                    if file_match:
                        filename = file_match.group(1)
                        
                        # Get full resolution URL
                        thumbnail_url = img_tag['src']
                        if thumbnail_url.startswith('/'):
                            thumbnail_url = base_url + thumbnail_url
                        
                        full_url = get_full_resolution_url(thumbnail_url)
                        
                        # Extract block name
                        block_name = filename.replace('.png', '').replace('_', ' ')
                        
                        images.append({
                            'name': block_name,
                            'filename': filename,
                            'url': full_url,
                            'alt': img_tag.get('alt', '')
                        })
        
        print(f"Found {len(images)} block images")
        
        # Create output directory
        output_dir = os.path.join(os.path.dirname(__file__), 'ingame-block-assets')
        os.makedirs(output_dir, exist_ok=True)
        
        # Download images
        downloaded = 0
        failed = 0
        
        for i, image in enumerate(images, 1):
            # Sanitize filename
            safe_filename = re.sub(r'[<>:"/\\|?*]', '_', image['filename'])
            filepath = os.path.join(output_dir, safe_filename)
            
            # Skip if already exists
            if os.path.exists(filepath):
                print(f"[{i}/{len(images)}] Skipping {image['name']} (already exists)")
                continue
            
            print(f"[{i}/{len(images)}] Downloading {image['name']}...")
            
            if download_image(image['url'], filepath):
                downloaded += 1
            else:
                failed += 1
            
            # Be respectful to the server
            time.sleep(0.2)
        
        print(f"\nDownload complete!")
        print(f"Successfully downloaded: {downloaded} images")
        print(f"Failed: {failed} images")
        print(f"Images saved to: {output_dir}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()