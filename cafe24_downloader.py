import paramiko
import os
import stat

# Configuration
HOST = 'ecimg-ftp-c01.cafe24img.com'
PORT = 8007
USER = 'gith6409'
PASS = '!Lmklmk6901'
LOCAL_DIR = 'cafe24'

def download_dir(sftp, remote_dir, local_dir):
    if not os.path.exists(local_dir):
        os.makedirs(local_dir)
    
    print(f"Entering {remote_dir}...")
    try:
        for entry in sftp.listdir_attr(remote_dir):
            remote_path = remote_dir + '/' + entry.filename
            local_path = os.path.join(local_dir, entry.filename)
            
            mode = entry.st_mode
            if stat.S_ISDIR(mode):
                download_dir(sftp, remote_path, local_path)
            elif stat.S_ISREG(mode):
                print(f"Downloading {entry.filename}...")
                try:
                    sftp.get(remote_path, local_path)
                except Exception as e:
                    print(f"Failed to download {entry.filename}: {e}")
    except Exception as e:
        print(f"Error accessing {remote_dir}: {e}")

def main():
    transport = paramiko.Transport((HOST, PORT))
    try:
        transport.connect(username=USER, password=PASS)
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        print(f"Connected to {HOST}. Starting download...")
        download_dir(sftp, '.', LOCAL_DIR)
        
        sftp.close()
        print("Download complete!")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        transport.close()

if __name__ == "__main__":
    main()
