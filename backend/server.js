const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Static uploads folder serve karna taake screenshots browser par dekh sakay
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Uploads folder check karo, agar nahi hai toh create kar lo
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration for payment screenshots
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit: 5MB max size
});

// MySQL Database Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nextgen_db'
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database successfully!');
    connection.release();
  }
});

// Signup Endpoint (Updated to support role and domain)
app.post('/api/signup', async (req, res) => {
  const { fullName, email, phone, password, role, domain } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userRole = role || 'intern';
  const userDomain = domain || 'Web Development';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (full_name, email, phone, password, role, domain) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [fullName, email, phone, hashedPassword, userRole, userDomain], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email is already registered' });
        }
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      res.status(201).json({ message: 'Account created successfully!', userId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Login Endpoint (Updated to return role and domain)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error: ' + err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found with this email' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'nextgen_secure_secret_key', { expiresIn: '2h' });

    res.json({
      message: 'Login successful!',
      token,
      user: { 
        id: user.id, 
        name: user.full_name, 
        email: user.email, 
        role: user.role, 
        domain: user.domain 
      }
    });
  });
});

// Internship Application Endpoint
app.post('/api/internship-register', (req, res) => {
  const { fullName, email, phone, domain } = req.body;

  if (!fullName || !email || !phone || !domain) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO internship_applications (full_name, email, phone, domain)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [fullName, email, phone, domain], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database insertion error: ' + err.message });
    }

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully!',
      applicationId: result.insertId
    });
  });
});

// Workshop Registration Endpoint
app.post('/api/workshop-register', upload.single('paymentScreenshot'), (req, res) => {
  const { fullName, email, phone, workshopTitle } = req.body;
  const paymentScreenshot = req.file;

  if (!fullName || !email || !phone || !workshopTitle) {
    return res.status(400).json({ error: 'All text fields are required.' });
  }

  if (!paymentScreenshot) {
    return res.status(400).json({ error: 'Payment screenshot is required.' });
  }

  const screenshotPath = paymentScreenshot.path.replace(/\\/g, "/");

  const query = `
    INSERT INTO workshop_registrations (full_name, email, phone, workshop_title, payment_screenshot)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [fullName, email, phone, workshopTitle, screenshotPath], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database insertion error: ' + err.message });
    }

    res.status(201).json({
      success: true,
      message: 'Workshop registration submitted successfully!',
      registrationId: result.insertId
    });
  });
});

// Course Enrollment Endpoint
app.post('/api/course-register', upload.single('paymentScreenshot'), (req, res) => {
  const { fullName, email, phone, courseTitle, coursePrice } = req.body;
  const paymentScreenshot = req.file;

  if (!fullName || !email || !phone || !courseTitle) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  if (!paymentScreenshot) {
    return res.status(400).json({ error: 'Payment screenshot is required.' });
  }

  const screenshotPath = paymentScreenshot.path.replace(/\\/g, "/");

  const query = `
    INSERT INTO course_enrollments (full_name, email, phone, course_title, course_price, payment_screenshot)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [fullName, email, phone, courseTitle, coursePrice || 'N/A', screenshotPath], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database insertion error: ' + err.message });
    }

    res.status(201).json({
      success: true,
      message: 'Course enrollment submitted successfully!',
      enrollmentId: result.insertId
    });
  });
});

// Task Submissions Endpoint (Updated for direct mentor routing & fields)
app.post('/api/submissions', async (req, res) => {
  const { userId, internName, domain, mentorId, taskId, taskTitle, githubLink, linkedinLink } = req.body;

  if (!taskId || !githubLink) {
    return res.status(400).json({ error: 'Task ID and GitHub link are required.' });
  }

  const query = `
    INSERT INTO task_submissions (user_id, intern_name, domain, mentor_id, task_id, task_title, github_link, linkedin_link, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(query, [userId || null, internName || 'Intern', domain || 'Web Development', mentorId || null, taskId, taskTitle, githubLink, linkedinLink || null], (err, result) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
    res.status(201).json({ message: 'Assignment submitted successfully to your mentor!', submissionId: result.insertId });
  });
});

// --- NEW ENDPOINTS REQUIRED FOR MENTOR & INTERN DASHBOARDS ---

// 1. Find Mentor by Domain
app.get('/api/mentors/domain/:domain', (req, res) => {
  const { domain } = req.params;
  const query = "SELECT id, full_name AS name, email, domain FROM users WHERE role = 'mentor' AND domain = ? LIMIT 1";
  
  db.query(query, [domain], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      // Fallback to any mentor if exact domain match not found
      db.query("SELECT id, full_name AS name, email, domain FROM users WHERE role = 'mentor' LIMIT 1", (err2, results2) => {
        if (err2 || results2.length === 0) return res.status(404).json({ error: 'No mentor found' });
        return res.json({ mentor: results2[0] });
      });
    } else {
      res.json({ mentor: results[0] });
    }
  });
});

// 2. Get Submissions for a Specific Intern
app.get('/api/submissions/intern/:userId', (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM task_submissions WHERE user_id = ? ORDER BY submitted_at DESC";
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ submissions: results });
  });
});

// 3. Get Submissions for a Specific Mentor
app.get('/api/submissions/mentor/:mentorId', (req, res) => {
  const { mentorId } = req.params;
  const query = "SELECT * FROM task_submissions WHERE mentor_id = ? ORDER BY submitted_at DESC";
  
  db.query(query, [mentorId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ submissions: results });
  });
});

// 4. Get Mentees by Domain for a Mentor
app.get('/api/interns/domain/:domain', (req, res) => {
  const { domain } = req.params;
  const query = "SELECT id, full_name AS name, email, phone, domain FROM users WHERE role = 'intern' AND domain = ?";
  
  db.query(query, [domain], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ interns: results });
  });
});

// 5. Mentor Evaluation Endpoint (Review, Rank Points & Feedback)
app.put('/api/submissions/evaluate/:subId', (req, res) => {
  const { subId } = req.params;
  const { rankPoints, feedback, status } = req.body;

  const query = `
    UPDATE task_submissions 
    SET rank_points = ?, feedback = ?, status = ? 
    WHERE id = ?
  `;

  db.query(query, [rankPoints || 0, feedback || '', status || 'Reviewed', subId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Submission evaluated and points awarded successfully!' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});