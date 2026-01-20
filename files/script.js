// Small helpers: year and nav toggle, gallery loader, and dashboard upload (localStorage)
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Gallery: load saved gallery (localStorage) or fallbacks
  loadGallery();

  // Dashboard page handlers (if present)
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    const previewGrid = document.getElementById('previewGrid');
    const currentGrid = document.getElementById('currentGrid');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    // show current gallery
    renderCurrentGallery();

    // preview selected files
    fileInput.addEventListener('change', async (e) => {
      previewGrid.innerHTML = '';
      const files = Array.from(e.target.files || []);
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const data = await readFileAsDataURL(file);
        const img = document.createElement('img');
        img.src = data;
        previewGrid.appendChild(img);
      }
    });

    // save selected images to localStorage gallery
    saveBtn.addEventListener('click', async () => {
      const files = Array.from(fileInput.files || []);
      if (!files.length) {
        alert('No images selected.');
        return;
      }
      const saved = loadGalleryData();
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const data = await readFileAsDataURL(file);
        saved.push(data);
      }
      localStorage.setItem('jamiaGallery', JSON.stringify(saved));
      alert('Saved to local gallery (browser). The public gallery will display these images on this browser.');
      renderCurrentGallery();
      // refresh public gallery
      loadGallery();
    });

    // clear local gallery
    clearBtn.addEventListener('click', () => {
      if (!confirm('Clear the local (browser) gallery? This removes images stored in this browser.')) return;
      localStorage.removeItem('jamiaGallery');
      renderCurrentGallery();
      loadGallery();
    });

    function renderCurrentGallery() {
      currentGrid.innerHTML = '';
      const saved = loadGalleryData();
      if (!saved.length) {
        currentGrid.innerHTML = '<div class="muted">No images in local gallery. Use the upload control above or place files in images/ folder.</div>';
        return;
      }
      saved.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        currentGrid.appendChild(img);
      });
    }
  }
});

// read file helper
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// load gallery data from localStorage (returns array)
function loadGalleryData() {
  try {
    const raw = localStorage.getItem('jamiaGallery');
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch (e) {
    return [];
  }
}

// load gallery on public page (index.html)
function loadGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  // priority: use images saved in localStorage (if any)
  const saved = loadGalleryData();
  let images = [];
  if (saved && saved.length) {
    images = saved;
  } else {
    // fallback: expect image files in images/ folder
    images = [
      'images/image1.jpg',
      'images/image2.jpg',
      'images/image3.jpg'
    ];
  }

  images.forEach(src => {
    const container = document.createElement('div');
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Jamia image';
    container.appendChild(img);
    galleryGrid.appendChild(container);
  });
}