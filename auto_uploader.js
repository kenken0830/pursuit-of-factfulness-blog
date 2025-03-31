const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const FormData = require('form-data');

// Watch the tsx_to_upload folder
const watchFolder = path.join(__dirname, 'tsx_to_upload');
console.log('Watching folder for TSX files:', watchFolder);

// Function to upload a file
async function uploadFile(filePath) {
  try {
    const fileName = path.basename(filePath);
ECHO is off.
    // Skip if not a TSX file
    if (!fileName.endsWith('.tsx')) {
      console.log('Skipping non-TSX file:', fileName);
      return;
    }
ECHO is off.
    console.log('Detected new TSX file:', fileName);
ECHO is off.
    // Prepare title and slug
    const baseName = fileName.replace('.tsx', '');
    const title = baseName.replace(/([A-Z])/g, ' $1').trim();
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[a-z0-9-]/g, '');
ECHO is off.
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
ECHO is off.
    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('file', fs.createReadStream(filePath));
ECHO is off.
    // Send to the API
    console.log(`Uploading ${fileName} with title "${title}" and slug "${slug}"...`);
ECHO is off.
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/deploy',
      method: 'POST',
      headers: formData.getHeaders()
    };
ECHO is off.
    // Send the request
        let data = '';
ECHO is off.
          data += chunk;
        });
ECHO is off.
            console.log(`Upload successful for ${fileName}`);
            console.log(`Response:`, data);
ECHO is off.
            // Move file to uploaded folder
            const uploadedFolder = path.join(__dirname, 'tsx_uploaded');
            if (!fs.existsSync(uploadedFolder)) {
              fs.mkdirSync(uploadedFolder);
            }
ECHO is off.
            const newPath = path.join(uploadedFolder, fileName);
            fs.renameSync(filePath, newPath);
            console.log(`Moved ${fileName} to uploaded folder`);
ECHO is off.
            resolve(data);
          } else {
            console.error(`Error uploading ${fileName}: ${res.statusCode}`);
            console.error(data);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });
ECHO is off.
        console.error(`Request error for ${fileName}:`, error.message);
        reject(error);
      });
ECHO is off.
      formData.pipe(req);
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
}

// Process existing files in the folder first
const existingFiles = fs.readdirSync(watchFolder);
console.log('Found', existingFiles.length, 'files in the upload folder');

  const filePath = path.join(watchFolder, file);
  console.log('Processing existing file:', file);
  uploadFile(filePath)
});

// Watch for new files
  if (eventType === 'rename' 
    const filePath = path.join(watchFolder, filename);
ECHO is off.
    // Check if file exists and has content (to avoid partial writes)
      if (fs.existsSync(filePath) 
        console.log('New file detected:', filename);
        uploadFile(filePath)
      }
    }, 1000); // Wait 1 second to ensure file is completely written
  }
});

console.log('Watcher started. Drop TSX files into the tsx_to_upload folder to upload them automatically.');
console.log('Press Ctrl+C to stop.');
