let bridge = {
    pickImage: async function() {
        try {
            // Create and trigger file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            // Convert the file selection to a Promise
            const getFile = new Promise((resolve) => {
                input.onchange = (e) => resolve(e.target.files[0]);
            });
            
            // Trigger file selection
            input.click();
            
            // Wait for file selection
            const file = await getFile;
            
            // Convert to base64
            const reader = new FileReader();
            const base64Promise = new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('Failed to read file'));
            });
            
            reader.readAsDataURL(file);
            return await base64Promise;
        } catch (error) {
            throw new Error('Failed to pick image: ' + error.message);
        }
    }
};
